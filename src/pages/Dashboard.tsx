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
  HelpCircle,
  Lightbulb,
  Home,
  DoorOpen,
  BadgeCheck,
  Timer,
  Eye,
  EyeOff,
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
                  La Tua Area Personale
                  <Sparkles className="w-5 h-5 text-accent" />
                </h1>
                <p className="text-muted-foreground">
                  Ciao, <span className="text-primary font-medium">{user.username}</span>! Sei entrato con successo nella tua area riservata.
                </p>
              </div>
            </div>
          </div>

          {/* Success Banner with Analogy */}
          <div className="edu-card animate-fade-in delay-100">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground flex items-center gap-2">
                  🎉 Complimenti! Sei in un'area protetta!
                </p>
                <p className="text-sm text-muted-foreground">
                  Pensa a questa pagina come a una <strong>stanza chiusa a chiave</strong> in un edificio. 
                  Solo chi ha la chiave giusta (il tuo login) può entrare e vedere cosa c'è dentro.
                </p>
                <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <Lightbulb className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-xs text-primary">
                    <strong>Prova:</strong> Fai logout e prova a tornare qui digitando "/dashboard" nella barra degli indirizzi. Vedrai che verrai reindirizzato al login!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Explanation Section */}
          <Card className="p-6 glass border-primary/30 animate-fade-in delay-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-bold text-lg text-foreground">Come Funziona? (Spiegato Semplice)</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-2">
                <div className="flex items-center gap-2">
                  <DoorOpen className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold text-foreground">1. Il Guardiano</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Prima di mostrarti questa pagina, il sistema ha controllato se hai un "braccialetto" valido (il token di sessione). È come un guardiano all'ingresso di un club.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-2">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">2. Il Braccialetto</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Quando hai fatto login, il sistema ti ha dato un "braccialetto" (token). Finché ce l'hai, puoi entrare in tutte le aree riservate senza rifare il login.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50 space-y-2">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-warning" />
                  <h4 className="font-semibold text-foreground">3. La Scadenza</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Il braccialetto ha una data di scadenza. Quando scade, dovrai rifare il login. È una misura di sicurezza: se qualcuno ruba il braccialetto, non durerà per sempre.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* User Info - Made more explanatory */}
            <Card className="p-6 space-y-4 glass border-border/50 hover:border-primary/30 transition-all animate-fade-in delay-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">📋 I Tuoi Dati</h2>
                  <p className="text-xs text-muted-foreground">Queste informazioni sono salvate nel database</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div>
                    <span className="text-muted-foreground text-sm block">ID Utente</span>
                    <span className="text-xs text-muted-foreground/60">Un codice univoco che ti identifica</span>
                  </div>
                  <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded">{user.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div>
                    <span className="text-muted-foreground text-sm block">Username</span>
                    <span className="text-xs text-muted-foreground/60">Il nome che hai scelto</span>
                  </div>
                  <span className="font-medium text-foreground">{user.username}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div>
                    <span className="text-muted-foreground text-sm block">Email</span>
                    <span className="text-xs text-muted-foreground/60">Usata per accedere</span>
                  </div>
                  <span className="text-foreground text-sm">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="text-muted-foreground text-sm block">Data Registrazione</span>
                    <span className="text-xs text-muted-foreground/60">Quando hai creato l'account</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {new Date(user.createdAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Session Info - Made more explanatory */}
            <Card className="p-6 space-y-4 glass border-border/50 hover:border-accent/30 transition-all animate-fade-in delay-300">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Key className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">🎫 Il Tuo "Braccialetto" (Sessione)</h2>
                  <p className="text-xs text-muted-foreground">Questo ti permette di restare connesso</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="py-2 border-b border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground text-sm">Token di Sessione</span>
                    <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Normalmente nascosto
                    </span>
                  </div>
                  <span className="font-mono text-xs text-primary break-all bg-primary/5 p-2 rounded-lg block">
                    {session.token}
                  </span>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    ☝️ Questo codice è come una password temporanea. Il browser lo invia ad ogni richiesta per dimostrare che sei tu.
                  </p>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div>
                    <span className="text-muted-foreground text-sm block">Creata il</span>
                    <span className="text-xs text-muted-foreground/60">Quando hai fatto login</span>
                  </div>
                  <span className="text-foreground text-sm">
                    {new Date(session.createdAt).toLocaleString('it-IT')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <span className="text-muted-foreground text-sm block">Scade il</span>
                    <span className="text-xs text-muted-foreground/60">Dopo dovrai rifare login</span>
                  </div>
                  <span className="text-warning text-sm font-medium">
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
              Stato Autenticazione (Cosa vede il sistema)
            </h3>
            <AuthStatus />
          </div>

          {/* Technical Explanations - Simplified */}
          <div className="space-y-6 animate-fade-in delay-500">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Per i Curiosi: Come Funziona Tecnicamente
            </h2>

            <ExplanationCard title="🚧 Il Guardiano (ProtectedRoute)" type="code">
              <div className="space-y-2">
                <p>
                  Immagina un <strong>buttafuori</strong> all'ingresso di un locale esclusivo.
                </p>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li><strong>Controlla</strong> se hai il braccialetto valido (sei autenticato?)</li>
                  <li><strong>Se sì</strong>, ti fa entrare e vedi il contenuto della pagina</li>
                  <li><strong>Se no</strong>, ti manda via (redirect alla pagina di login)</li>
                </ul>
              </div>
            </ExplanationCard>

            <CodeBlock
              title="ProtectedRoute.tsx - Il codice del guardiano"
              code={`// Il guardiano controlla ogni pagina protetta
const ProtectedRoute = ({ children }) => {
  // Chiede: "Questo utente è autenticato?"
  const { isAuthenticated, isLoading } = useAuth();
  
  // Se sta ancora controllando, mostra "attendere..."
  if (isLoading) return <Loader />;
  
  // Se NON è autenticato → vai al login!
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Se è autenticato → mostra la pagina
  return children;
};`}
            />

            <ExplanationCard title="⚠️ Attenzione: Sicurezza Completa" type="warning">
              <div className="space-y-2">
                <p>
                  Questa protezione è come una <strong>porta di vetro</strong>: ferma le persone normali, 
                  ma un esperto potrebbe aggirarla.
                </p>
                <p className="text-xs">
                  In un'app vera, il <strong>server</strong> (il computer che gestisce i dati) deve 
                  SEMPRE controllare il braccialetto prima di dare informazioni sensibili. 
                  Non fidarsi mai solo del browser dell'utente!
                </p>
              </div>
            </ExplanationCard>

            <ExplanationCard title="💡 Perché tutto questo?" type="info">
              <div className="space-y-2">
                <p>
                  L'autenticazione serve a <strong>proteggere i tuoi dati</strong>. Senza di essa:
                </p>
                <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                  <li>Chiunque potrebbe vedere le tue informazioni personali</li>
                  <li>Qualcuno potrebbe fingere di essere te</li>
                  <li>I tuoi dati potrebbero essere rubati o modificati</li>
                </ul>
                <p className="text-xs mt-2 text-accent">
                  È come chiudere a chiave la porta di casa: non ferma tutti, ma è il primo passo fondamentale!
                </p>
              </div>
            </ExplanationCard>
          </div>

          {/* Logout Button */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <Button
              variant="outline"
              onClick={logout}
              className="gap-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive transition-all"
            >
              <LogOut className="w-4 h-4" />
              Esci (Logout)
            </Button>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              Quando fai logout, il sistema "butta via" il tuo braccialetto. 
              Per rientrare dovrai fare di nuovo il login con email e password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
