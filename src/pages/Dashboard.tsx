import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthStatus from '@/components/AuthStatus';
import { ExplanationCard, CodeBlock } from '@/components/CodeExplanation';
import {
  Shield,
  User,
  Clock,
  Key,
  Lock,
  CheckCircle,
  AlertTriangle,
  Code,
} from 'lucide-react';

/**
 * =====================================
 * DASHBOARD - AREA PROTETTA
 * =====================================
 * 
 * Questa pagina è accessibile SOLO agli utenti autenticati.
 * È protetta dal componente ProtectedRoute.
 * 
 * Se un utente non autenticato tenta di accedere,
 * viene reindirizzato automaticamente al login.
 */

const Dashboard: React.FC = () => {
  const { user, session, logout } = useAuth();

  if (!user || !session) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-2 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl auth-gradient">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Dashboard Protetta
                </h1>
                <p className="text-muted-foreground">
                  Benvenuto, {user.username}! Questa è un'area riservata.
                </p>
              </div>
            </div>
          </div>

          {/* Banner educativo */}
          <div className="edu-card animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  Sei in un'area protetta!
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
            {/* Info Utente */}
            <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Dati Utente</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">ID</span>
                  <span className="font-mono text-sm text-foreground">{user.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">Username</span>
                  <span className="font-medium text-foreground">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
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

            {/* Info Sessione */}
            <Card className="p-6 space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-foreground">Sessione Attiva</h2>
              </div>
              
              <div className="space-y-3">
                <div className="py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm block mb-1">Token</span>
                  <span className="font-mono text-xs text-foreground break-all">
                    {session.token}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
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

          {/* Stato Auth Widget */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Stato Autenticazione
            </h3>
            <AuthStatus />
          </div>

          {/* Spiegazioni tecniche */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <h2 className="text-xl font-bold text-foreground">
              Come Funziona la Protezione
            </h2>

            <ExplanationCard title="Middleware ProtectedRoute" type="code">
              <p className="mb-3">
                Il componente ProtectedRoute avvolge le pagine protette e verifica
                l'autenticazione prima di renderizzare il contenuto.
              </p>
            </ExplanationCard>

            <CodeBlock
              title="src/components/ProtectedRoute.tsx"
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
                per ogni richiesta protetta. Mai fidarsi solo del client.
              </p>
            </ExplanationCard>

            <ExplanationCard title="Flusso di verifica" type="success">
              <ol className="list-decimal list-inside space-y-1">
                <li>L'utente naviga su /dashboard</li>
                <li>ProtectedRoute controlla useAuth()</li>
                <li>Se isLoading → mostra spinner</li>
                <li>Se !isAuthenticated → redirect a /login</li>
                <li>Se autenticato → renderizza Dashboard</li>
              </ol>
            </ExplanationCard>
          </div>

          {/* Azioni */}
          <div className="flex justify-center pt-4">
            <Button
              variant="destructive"
              onClick={logout}
              className="gap-2"
            >
              <Lock className="w-4 h-4" />
              Termina Sessione (Logout)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
