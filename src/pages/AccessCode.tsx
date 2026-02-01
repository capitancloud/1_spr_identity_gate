import React, { useState } from 'react';
import { useAccessCode } from '@/contexts/AccessCodeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExplanationCard } from '@/components/CodeExplanation';
import { KeyRound, Lock, AlertCircle, Loader2, Shield, Hash, Eye, EyeOff } from 'lucide-react';

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
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mx-auto">
              <KeyRound className="w-12 h-12 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">IdentityGate</h1>
              <p className="text-muted-foreground mt-2">
                Inserisci il codice di accesso per entrare
              </p>
            </div>
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

          {/* Spiegazione didattica */}
          <div className="space-y-4">
            <ExplanationCard title="Come funziona?" type="info">
              <div className="space-y-3 text-sm">
                <p>
                  <strong>🔑 Il codice di accesso</strong> è come la chiave di casa tua. 
                  Solo chi conosce il codice può entrare nell'applicazione.
                </p>
                <p>
                  <strong>🔐 L'hash</strong> è una tecnica di sicurezza: invece di salvare 
                  il codice in chiaro (che sarebbe rischioso), lo trasformiamo in una 
                  "impronta digitale" unica.
                </p>
              </div>
            </ExplanationCard>

            <ExplanationCard title="Perché usare l'hash?" type="warning">
              <div className="flex items-start gap-3 text-sm">
                <Hash className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  Se qualcuno vedesse il codice sorgente dell'app, non potrebbe 
                  scoprire il codice segreto! Vedrebbe solo l'hash, che è 
                  impossibile da invertire.
                </p>
              </div>
            </ExplanationCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
