
import { useMemo, useCallback } from 'react';
import { useEventBus } from '../useEventBus';

interface CompressionConfig {
  algorithm: 'json' | 'binary' | 'diff';
  threshold: number; // Minimum size in bytes to compress
  enableMetrics?: boolean;
}

interface CompressionResult<T> {
  compressed: string | Uint8Array;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  algorithm: string;
}

interface DiffPatch {
  type: 'add' | 'remove' | 'replace';
  path: string[];
  value?: any;
  oldValue?: any;
}

export const useStateCompression = <T>(
  config: CompressionConfig = {
    algorithm: 'json',
    threshold: 1024, // 1KB
    enableMetrics: true
  }
) => {
  const { emit } = useEventBus();

  // JSON-based compression using string manipulation
  const compressJSON = useCallback((data: T): CompressionResult<T> => {
    const startTime = performance.now();
    const jsonString = JSON.stringify(data);
    const originalSize = new Blob([jsonString]).size;

    if (originalSize < config.threshold) {
      return {
        compressed: jsonString,
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 1,
        algorithm: 'json-passthrough'
      };
    }

    // Simple JSON compression by removing whitespace and common patterns
    let compressed = jsonString
      .replace(/\s+/g, '') // Remove whitespace
      .replace(/","/g, '","') // Normalize quotes
      .replace(/":"/g, '":"'); // Normalize key-value separators

    // Dictionary-based compression for common strings
    const dictionary = new Map<string, string>();
    let dictIndex = 0;

    // Find repeating patterns
    const patterns = jsonString.match(/".{3,}"/g) || [];
    const patternCounts = new Map<string, number>();
    
    patterns.forEach(pattern => {
      patternCounts.set(pattern, (patternCounts.get(pattern) || 0) + 1);
    });

    // Replace frequent patterns with short keys
    Array.from(patternCounts.entries())
      .filter(([_, count]) => count > 2)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 100) // Limit dictionary size
      .forEach(([pattern, _]) => {
        const key = `~${dictIndex++}~`;
        dictionary.set(key, pattern);
        compressed = compressed.replace(new RegExp(escapeRegExp(pattern), 'g'), key);
      });

    // Prepend dictionary
    const dictString = JSON.stringify(Object.fromEntries(dictionary));
    compressed = `${dictString}|${compressed}`;

    const compressedSize = new Blob([compressed]).size;
    const processingTime = performance.now() - startTime;

    const result: CompressionResult<T> = {
      compressed,
      originalSize,
      compressedSize,
      compressionRatio: originalSize / compressedSize,
      algorithm: 'json-dictionary'
    };

    if (config.enableMetrics) {
      emit('compression-metrics', {
        ...result,
        processingTime,
        threshold: config.threshold,
        timestamp: Date.now()
      });
    }

    return result;
  }, [config.threshold, config.enableMetrics, emit]);

  // Binary compression using simple encoding
  const compressBinary = useCallback((data: T): CompressionResult<T> => {
    const startTime = performance.now();
    const jsonString = JSON.stringify(data);
    const originalSize = new Blob([jsonString]).size;

    if (originalSize < config.threshold) {
      const encoder = new TextEncoder();
      return {
        compressed: encoder.encode(jsonString),
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 1,
        algorithm: 'binary-passthrough'
      };
    }

    // Simple binary compression using UTF-8 encoding optimizations
    const encoder = new TextEncoder();
    const originalBytes = encoder.encode(jsonString);

    // Run-length encoding for repeated bytes
    const compressed: number[] = [];
    let i = 0;
    
    while (i < originalBytes.length) {
      const currentByte = originalBytes[i];
      let count = 1;
      
      // Count consecutive identical bytes
      while (i + count < originalBytes.length && 
             originalBytes[i + count] === currentByte && 
             count < 255) {
        count++;
      }
      
      if (count > 3) {
        // Use run-length encoding: [255, byte, count]
        compressed.push(255, currentByte, count);
      } else {
        // Direct encoding
        for (let j = 0; j < count; j++) {
          compressed.push(currentByte);
        }
      }
      
      i += count;
    }

    const compressedBytes = new Uint8Array(compressed);
    const processingTime = performance.now() - startTime;

    const result: CompressionResult<T> = {
      compressed: compressedBytes,
      originalSize,
      compressedSize: compressedBytes.length,
      compressionRatio: originalSize / compressedBytes.length,
      algorithm: 'binary-rle'
    };

    if (config.enableMetrics) {
      emit('compression-metrics', {
        ...result,
        processingTime,
        threshold: config.threshold,
        timestamp: Date.now()
      });
    }

    return result;
  }, [config.threshold, config.enableMetrics, emit]);

  // Diff-based compression
  const compressDiff = useCallback((newData: T, oldData?: T): CompressionResult<T> => {
    const startTime = performance.now();
    const jsonString = JSON.stringify(newData);
    const originalSize = new Blob([jsonString]).size;

    if (!oldData || originalSize < config.threshold) {
      return {
        compressed: jsonString,
        originalSize,
        compressedSize: originalSize,
        compressionRatio: 1,
        algorithm: 'diff-passthrough'
      };
    }

    const diff = createDiff(oldData, newData);
    const diffString = JSON.stringify(diff);
    const compressedSize = new Blob([diffString]).size;
    const processingTime = performance.now() - startTime;

    const result: CompressionResult<T> = {
      compressed: diffString,
      originalSize,
      compressedSize,
      compressionRatio: originalSize / compressedSize,
      algorithm: 'diff-patch'
    };

    if (config.enableMetrics) {
      emit('compression-metrics', {
        ...result,
        processingTime,
        threshold: config.threshold,
        timestamp: Date.now()
      });
    }

    return result;
  }, [config.threshold, config.enableMetrics, emit]);

  // Main compression function
  const compress = useCallback((data: T, oldData?: T): CompressionResult<T> => {
    switch (config.algorithm) {
      case 'binary':
        return compressBinary(data);
      case 'diff':
        return compressDiff(data, oldData);
      case 'json':
      default:
        return compressJSON(data);
    }
  }, [config.algorithm, compressJSON, compressBinary, compressDiff]);

  // Decompression functions
  const decompress = useCallback((result: CompressionResult<T>, oldData?: T): T => {
    try {
      switch (result.algorithm) {
        case 'json-passthrough':
          return JSON.parse(result.compressed as string);
          
        case 'json-dictionary': {
          const compressed = result.compressed as string;
          const separatorIndex = compressed.indexOf('|');
          const dictString = compressed.substring(0, separatorIndex);
          const dataString = compressed.substring(separatorIndex + 1);
          
          const dictionary = JSON.parse(dictString);
          let decompressed = dataString;
          
          Object.entries(dictionary).forEach(([key, value]) => {
            decompressed = decompressed.replace(new RegExp(escapeRegExp(key), 'g'), value as string);
          });
          
          return JSON.parse(decompressed);
        }
        
        case 'binary-passthrough':
        case 'binary-rle': {
          const bytes = result.compressed as Uint8Array;
          
          if (result.algorithm === 'binary-passthrough') {
            const decoder = new TextDecoder();
            return JSON.parse(decoder.decode(bytes));
          }
          
          // Decode run-length encoding
          const decoded: number[] = [];
          let i = 0;
          
          while (i < bytes.length) {
            if (bytes[i] === 255 && i + 2 < bytes.length) {
              // Run-length encoded sequence
              const byte = bytes[i + 1];
              const count = bytes[i + 2];
              for (let j = 0; j < count; j++) {
                decoded.push(byte);
              }
              i += 3;
            } else {
              decoded.push(bytes[i]);
              i++;
            }
          }
          
          const decoder = new TextDecoder();
          return JSON.parse(decoder.decode(new Uint8Array(decoded)));
        }
        
        case 'diff-passthrough':
          return JSON.parse(result.compressed as string);
          
        case 'diff-patch': {
          if (!oldData) {
            throw new Error('Old data required for diff decompression');
          }
          const diff = JSON.parse(result.compressed as string);
          return applyDiff(oldData, diff);
        }
        
        default:
          throw new Error(`Unknown compression algorithm: ${result.algorithm}`);
      }
    } catch (error) {
      console.error('Decompression error:', error);
      throw error;
    }
  }, []);

  return {
    compress,
    decompress
  };
};

