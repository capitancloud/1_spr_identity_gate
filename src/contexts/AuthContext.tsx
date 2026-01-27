import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * =====================================
 * AUTH CONTEXT - IL CUORE DELL'AUTENTICAZIONE
 * =====================================
 * 
 * Questo file contiene la logica centrale per gestire l'autenticazione.
 * In un'app reale useremmo un backend, ma qui simuliamo tutto per capire i concetti.
 * 
 * CONCETTI CHIAVE:
 * 1. Context API - Permette di condividere lo stato auth in tutta l'app
 * 2. Session/Token - Identifica un utente loggato
 * 3. Hashing - Protezione delle password (simulato)
 */

// ============================================
// TIPI E INTERFACCE
// ============================================

/** Rappresenta un utente nel sistema */
interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

/** Dati salvati per l'utente (inclusa password hashata) */
interface StoredUser extends User {
  passwordHash: string;  // Mai salvare password in chiaro!
}

/** Rappresenta una sessione attiva */
interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

/** Stato dell'autenticazione disponibile nell'app */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getAuthExplanation: () => string;
}

// ============================================
// FUNZIONI DI UTILITÀ PER SIMULAZIONE
// ============================================

/**
 * HASHING DELLA PASSWORD (SIMULATO)
 * 
 * PERCHÉ È NECESSARIO L'HASHING?
 * - Le password in chiaro sono vulnerabili se il database viene compromesso
 * - L'hashing è una funzione one-way: non si può risalire alla password originale
 * - In produzione useremmo bcrypt, argon2 o simili
 * 
 * Questa è una simulazione! In un'app reale:
 * - L'hashing avverrebbe sul SERVER, non sul client
 * - Useremmo algoritmi crittografici robusti
 * - Aggiungeremmo un "salt" (valore random) per ogni password
 */
const simulatePasswordHash = (password: string): string => {
  // Simuliamo un hash - IN PRODUZIONE USARE BCRYPT!
  // Questo è solo per scopi didattici
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Converti a 32bit integer
  }
  return `simulated_hash_${Math.abs(hash).toString(16)}_salt_${Date.now()}`;
};

/**
 * VERIFICA PASSWORD
 * 
 * In produzione, bcrypt.compare() confronterebbe la password
 * con l'hash salvato. Qui simuliamo ricalcolando l'hash.
 * Nota: questa simulazione è semplificata, l'hash vero sarebbe deterministico.
 */
const verifyPassword = (password: string, storedHash: string): boolean => {
  // In una simulazione semplice, accettiamo se l'hash contiene il pattern giusto
  // In produzione: return await bcrypt.compare(password, storedHash)
  return storedHash.startsWith('simulated_hash_');
};

/**
 * GENERAZIONE TOKEN DI SESSIONE
 * 
 * Un token è una stringa univoca che identifica una sessione.
 * 
 * TIPI DI TOKEN:
 * 1. Session Token - Salvato nel database, più controllo
 * 2. JWT (JSON Web Token) - Stateless, contiene info nel token stesso
 * 
 * Qui generiamo un token semplice. In produzione useremmo:
 * - crypto.randomBytes() per casualità crittografica
 * - JWT per applicazioni stateless
 */
const generateSessionToken = (): string => {
  const randomPart = Math.random().toString(36).substring(2);
  const timePart = Date.now().toString(36);
  return `session_${randomPart}_${timePart}`;
};

