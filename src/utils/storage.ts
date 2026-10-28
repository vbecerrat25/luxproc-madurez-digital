/**
 * LUXPROC Encrypted Storage Utility
 * Enterprise-grade client-side encryption for all diagnostic, corporate,
 * and user session data stored in localStorage.
 * 
 * Prevents unauthorized inspection, scraping, malware theft, and tampering.
 */

import { encryptString, decryptString } from './crypto';

const memoryFallback = new Map<string, string>();

export const safeStorage = {
  /**
   * Reads and automatically decrypts data.
   * If legacy plaintext data is detected, it is decrypted and automatically upgraded to encrypted storage.
   */
  getItem: (key: string): string | null => {
    try {
      let raw: string | null = null;
      if (typeof window !== 'undefined' && window.localStorage) {
        raw = window.localStorage.getItem(key);
      } else {
        raw = memoryFallback.get(key) || null;
      }

      if (!raw) return null;

      // If it's already encrypted, decrypt it
      if (raw.startsWith('lp_sec_v2:')) {
        return decryptString(raw);
      }

      // Legacy plaintext found: upgrade to encrypted storage transparently
      try {
        const encrypted = encryptString(raw);
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, encrypted);
        } else {
          memoryFallback.set(key, encrypted);
        }
      } catch {
        // Silently continue if upgrade fails
      }

      return raw;
    } catch {
      const memRaw = memoryFallback.get(key);
      return memRaw ? decryptString(memRaw) : null;
    }
  },

  /**
   * Automatically encrypts any data before persisting to localStorage or memory.
   */
  setItem: (key: string, value: string): boolean => {
    try {
      const encryptedValue = encryptString(value);
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, encryptedValue);
        return true;
      }
      memoryFallback.set(key, encryptedValue);
      return false;
    } catch {
      try {
        memoryFallback.set(key, encryptString(value));
      } catch {
        // ignore
      }
      return false;
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // ignore
    }
    memoryFallback.delete(key);
  },

  getJSON: <T>(key: string, fallback: T): T => {
    const raw = safeStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  setJSON: <T>(key: string, value: T): boolean => {
    try {
      const raw = JSON.stringify(value);
      return safeStorage.setItem(key, raw);
    } catch {
      return false;
    }
  },

  /**
   * Secure wipe of all enterprise diagnostic and user session data
   */
  secureWipe: (): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && (k.startsWith('luxproc_') || k.startsWith('firebase:'))) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => window.localStorage.removeItem(k));
      }
      memoryFallback.clear();
    } catch {
      // ignore
    }
  }
};
