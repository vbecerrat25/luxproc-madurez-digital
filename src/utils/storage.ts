/**
 * Safe LocalStorage utility with fallback memory cache.
 * Prevents DOMException / SecurityError / QuotaExceededError in third-party or sub-domain environments.
 */

const memoryFallback = new Map<string, string>();

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn(`[safeStorage] Lectura fallida para "${key}", usando memoria:`, e);
    }
    return memoryFallback.get(key) || null;
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn(`[safeStorage] Escritura fallida para "${key}", usando memoria:`, e);
    }
    memoryFallback.set(key, value);
    return false;
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[safeStorage] Eliminación fallida para "${key}":`, e);
    }
    memoryFallback.delete(key);
  },

  getJSON: <T>(key: string, fallback: T): T => {
    const raw = safeStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[safeStorage] JSON.parse falló para clave "${key}":`, e);
      return fallback;
    }
  },

  setJSON: <T>(key: string, value: T): boolean => {
    try {
      const raw = JSON.stringify(value);
      return safeStorage.setItem(key, raw);
    } catch (e) {
      console.warn(`[safeStorage] JSON.stringify falló para clave "${key}":`, e);
      return false;
    }
  }
};
