
import { useMemo, useCallback } from 'react';
import { useEventBus } from '../useEventBus';

interface NormalizedState<T> {
  entities: Record<string, T>;
  ids: string[];
}

interface NormalizationConfig {
  idKey: string;
  enableDeepNormalization?: boolean;
  trackChanges?: boolean;
}

export const useStateNormalization = <T extends Record<string, any>>(
  data: T[],
  config: NormalizationConfig
) => {
  const { idKey, enableDeepNormalization = false, trackChanges = false } = config;
  const { emit } = useEventBus();

  // Normalize array to entities and ids
  const normalizedState = useMemo((): NormalizedState<T> => {
    const startTime = performance.now();
    
    const entities: Record<string, T> = {};
    const ids: string[] = [];

    data.forEach(item => {
      const id = item[idKey]?.toString();
      if (id) {
        entities[id] = enableDeepNormalization ? deepNormalize(item) : item;
        ids.push(id);
      }
    });

    const endTime = performance.now();
    
    if (trackChanges) {
      emit('normalization-performance', {
        operation: 'normalize',
        duration: endTime - startTime,
        itemCount: data.length,
        timestamp: Date.now()
      });
    }

    return { entities, ids };
  }, [data, idKey, enableDeepNormalization, trackChanges, emit]);

  // Denormalize back to array
  const denormalizedData = useMemo((): T[] => {
    return normalizedState.ids.map(id => normalizedState.entities[id]).filter(Boolean);
  }, [normalizedState]);

  // Get entity by ID
  const getEntityById = useCallback((id: string): T | undefined => {
    return normalizedState.entities[id];
  }, [normalizedState.entities]);

  // Get multiple entities by IDs
  const getEntitiesByIds = useCallback((ids: string[]): T[] => {
    return ids.map(id => normalizedState.entities[id]).filter(Boolean);
  }, [normalizedState.entities]);

  // Update entity
  const updateEntity = useCallback((id: string, updates: Partial<T>): NormalizedState<T> => {
    const existing = normalizedState.entities[id];
    if (!existing) return normalizedState;

    return {
      ...normalizedState,
      entities: {
        ...normalizedState.entities,
        [id]: { ...existing, ...updates }
      }
    };
  }, [normalizedState]);

  // Add entity
  const addEntity = useCallback((entity: T): NormalizedState<T> => {
    const id = entity[idKey]?.toString();
    if (!id || normalizedState.entities[id]) return normalizedState;

    return {
      entities: {
        ...normalizedState.entities,
        [id]: entity
      },
      ids: [...normalizedState.ids, id]
    };
  }, [normalizedState, idKey]);

  // Remove entity
  const removeEntity = useCallback((id: string): NormalizedState<T> => {
    if (!normalizedState.entities[id]) return normalizedState;

    const { [id]: removed, ...remainingEntities } = normalizedState.entities;
    
    return {
      entities: remainingEntities,
      ids: normalizedState.ids.filter(entityId => entityId !== id)
    };
  }, [normalizedState]);

  return {
    normalizedState,
    denormalizedData,
    getEntityById,
    getEntitiesByIds,
    updateEntity,
    addEntity,
    removeEntity
  };
};

// Deep normalization helper
const deepNormalize = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepNormalize) as T;
  }

  const normalized: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    normalized[key] = deepNormalize(value);
  });

  return normalized;
};
