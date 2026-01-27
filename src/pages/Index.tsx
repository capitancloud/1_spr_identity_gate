import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthStatus from '@/components/AuthStatus';
import { ExplanationCard, CodeBlock } from '@/components/CodeExplanation';
import {
  Shield,
  Key,
  Lock,
  UserCheck,
  ArrowRight,
  Database,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

/**
 * =====================================
 * HOME PAGE - INTRODUZIONE A IDENTITYGATE
 * =====================================
 * 
 * Questa pagina introduce i concetti di autenticazione
 * e mostra lo stato corrente della sessione.
 */

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const concepts = [
    {
      icon: Key,
      title: 'Hashing Password',
      description: 'Le password non vengono mai salvate in chiaro. Usiamo funzioni hash one-way per proteggerle.',
    },
    {
      icon: Database,
      title: 'Sessioni & Token',
      description: 'Dopo il login, creiamo un token univoco che identifica la sessione utente.',
    },
    {
      icon: Lock,
      title: 'Route Protette',
      description: 'Alcune pagine sono accessibili solo agli utenti autenticati (middleware).',
    },
    {
      icon: RefreshCw,
      title: 'Persistenza',
      description: 'La sessione viene salvata e ripristinata automaticamente ad ogni visita.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 auth-gradient opacity-5" />
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              App Educativa sull'Autenticazione
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Impara come funziona
              <span className="text-primary block">l'Autenticazione Web</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              IdentityGate è un'applicazione didattica che ti mostra passo dopo passo
              come implementare login, logout, sessioni e protezione delle route.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Vai alla Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      Inizia - Registrati
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                      Ho già un account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stato Auth in tempo reale */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-md mx-auto">
            <h2 className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
              Stato Autenticazione in Tempo Reale
            </h2>
            <AuthStatus />
          </div>
        </div>
      </section>

      {/* Concetti chiave */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-center text-foreground mb-12">
            Cosa Imparerai
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {concepts.map((concept, index) => (
              <Card
                key={index}
                className="p-6 space-y-3 hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 w-fit rounded-lg bg-primary/10">
                  <concept.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {concept.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {concept.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spiegazione tecnica */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-center text-foreground">
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
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            IdentityGate - App educativa per imparare l'autenticazione web
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
