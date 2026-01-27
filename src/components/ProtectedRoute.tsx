import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Loader2 } from 'lucide-react';

/**
 * =====================================
 * PROTECTED ROUTE - MIDDLEWARE FRONTEND
 * =====================================
 * 
 * Questo componente agisce come un "middleware" che protegge le rotte.
 * 
 * COS'È UN MIDDLEWARE?
 * Un middleware è un codice che si interpone tra una richiesta e la sua destinazione.
 * Può:
 * - Bloccare l'accesso (come facciamo qui)
 * - Modificare la richiesta
 * - Aggiungere informazioni
 * - Loggare attività
 * 
 * FLUSSO:
 * 1. L'utente tenta di accedere a /dashboard
 * 2. ProtectedRoute verifica se è autenticato
 * 3. Se NO → redirect a /login
 * 4. Se SÌ → mostra il contenuto richiesto
 * 
 * NOTA IMPORTANTE:
 * Questa protezione è solo lato frontend!
 * In un'app reale, il backend deve SEMPRE verificare l'autenticazione.
 * Mai fidarsi solo del frontend per la sicurezza.
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  /**
   * STATO DI CARICAMENTO
   * 
   * Durante il ripristino della sessione, mostriamo un loader.
   * Questo evita flash indesiderati (es: redirect al login
   * quando l'utente è effettivamente loggato).
   */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative">
            <Shield className="w-16 h-16 text-primary mx-auto" />
            <Loader2 className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              Verifica autenticazione...
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Controllo sessione in corso
            </p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * REDIRECT SE NON AUTENTICATO
   * 
   * Navigate con replace=true evita che l'utente torni
   * alla pagina protetta con il pulsante "indietro".
   * 
   * Passiamo state.from per ricordare dove voleva andare,
   * così dopo il login possiamo reindirizzarlo lì.
   */
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  /**
   * UTENTE AUTENTICATO
   * 
   * Se arriviamo qui, l'utente ha una sessione valida.
   * Renderizziamo il contenuto protetto.
   */
  return <>{children}</>;
};

export default ProtectedRoute;
