
import { StateMiddleware } from './types';

export const loggingMiddleware: StateMiddleware = (data, context, next) => {
  console.log(`[${context.type}] ${context.source}:`, data);
  next(data);
};

export const validationMiddleware: StateMiddleware = (data, context, next) => {
  // Basic validation - can be extended
  if (data !== null && data !== undefined) {
    next(data);
  } else {
    console.warn(`Invalid data in ${context.source}:`, data);
    next(data); // Still continue but warn
  }
};

export const timestampMiddleware: StateMiddleware = (data, context, next) => {
  if (typeof data === 'object' && data !== null) {
    next({
      ...data,
      _timestamp: context.timestamp,
      _source: context.source
    });
  } else {
    next(data);
  }
};
