import React, { useState } from 'react';
import { useAccessCode } from '@/contexts/AccessCodeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Lock, AlertCircle, Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import superProgrammatoreLogo from '@/assets/super-programmatore-logo.png';

/**
 * =====================================
 * PAGINA CODICE DI ACCESSO
 * =====================================
 * 
 * Questa è la prima barriera di sicurezza dell'app.
 * Prima di vedere qualsiasi contenuto, l'utente deve
 * inserire il codice segreto.
 * 
 * È come la porta d'ingresso di un edificio:
 * devi avere la chiave giusta per entrare!
 */

const AccessCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const { unlock } = useAccessCode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simula un piccolo ritardo (come una vera verifica server)
    await new Promise(r => setTimeout(r, 500));

    const success = unlock(code);
    
    if (!success) {
      setError('Codice di accesso non valido. Riprova.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* Contenuto principale */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={superProgrammatoreLogo} 
              alt="Super Programmatore Logo" 
              className="w-64 h-auto max-w-full"
            />
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">IdentityGate</h1>
            <p className="text-muted-foreground">
              Inserisci il codice di accesso per entrare
            </p>
          </div>

          {/* Form */}
          <Card className="p-6 glass border-border/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessCode" className="text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Codice di Accesso
                </Label>
                <div className="relative">
                  <Input
                    id="accessCode"
                    type={showCode ? "text" : "password"}
                    placeholder="Inserisci il codice segreto..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pr-10 bg-secondary/50 border-border/50 focus:border-primary font-mono"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
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
                disabled={isLoading || !code}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifica in corso...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Sblocca App
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
