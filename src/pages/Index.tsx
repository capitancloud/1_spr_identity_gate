import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthStatus from '@/components/AuthStatus';
import { ExplanationCard, CodeBlock } from '@/components/CodeExplanation';
import heroImage from '@/assets/hero-security.jpg';
import {
  Shield,
  Key,
  Lock,
  ArrowRight,
  Database,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
  Code,
  Terminal,
} from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const concepts = [
    {
      icon: Key,
      title: 'Hashing Password',
      description: 'Le password non vengono mai salvate in chiaro. Usiamo funzioni hash one-way per proteggerle.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Database,
      title: 'Sessioni & Token',
      description: 'Dopo il login, creiamo un token univoco che identifica la sessione utente.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Lock,
      title: 'Route Protette',
      description: 'Alcune pagine sono accessibili solo agli utenti autenticati (middleware).',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: RefreshCw,
      title: 'Persistenza',
      description: 'La sessione viene salvata e ripristinata automaticamente ad ogni visita.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-hero rounded-full blur-3xl" />
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl float" style={{ animationDelay: '2s' }} />
        
        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary text-sm font-medium shimmer">
                <ShieldCheck className="w-4 h-4" />
                App Educativa sull'Autenticazione
                <Sparkles className="w-3 h-3" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Impara come funziona
                <span className="text-gradient block mt-2">l'Autenticazione Web</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                IdentityGate è un'applicazione didattica che ti mostra passo dopo passo
                come implementare <span className="text-primary font-medium">login</span>, <span className="text-accent font-medium">logout</span>, <span className="text-warning font-medium">sessioni</span> e protezione delle route.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-primary hover:opacity-90 glow-primary transition-all">
                      <Zap className="w-4 h-4" />
                      Vai alla Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="gap-2 w-full sm:w-auto bg-gradient-primary hover:opacity-90 glow-primary transition-all">
                        <Zap className="w-4 h-4" />
                        Inizia - Registrati
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto border-primary/50 hover:bg-primary/10 transition-all">
                        <Terminal className="w-4 h-4" />
                        Ho già un account
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative animate-fade-in delay-200 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-border/50 glow-primary">
                <img
                  src={heroImage}
                  alt="Security visualization"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass p-4 rounded-xl border border-primary/30 animate-bounce-in delay-400">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Code className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">100% Educativo</p>
                    <p className="text-xs text-muted-foreground">Codice commentato</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Status Widget */}
      <section className="py-16 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="container relative">
          <div className="max-w-md mx-auto">
            <h2 className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Stato Autenticazione in Tempo Reale
            </h2>
            <AuthStatus />
          </div>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Cosa Imparerai
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Scopri i fondamenti della sicurezza web attraverso esempi pratici e codice commentato
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {concepts.map((concept, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 glass border-border/50 hover:border-primary/30 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-3 w-fit rounded-xl ${concept.bgColor} group-hover:scale-110 transition-transform`}>
                  <concept.icon className={`w-6 h-6 ${concept.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {concept.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {concept.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center text-foreground">
              Come Funziona?
            </h2>

            <ExplanationCard title="Flusso di Autenticazione" type="info">
              <ol className="list-decimal list-inside space-y-2">
                <li>L'utente inserisce email e password nel form</li>
                <li>La password viene confrontata con l'hash salvato</li>
                <li>Se valida, viene generato un token di sessione</li>
                <li>Il token viene salvato e usato per le richieste future</li>
              </ol>
            </ExplanationCard>

            <ExplanationCard title="Perché l'Hashing?" type="warning">
              <p>
                Se salvassimo le password in chiaro, un attaccante che accede al database
                vedrebbe tutte le password. Con l'hashing, anche in caso di violazione,
                le password originali restano protette.
              </p>
            </ExplanationCard>

            <CodeBlock
              title="Esempio: Hashing simulato"
              code={`// MAI salvare password in chiaro!
const hashPassword = (password: string) => {
  // In produzione: bcrypt.hash(password, saltRounds)
  return crypto.createHash('sha256')
    .update(password + salt)
    .digest('hex');
};`}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-gradient">IdentityGate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            App educativa per imparare l'autenticazione web
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
