import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExplanationCard, StepIndicator } from '@/components/CodeExplanation';
import { LogIn, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

/**
 * =====================================
 * LOGIN PAGE
 * =====================================
 * 
 * Questa pagina gestisce il processo di login.
 * Include spiegazioni educative sul flusso di autenticazione.
 */

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Dove reindirizzare dopo il login
  const from = (location.state as { from?: string })?.from || '/dashboard';

  const loginSteps = [
    'Inserimento credenziali',
    'Verifica password con hash',
    'Generazione token sessione',
    'Redirect alla dashboard',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setCurrentStep(1);

    // Simula il flusso passo-passo per scopi educativi
    await new Promise(r => setTimeout(r, 400));
    setCurrentStep(2);

    const result = await login(email, password);

    if (result.success) {
      setCurrentStep(3);
      await new Promise(r => setTimeout(r, 300));
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Errore durante il login');
      setCurrentStep(0);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Colonna sinistra: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla home
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Accedi</h1>
            <p className="text-muted-foreground">
              Inserisci le tue credenziali per accedere
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@esempio.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Accesso in corso...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Accedi
                  </>
                )}
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Non hai un account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Registrati
            </Link>
          </p>
        </div>
      </div>

      {/* Colonna destra: Spiegazioni */}
      <div className="hidden lg:flex flex-1 bg-secondary/30 items-center justify-center p-8">
        <div className="max-w-md space-y-6 animate-slide-in">
          <h2 className="text-xl font-bold text-foreground">
            Flusso di Login
          </h2>
          
          <StepIndicator steps={loginSteps} currentStep={currentStep} />

          <ExplanationCard title="Cosa succede durante il login?" type="info">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Le credenziali vengono inviate al server</li>
              <li>La password viene confrontata con l'hash salvato</li>
              <li>Se corretta, viene generato un token di sessione</li>
              <li>Il token viene salvato nel browser (localStorage/cookie)</li>
            </ol>
          </ExplanationCard>

          <ExplanationCard title="Sicurezza" type="warning">
            <p className="text-sm">
              Il messaggio di errore è generico ("Credenziali non valide") per non
              rivelare se un'email esiste nel sistema. Questo previene attacchi
              di enumerazione degli utenti.
            </p>
          </ExplanationCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
