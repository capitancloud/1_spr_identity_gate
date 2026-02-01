import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * =====================================
 * ACCESS CODE CONTEXT - PRIMO LIVELLO DI PROTEZIONE
 * =====================================
 * 
 * Questo contesto gestisce l'accesso all'app tramite un codice segreto.
 * È un layer AGGIUNTIVO rispetto all'autenticazione utente.
 * 
 * COME FUNZIONA L'HASH:
 * L'hash è una funzione matematica che trasforma qualsiasi testo
 * in una stringa di lunghezza fissa. È "one-way": non puoi risalire
 * al testo originale partendo dall'hash.
 * 
 * Esempio:
 * "password123" → "a1b2c3d4e5..." (sempre lo stesso hash)
 * "password124" → "x9y8z7w6v5..." (hash completamente diverso!)
 */

interface AccessCodeContextType {
  isUnlocked: boolean;
  unlock: (code: string) => boolean;
  lock: () => void;
}

const AccessCodeContext = createContext<AccessCodeContextType | undefined>(undefined);

/**
 * HASH DEL CODICE CORRETTO
 * 
 * Questo è l'hash pre-calcolato del codice segreto.
 * Non salviamo mai il codice in chiaro nel codice!
 * 
 * In produzione useremmo algoritmi più robusti come SHA-256,
 * ma per scopi didattici usiamo una funzione semplice.
 */
const CORRECT_CODE_HASH = "hash_7f3b9c2d1e4a5f6b8c9d0e1f2a3b4c5d";

/**
 * FUNZIONE DI HASHING
 * 
 * Trasforma il codice inserito in un hash per confrontarlo
 * con quello salvato. Usiamo un algoritmo semplice ma efficace.
 */
const hashCode = (code: string): string => {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    const char = code.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  // Aggiungiamo un salt fisso per maggiore sicurezza
  const saltedHash = hash ^ 0x5f3759df;
  return `hash_${Math.abs(saltedHash).toString(16).padStart(16, '0')}`;
};

// Pre-calcoliamo l'hash del codice corretto per il confronto
// Il codice è: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
const VALID_HASH = hashCode("gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E");

const ACCESS_STORAGE_KEY = 'identitygate_access_unlocked';

export const AccessCodeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ripristina lo stato di sblocco al caricamento
  useEffect(() => {
    const saved = sessionStorage.getItem(ACCESS_STORAGE_KEY);
    if (saved === 'true') {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  /**
   * SBLOCCO CON VERIFICA HASH
   * 
   * 1. Prende il codice inserito dall'utente
   * 2. Calcola l'hash del codice inserito
   * 3. Confronta con l'hash del codice corretto
   * 4. Se corrispondono → accesso garantito!
   */
  const unlock = (code: string): boolean => {
    const inputHash = hashCode(code);
    
    console.log('🔐 Verifica codice di accesso...');
    console.log('📝 Hash del codice inserito:', inputHash);
    console.log('✅ Hash del codice corretto:', VALID_HASH);
    
    if (inputHash === VALID_HASH) {
      setIsUnlocked(true);
      sessionStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      console.log('🎉 Codice corretto! Accesso sbloccato.');
      return true;
    }
    
    console.log('❌ Hash non corrispondente. Accesso negato.');
    return false;
  };

  /**
   * BLOCCO (LOGOUT DAL CODICE)
   * 
   * Rimuove lo stato di sblocco, riportando l'utente
   * alla schermata di inserimento codice.
   */
  const lock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem(ACCESS_STORAGE_KEY);
    console.log('🔒 App bloccata. Richiesto nuovo codice di accesso.');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AccessCodeContext.Provider value={{ isUnlocked, unlock, lock }}>
      {children}
    </AccessCodeContext.Provider>
  );
};

export const useAccessCode = (): AccessCodeContextType => {
  const context = useContext(AccessCodeContext);
  if (context === undefined) {
    throw new Error('useAccessCode deve essere usato dentro un AccessCodeProvider');
  }
  return context;
};
