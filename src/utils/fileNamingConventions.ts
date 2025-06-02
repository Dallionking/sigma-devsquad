
/**
 * File Naming Conventions
 * Provides utilities to ensure consistent file naming across the project
 */

export const FILE_NAMING_CONVENTIONS = {
  // Component files should use PascalCase
  COMPONENT: /^[A-Z][a-zA-Z0-9]*\.tsx$/,
  
  // Hook files should start with 'use' and use camelCase
  HOOK: /^use[A-Z][a-zA-Z0-9]*\.(ts|tsx)$/,
  
  // Utility files should use camelCase
  UTILITY: /^[a-z][a-zA-Z0-9]*\.(ts|tsx)$/,
  
  // Type files should use camelCase and end with .types.ts
  TYPES: /^[a-z][a-zA-Z0-9]*\.types\.ts$/,
  
  // Context files should end with Context
  CONTEXT: /^[A-Z][a-zA-Z0-9]*Context\.(ts|tsx)$/,
  
  // Service files should use camelCase and end with Service
  SERVICE: /^[a-z][a-zA-Z0-9]*Service\.(ts|tsx)$/
};

export class FileNamingValidator {
  static validateComponentName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.COMPONENT.test(fileName);
  }

  static validateHookName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.HOOK.test(fileName);
  }

  static validateUtilityName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.UTILITY.test(fileName);
  }

  static validateTypesName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.TYPES.test(fileName);
  }

  static validateContextName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.CONTEXT.test(fileName);
  }

  static validateServiceName(fileName: string): boolean {
    return FILE_NAMING_CONVENTIONS.SERVICE.test(fileName);
  }

  static getSuggestion(fileName: string, type: keyof typeof FILE_NAMING_CONVENTIONS): string {
    const baseName = fileName.replace(/\.(ts|tsx)$/, '');
    
    switch (type) {
      case 'COMPONENT':
        return this.toPascalCase(baseName) + '.tsx';
      case 'HOOK':
        return this.toHookName(baseName) + '.ts';
      case 'UTILITY':
        return this.toCamelCase(baseName) + '.ts';
      case 'TYPES':
        return this.toCamelCase(baseName) + '.types.ts';
      case 'CONTEXT':
        return this.toPascalCase(baseName) + 'Context.tsx';
      case 'SERVICE':
        return this.toCamelCase(baseName) + 'Service.ts';
      default:
        return fileName;
    }
  }

  private static toPascalCase(str: string): string {
    return str.replace(/(?:^|[^a-zA-Z0-9])+([a-zA-Z0-9])/g, (_, char) => 
      char.toUpperCase()
    );
  }

  private static toCamelCase(str: string): string {
    const pascalCase = this.toPascalCase(str);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
  }

  private static toHookName(str: string): string {
    const camelCase = this.toCamelCase(str);
    return camelCase.startsWith('use') ? camelCase : 'use' + this.toPascalCase(camelCase);
  }
}

export const NAMING_BEST_PRACTICES = {
  components: [
    'Use PascalCase for component names',
    'Be descriptive and specific',
    'Avoid abbreviations',
    'Group related components in folders'
  ],
  hooks: [
    'Start with "use" prefix',
    'Use camelCase after "use"',
    'Be descriptive about what the hook does',
    'Keep hook names concise but clear'
  ],
  utilities: [
    'Use camelCase',
    'Use descriptive names',
    'Group related utilities',
    'Avoid generic names like "utils" or "helpers"'
  ]
};
