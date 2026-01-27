import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ShieldOff, Clock, User, Key, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AuthStatus: React.FC = () => {
  const { user, session, isAuthenticated, getAuthExplanation } = useAuth();

  return (
    <Card className="p-4 space-y-3 glass border-2 transition-all duration-300 hover:border-primary/30">
      {/* Header */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <div className="relative p-2 rounded-full bg-accent/20 animate-pulse-glow">
              <Shield className="w-5 h-5 text-accent" />
              <Zap className="w-3 h-3 text-accent absolute -bottom-0.5 -right-0.5" />
            </div>
            <div>
              <p className="font-semibold text-accent">Autenticato</p>
              <p className="text-xs text-muted-foreground">Sessione attiva</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-2 rounded-full bg-destructive/20">
              <ShieldOff className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">Non Autenticato</p>
              <p className="text-xs text-muted-foreground">Accesso limitato</p>
            </div>
          </>
        )}
      </div>

      {/* Session details */}
      {isAuthenticated && session && user && (
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Utente:</span>
            <span className="font-mono text-foreground">{user.username}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Key className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Token:</span>
            <span className="font-mono text-xs text-accent truncate max-w-[150px]">
              {session.token}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Scade:</span>
            <span className="font-mono text-xs text-foreground">
              {new Date(session.expiresAt).toLocaleString('it-IT')}
            </span>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="pt-2 border-t border-border/50">
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          {getAuthExplanation()}
        </p>
      </div>
    </Card>
  );
};

export default AuthStatus;
