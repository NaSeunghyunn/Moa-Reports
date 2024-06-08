import { FormError } from "./FormError";

export function withErrorHandling(fn: Function) {
  return async function (...args: any[]) {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error instanceof FormError) {
        return error.flattenedError;
      } else {
        throw error;
      }
    }
  };
}
