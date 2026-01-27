import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthStatus from '@/components/AuthStatus';
import { ExplanationCard, CodeBlock } from '@/components/CodeExplanation';
import {
  Shield,
  User,
  Key,
  Lock,
  CheckCircle,
  Code,
  Sparkles,
  Zap,
  LogOut,
  Terminal,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, session, logout } = useAuth();

  if (!user || !session) return null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-primary glow-primary">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  Dashboard Protetta
                  <Sparkles className="w-5 h-5 text-accent" />
                </h1>
                <p className="text-muted-foreground">
                  Benvenuto, <span className="text-primary font-medium">{user.username}</span>! Questa è un'area riservata.
                </p>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          <div className="edu-card animate-fade-in delay-100">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground flex items-center gap-2">
                  Sei in un'area protetta!
                  <Zap className="w-4 h-4 text-accent" />
                </p>
                <p className="text-sm text-muted-foreground">
                  Questa pagina è visibile solo perché il middleware ProtectedRoute
                  ha verificato la tua sessione. Prova a fare logout e accedere
                  direttamente a /dashboard: verrai reindirizzato al login.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* User Info */}
            <Card className="p-6 space-y-4 glass border-border/50 hover:border-primary/30 transition-all animate-fade-in delay-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">Dati Utente</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">ID</span>
                  <span className="font-mono text-sm text-accent">{user.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Username</span>
                  <span className="font-medium text-foreground">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Email</span>
                  <span className="text-foreground">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Registrato il</span>
                  <span className="text-foreground text-sm">
                    {new Date(user.createdAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Session Info */}
            <Card className="p-6 space-y-4 glass border-border/50 hover:border-accent/30 transition-all animate-fade-in delay-300">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Key className="w-5 h-5 text-accent" />
                </div>
                <h2 className="font-semibold text-foreground">Sessione Attiva</h2>
              </div>
              
              <div className="space-y-3">
                <div className="py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm block mb-1">Token</span>
                  <span className="font-mono text-xs text-primary break-all bg-primary/5 p-2 rounded-lg block">
                    {session.token}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">Creata</span>
                  <span className="text-foreground text-sm">
                    {new Date(session.createdAt).toLocaleString('it-IT')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Scade</span>
                  <span className="text-foreground text-sm">
                    {new Date(session.expiresAt).toLocaleString('it-IT')}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Auth Status Widget */}
          <div className="animate-fade-in delay-400">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              Stato Autenticazione
            </h3>
            <AuthStatus />
          </div>

          {/* Technical Explanations */}
          <div className="space-y-6 animate-fade-in delay-500">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Come Funziona la Protezione
            </h2>

            <ExplanationCard title="Middleware ProtectedRoute" type="code">
              <p className="mb-3">
                Il componente ProtectedRoute avvolge le pagine protette e verifica
                l'autenticazione prima di renderizzare il contenuto.
              </p>
            </ExplanationCard>

            <CodeBlock
              title="ProtectedRoute.tsx"
              code={`const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Mostra loader durante il check
  if (isLoading) return <Loader />;
  
  // Redirect se non autenticato
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Utente autenticato: mostra contenuto
  return children;
};`}
            />

            <ExplanationCard title="Sicurezza lato server" type="warning">
              <p>
                <strong>Importante:</strong> questa protezione è solo lato frontend!
                In un'app reale, il backend deve SEMPRE verificare il token di sessione
                per ogni richiesta protetta.
              </p>
            </ExplanationCard>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={logout}
              className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive transition-all"
            >
              <LogOut className="w-4 h-4" />
              Termina Sessione (Logout)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