// Helper functions
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createDiff(oldObj: any, newObj: any, path: string[] = []): DiffPatch[] {
  const patches: DiffPatch[] = [];
  
  if (oldObj === newObj) return patches;
  
  if (typeof oldObj !== typeof newObj || Array.isArray(oldObj) !== Array.isArray(newObj)) {
    patches.push({
      type: 'replace',
      path,
      value: newObj,
      oldValue: oldObj
    });
    return patches;
  }
  
  if (typeof newObj !== 'object' || newObj === null) {
    if (oldObj !== newObj) {
      patches.push({
        type: 'replace',
        path,
        value: newObj,
        oldValue: oldObj
      });
    }
    return patches;
  }
  
  // Handle objects and arrays
  const oldKeys = new Set(Object.keys(oldObj || {}));
  const newKeys = new Set(Object.keys(newObj || {}));
  
  // Removed keys
  oldKeys.forEach(key => {
    if (!newKeys.has(key)) {
      patches.push({
        type: 'remove',
        path: [...path, key],
        oldValue: oldObj[key]
      });
    }
  });
  
  // Added or modified keys
  newKeys.forEach(key => {
    if (!oldKeys.has(key)) {
      patches.push({
        type: 'add',
        path: [...path, key],
        value: newObj[key]
      });
    } else if (oldObj[key] !== newObj[key]) {
      patches.push(...createDiff(oldObj[key], newObj[key], [...path, key]));
    }
  });
  
  return patches;
}

function applyDiff(obj: any, patches: DiffPatch[]): any {
  let result = JSON.parse(JSON.stringify(obj)); // Deep clone
  
  patches.forEach(patch => {
    const { type, path, value } = patch;
    let current = result;
    
    // Navigate to parent
    for (let i = 0; i < path.length - 1; i++) {
      if (current[path[i]] === undefined) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    const lastKey = path[path.length - 1];
    
    switch (type) {
      case 'add':
      case 'replace':
        current[lastKey] = value;
        break;
      case 'remove':
        delete current[lastKey];
        break;
    }
  });
  
  return result;
}
