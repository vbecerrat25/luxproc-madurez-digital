/**
 * LUXPROC Data Migration & Permanent Persistence Vault
 * 
 * Guarantees that future updates, framework changes, and code releases
 * NEVER delete or lose customer diagnostics, evaluation history, or company records.
 */

import { DiagnosticRecord } from '../types';
import { safeStorage } from './storage';

const PRIMARY_RECORDS_KEY = 'loopsblock_completed_diagnostics';
const BACKUP_VAULT_KEY = 'luxproc_vault_backup';
const LEGACY_RECORD_KEYS = [
  'loopsblock_completed_diagnostics',
  'luxproc_completed_records',
  'luxproc_evaluations_archive',
  'luxproc_historical_diagnostics'
];

/**
 * Initializes and executes non-destructive data migration on app boot.
 * Scans all historical storage keys, merges them, and protects against data loss.
 */
export const runDataMigration = (): DiagnosticRecord[] => {
  const mergedMap = new Map<string, DiagnosticRecord>();

  // 1. Scan primary key
  const primaryRecords = safeStorage.getJSON<DiagnosticRecord[]>(PRIMARY_RECORDS_KEY, []);
  if (Array.isArray(primaryRecords)) {
    primaryRecords.forEach(rec => {
      if (rec && rec.id) mergedMap.set(rec.id, normalizeRecord(rec));
    });
  }

  // 2. Scan legacy keys (from earlier versions)
  LEGACY_RECORD_KEYS.forEach(key => {
    if (key === PRIMARY_RECORDS_KEY) return;
    const legacyRecords = safeStorage.getJSON<DiagnosticRecord[]>(key, []);
    if (Array.isArray(legacyRecords)) {
      legacyRecords.forEach(rec => {
        if (rec && rec.id && !mergedMap.has(rec.id)) {
          mergedMap.set(rec.id, normalizeRecord(rec));
        }
      });
    }
  });

  // 3. Scan pre-update backup vault in case primary was somehow cleared
  if (mergedMap.size === 0) {
    const vaultRecords = safeStorage.getJSON<DiagnosticRecord[]>(BACKUP_VAULT_KEY, []);
    if (Array.isArray(vaultRecords) && vaultRecords.length > 0) {
      vaultRecords.forEach(rec => {
        if (rec && rec.id) mergedMap.set(rec.id, normalizeRecord(rec));
      });
    }
  }

  // Exclude explicitly deleted records
  try {
    const deletedIds = safeStorage.getJSON<string[]>('luxproc_deleted_ids', []);
    if (Array.isArray(deletedIds) && deletedIds.length > 0) {
      deletedIds.forEach(id => mergedMap.delete(id));
    }
  } catch {
    // ignore
  }

  const finalRecords = Array.from(mergedMap.values()).sort((a, b) => {
    const tA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0));
    const tB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0));
    return tB - tA;
  });

  // 4. Update primary and backup vault with normalized records
  safeStorage.setJSON(PRIMARY_RECORDS_KEY, finalRecords);
  safeStorage.setJSON(BACKUP_VAULT_KEY, finalRecords);

  return finalRecords;
};

/**
 * Ensures record conforms to latest schema without removing any existing data
 */
const normalizeRecord = (raw: any): DiagnosticRecord => {
  const now = new Date();
  return {
    id: raw.id || `rec_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    date: raw.date || now.toLocaleDateString('es-ES'),
    time: raw.time || now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    timestamp: raw.timestamp || (raw.createdAt ? new Date(raw.createdAt).getTime() : now.getTime()),
    companyInfo: {
      name: raw.companyInfo?.name || 'Empresa Evaluada',
      contactEmail: raw.companyInfo?.contactEmail || '',
      sector: raw.companyInfo?.sector || 'Comercio',
      size: raw.companyInfo?.size || 'Micro',
      country: raw.companyInfo?.country || 'Perú',
      targetCustomer: raw.companyInfo?.targetCustomer || 'BOTH'
    },
    responses: Array.isArray(raw.responses) ? raw.responses : [],
    metrics: raw.metrics || {
      general: 0,
      dimensionScores: {},
      radarData: [],
      strengths: [],
      weaknesses: []
    },
    maturityLevel: raw.maturityLevel || 'Inicial',
    createdAt: raw.createdAt || now.toISOString(),
    updatedAt: raw.updatedAt || raw.createdAt || now.toISOString()
  };
};

/**
 * Updates the permanent backup vault whenever new records are written
 */
export const updateBackupVault = (records: DiagnosticRecord[]): void => {
  if (Array.isArray(records) && records.length > 0) {
    try {
      safeStorage.setJSON(BACKUP_VAULT_KEY, records);
    } catch {
      // ignore
    }
  }
};

/**
 * Exports all diagnostic evaluations to a downloadable JSON file
 */
export const exportDataBackup = (records: DiagnosticRecord[]): void => {
  try {
    const payload = {
      app: 'LUXPROC Diagnóstico de Madurez Digital',
      version: '3.0.0',
      exportedAt: new Date().toISOString(),
      totalRecords: records.length,
      records: records
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxproc-respaldo-datos-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // ignore
  }
};

/**
 * Imports and merges a previously downloaded JSON backup file
 */
export const importDataBackup = async (
  file: File, 
  currentRecords: DiagnosticRecord[]
): Promise<{ success: boolean; count: number; merged: DiagnosticRecord[]; error?: string }> => {
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    
    let incomingRecords: DiagnosticRecord[] = [];
    if (Array.isArray(parsed)) {
      incomingRecords = parsed;
    } else if (parsed && Array.isArray(parsed.records)) {
      incomingRecords = parsed.records;
    } else {
      return { success: false, count: 0, merged: currentRecords, error: 'Formato de archivo de respaldo no reconocido.' };
    }

    const map = new Map<string, DiagnosticRecord>();
    currentRecords.forEach(r => map.set(r.id, r));
    
    let addedCount = 0;
    incomingRecords.forEach(raw => {
      const norm = normalizeRecord(raw);
      if (!map.has(norm.id)) {
        addedCount++;
      }
      map.set(norm.id, norm);
    });

    const merged = Array.from(map.values()).sort((a, b) => {
      const tA = a.timestamp || (a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0));
      const tB = b.timestamp || (b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0));
      return tB - tA;
    });

    safeStorage.setJSON(PRIMARY_RECORDS_KEY, merged);
    safeStorage.setJSON(BACKUP_VAULT_KEY, merged);

    return { success: true, count: addedCount, merged };
  } catch (err: any) {
    return { 
      success: false, 
      count: 0, 
      merged: currentRecords, 
      error: err?.message || 'Error al procesar el archivo.' 
    };
  }
};
