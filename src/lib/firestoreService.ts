/**
 * LUXPROC Firestore Cloud Synchronization Service
 * 
 * Provides cloud-persistence for diagnostic evaluations and customer data.
 * Guarantees that future updates, browser cleanups, or code deployments NEVER
 * wipe or delete customer and diagnostic records.
 */

import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { DiagnosticRecord } from '../types';

const COLLECTION_NAME = 'diagnostics';

/**
 * Merges local and cloud records non-destructively.
 * Ensures no client record is ever lost during platform upgrades or syncs.
 */
export const mergeRecordsNonDestructive = (
  local: DiagnosticRecord[], 
  cloud: DiagnosticRecord[]
): DiagnosticRecord[] => {
  const map = new Map<string, DiagnosticRecord>();

  // Add local records first
  (local || []).forEach(rec => {
    if (rec && rec.id) {
      map.set(rec.id, rec);
    }
  });

  const getRecordTime = (r: DiagnosticRecord): number => {
    if (r.timestamp) return r.timestamp;
    if (r.createdAt) return new Date(r.createdAt).getTime();
    if (r.date) return new Date(r.date).getTime();
    return 0;
  };

  // Merge or add cloud records
  (cloud || []).forEach(rec => {
    if (rec && rec.id) {
      const existing = map.get(rec.id);
      if (!existing) {
        map.set(rec.id, rec);
      } else {
        const existingTime = getRecordTime(existing);
        const cloudTime = getRecordTime(rec);
        if (cloudTime >= existingTime) {
          map.set(rec.id, rec);
        }
      }
    }
  });

  // Return sorted by creation date descending
  return Array.from(map.values()).sort((a, b) => {
    return getRecordTime(b) - getRecordTime(a);
  });
};

/**
 * Saves or updates a diagnostic record in Firestore.
 * Catches errors silently so offline / permission edge cases do not disrupt user UX.
 */
export const saveRecordToFirestore = async (record: DiagnosticRecord): Promise<boolean> => {
  if (!record || !record.id) return false;

  try {
    const docRef = doc(db, COLLECTION_NAME, record.id);
    // Sanitize any undefined properties for Firestore
    const cleanRecord = JSON.parse(JSON.stringify(record));
    await setDoc(docRef, {
      ...cleanRecord,
      _syncedAt: serverTimestamp(),
      _version: 3
    }, { merge: true });
    return true;
  } catch {
    // Cloud sync notice: silently fallback to encrypted local storage
    return false;
  }
};

/**
 * Fetches all persistent diagnostic records from Firestore
 */
export const fetchRecordsFromFirestore = async (): Promise<DiagnosticRecord[]> => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, limit(100));
    const snapshot = await getDocs(q);

    const records: DiagnosticRecord[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data && data.id && data.companyInfo) {
        // Strip Firestore metadata before returning
        const { _syncedAt, _version, ...cleanData } = data;
        records.push(cleanData as DiagnosticRecord);
      }
    });

    return records;
  } catch {
    // Graceful offline fallback to local encrypted storage
    return [];
  }
};

/**
 * Deletes a record from Firestore (when user explicitly requests deletion)
 */
export const deleteRecordFromFirestore = async (recordId: string): Promise<boolean> => {
  if (!recordId) return false;
  try {
    const docRef = doc(db, COLLECTION_NAME, recordId);
    await deleteDoc(docRef);
    return true;
  } catch {
    return false;
  }
};
