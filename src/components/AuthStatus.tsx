import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ShieldOff, Clock, User, Key } from 'lucide-react';
import { Card } from '@/components/ui/card';

/**
 * =====================================
 * AUTH STATUS - VISUALIZZATORE STATO AUTH
 * =====================================
 * 
 * Questo componente mostra visivamente lo stato di autenticazione.
 * È educativo: mostra cosa succede "dietro le quinte".
 */

const AuthStatus: React.FC = () => {
  const { user, session, isAuthenticated, getAuthExplanation } = useAuth();

  return (
    <Card className="p-4 space-y-3 border-2 auth-transition">
      {/* Header con stato */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <div className="p-2 rounded-full bg-accent/10 auth-pulse">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-accent">Autenticato</p>
              <p className="text-xs text-muted-foreground">Sessione attiva</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 rounded-full bg-destructive/10">
              <ShieldOff className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">Non Autenticato</p>
              <p className="text-xs text-muted-foreground">Accesso limitato</p>
            </div>
          </>
        )}
      </div>

      {/* Dettagli sessione (se autenticato) */}
      {isAuthenticated && session && user && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Utente:</span>
            <span className="font-mono text-foreground">{user.username}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Key className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Token:</span>
            <span className="font-mono text-xs text-foreground truncate max-w-[150px]">
              {session.token}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Scade:</span>
            <span className="font-mono text-xs text-foreground">
              {new Date(session.expiresAt).toLocaleString('it-IT')}
            </span>
          </div>
        </div>
      )}

      {/* Spiegazione educativa */}
      <div className="pt-2 border-t border-border">
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          {getAuthExplanation()}
        </p>
      </div>
    </Card>
  );
};

export default AuthStatus;
