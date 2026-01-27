import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExplanationCard, CodeBlock } from '@/components/CodeExplanation';
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2, ArrowLeft, CheckCircle, Shield, Sparkles, Zap } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }

    if (password.length < 6) {
      setError('La password deve avere almeno 6 caratteri');
      return;
    }

    setIsLoading(true);

    const result = await register(email, username, password);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.error || 'Errore durante la registrazione');
    }

    setIsLoading(false);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { level: 0, text: '', color: '' };
    if (password.length < 6) return { level: 1, text: 'Debole', color: 'bg-destructive' };
    if (password.length < 10) return { level: 2, text: 'Media', color: 'bg-warning' };
    return { level: 3, text: 'Forte', color: 'bg-accent' };
  };

  const strength = getPasswordStrength();

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <Card className="p-8 max-w-md text-center space-y-4 glass border-accent/30 animate-bounce-in relative z-10">
          <div className="p-4 rounded-full bg-accent/10 w-fit mx-auto animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Registrazione Completata!
          </h2>
          <p className="text-muted-foreground">
            Il tuo account è stato creato. Verrai reindirizzato alla pagina di login...
          </p>
          <div className="pt-4">
            <Link to="/login">
              <Button className="gap-2 bg-gradient-primary">
                <Zap className="w-4 h-4" />
                Vai al Login
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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
              <div className="p-2 rounded-xl bg-gradient-accent">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Registrati</h1>
                <p className="text-muted-foreground">
                  Crea un nuovo account
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6 glass border-border/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="mario_rossi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

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
                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1 animate-scale-in">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                            level <= strength.level ? strength.color : 'bg-secondary'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Forza: <span className={strength.level === 3 ? 'text-accent' : strength.level === 2 ? 'text-warning' : 'text-destructive'}>{strength.text}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Conferma Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                className="w-full gap-2 bg-gradient-accent hover:opacity-90 glow-accent transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creazione account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Crea Account
                    <Sparkles className="w-3 h-3" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Hai già un account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Accedi
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Explanations */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative z-10">
        <div className="max-w-md space-y-6 animate-slide-in">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            Hashing delle Password
          </h2>

          <ExplanationCard title="Perché non salviamo la password?" type="warning">
            <p className="text-sm">
              Se un attaccante accede al database e le password sono in chiaro,
              tutti gli account sono compromessi. Con l'hashing, anche conoscendo
              l'hash, non può risalire alla password originale.
            </p>
          </ExplanationCard>

          <CodeBlock
            title="hash.ts"
            code={`// Password originale
"miaPassword123"

// Dopo l'hashing (SHA-256)
"a5c8b2..."  // 64 caratteri hex

// Caratteristiche:
// ✓ One-way (irreversibile)
// ✓ Deterministico
// ✓ Resistente alle collisioni`}
          />

          <ExplanationCard title="Salt: sicurezza extra" type="success">
            <p className="text-sm">
              Il "salt" è un valore random aggiunto prima dell'hashing.
              Così due utenti con la stessa password avranno hash diversi.
            </p>
          </ExplanationCard>
        </div>
      </div>
    </div>
  );
};

export default Register;
