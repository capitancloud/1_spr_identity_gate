import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExplanationCard, StepIndicator } from '@/components/CodeExplanation';
import { LogIn, Mail, Lock, AlertCircle, Loader2, ArrowLeft, Shield, Sparkles } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="space-y-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla home
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Accedi</h1>
                <p className="text-muted-foreground">
                  Inserisci le tue credenziali
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 glass border-border/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@esempio.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm animate-scale-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full gap-2 bg-gradient-primary hover:opacity-90 glow-primary transition-all"
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
                    <Sparkles className="w-3 h-3" />
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

      {/* Right: Explanations */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative z-10">
        <div className="max-w-md space-y-6 animate-slide-in">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Flusso di Login
          </h2>
          
          <StepIndicator steps={loginSteps} currentStep={currentStep} />

          <ExplanationCard title="Cosa succede durante il login?" type="info">
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Le credenziali vengono inviate al server</li>
              <li>La password viene confrontata con l'hash salvato</li>
              <li>Se corretta, viene generato un token di sessione</li>
              <li>Il token viene salvato nel browser</li>
            </ol>
          </ExplanationCard>

          <ExplanationCard title="Sicurezza" type="warning">
            <p className="text-sm">
              Il messaggio di errore è generico ("Credenziali non valide") per non
              rivelare se un'email esiste nel sistema.
            </p>
          </ExplanationCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
