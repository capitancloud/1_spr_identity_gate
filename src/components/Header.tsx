import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessCode } from '@/contexts/AccessCodeContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, LogIn, UserPlus, Home, LayoutDashboard, Sparkles, KeyRound } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { lock } = useAccessCode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /**
   * BLOCCA APP
   * 
   * Questo pulsante "blocca" l'app, riportando l'utente
   * alla schermata di inserimento del codice di accesso.
   * È diverso dal logout utente!
   */
  const handleLockApp = () => {
    lock();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all group">
          <div className="relative p-2 rounded-xl bg-gradient-primary glow-primary">
            <Shield className="w-5 h-5 text-primary-foreground" />
            <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="font-bold text-xl text-gradient">IdentityGate</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary transition-all">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary transition-all">
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
              </Link>

              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border/50">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  <span className="text-accent">●</span>{' '}
                  <span className="font-medium text-foreground">{user?.username}</span>
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary transition-all">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Accedi</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="gap-2 bg-gradient-primary hover:opacity-90 transition-all glow-primary">
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Registrati</span>
                </Button>
              </Link>
            </>
          )}

          {/* Pulsante per bloccare l'app (tornare al codice) */}
          <div className="ml-2 pl-2 border-l border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLockApp}
              className="gap-2 hover:bg-warning/10 hover:text-warning transition-all"
              title="Blocca l'app e torna alla schermata del codice"
            >
              <KeyRound className="w-4 h-4" />
              <span className="hidden sm:inline">Blocca</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