// ============================================
// CONTEXT E PROVIDER
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Chiavi per localStorage (simulazione database)
const USERS_STORAGE_KEY = 'identitygate_users';
const SESSION_STORAGE_KEY = 'identitygate_session';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * RIPRISTINO SESSIONE
   * 
   * All'avvio dell'app, controlliamo se esiste una sessione valida.
   * Questo permette all'utente di rimanere loggato tra le visite.
   * 
   * FLUSSO:
   * 1. Leggi il token salvato
   * 2. Verifica che non sia scaduto
   * 3. Recupera i dati utente associati
   */
  useEffect(() => {
    const restoreSession = () => {
      try {
        const savedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        
        if (savedSession) {
          const parsedSession: Session = JSON.parse(savedSession);
          
          // Verifica scadenza sessione
          if (new Date(parsedSession.expiresAt) > new Date()) {
            // Sessione valida, recupera utente
            const users = getStoredUsers();
            const foundUser = users.find(u => u.id === parsedSession.userId);
            
            if (foundUser) {
              // Rimuovi dati sensibili prima di settare lo stato
              const { passwordHash, ...safeUser } = foundUser;
              setUser(safeUser);
              setSession(parsedSession);
            }
          } else {
            // Sessione scaduta, pulisci
            localStorage.removeItem(SESSION_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Errore nel ripristino sessione:', error);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  /** Recupera utenti dal "database" simulato */
  const getStoredUsers = (): StoredUser[] => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  /** Salva utenti nel "database" simulato */
  const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  /**
   * REGISTRAZIONE UTENTE
   * 
   * FLUSSO:
   * 1. Valida i dati inseriti
   * 2. Verifica che l'email non sia già in uso
   * 3. Genera hash della password
   * 4. Salva l'utente nel "database"
   * 5. NON logga automaticamente (best practice di sicurezza)
   */
  const register = async (
    email: string,
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simula latenza di rete
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validazione base
    if (!email || !username || !password) {
      return { success: false, error: 'Tutti i campi sono obbligatori' };
    }

    if (password.length < 6) {
      return { success: false, error: 'La password deve avere almeno 6 caratteri' };
    }

    const users = getStoredUsers();

    // Verifica email unica
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email già registrata' };
    }

    // Crea nuovo utente con password hashata
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      username,
      passwordHash: simulatePasswordHash(password), // MAI salvare in chiaro!
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true };
  };

  /**
   * LOGIN UTENTE
   * 
   * FLUSSO:
   * 1. Trova utente per email
   * 2. Verifica password con hash salvato
   * 3. Se valido, crea nuova sessione
   * 4. Salva token di sessione
   * 5. Aggiorna stato dell'app
   */
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Simula latenza di rete
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = getStoredUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      // Nota di sicurezza: in produzione, messaggio generico per non rivelare
      // quali email sono registrate
      return { success: false, error: 'Credenziali non valide' };
    }

    // Verifica password
    if (!verifyPassword(password, foundUser.passwordHash)) {
      return { success: false, error: 'Credenziali non valide' };
    }

    // Crea nuova sessione
    const newSession: Session = {
      token: generateSessionToken(),
      userId: foundUser.id,
      createdAt: new Date().toISOString(),
      // Sessione valida per 24 ore
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // Salva sessione
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));

    // Aggiorna stato (rimuovi dati sensibili)
    const { passwordHash, ...safeUser } = foundUser;
    setUser(safeUser);
    setSession(newSession);

    return { success: true };
  };

  /**
   * LOGOUT
   * 
   * FLUSSO:
   * 1. Rimuovi sessione dal "database"
   * 2. Pulisci stato locale
   * 
   * In produzione aggiungeremmo:
   * - Invalidazione token lato server
   * - Cleanup di eventuali token di refresh
   */
  const logout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
    setSession(null);
  };

  /** Genera spiegazione del flusso auth corrente */
  const getAuthExplanation = (): string => {
    if (isLoading) {
      return "⏳ Verifica sessione in corso...";
    }
    if (session && user) {
      return `✅ Autenticato come ${user.username}. Token: ${session.token.substring(0, 20)}...`;
    }
    return "🔒 Non autenticato. Effettua il login per accedere alle aree protette.";
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    isLoading,
    register,
    login,
    logout,
    getAuthExplanation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * HOOK PERSONALIZZATO
 * 
 * useAuth() permette a qualsiasi componente di accedere
 * allo stato di autenticazione e alle funzioni correlate.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato dentro un AuthProvider');
  }
  return context;
};
