import React from 'react';
import { 
  User, 
  Hash, 
  FileKey, 
  ArrowRight, 
  CheckCircle2,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Server,
  Database,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LoginFlowStep {
  id: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  color: string;
  codeSnippet?: string;
}

const loginFlowSteps: LoginFlowStep[] = [
  {
    id: 1,
    title: 'Inserimento Credenziali',
    description: 'L\'utente compila email e password',
    details: [
      'Il form raccoglie i dati inseriti',
      'La password NON viene mai mostrata in chiaro',
      'I dati vengono preparati per l\'invio sicuro',
    ],
    icon: User,
    color: 'text-primary',
    codeSnippet: 'const { email, password } = formData;',
  },
  {
    id: 2,
    title: 'Verifica Password con Hash',
    description: 'Il server confronta la password',
    details: [
      'La password viene hashata con lo stesso algoritmo',
      'L\'hash viene confrontato con quello salvato',
      'Se corrispondono, l\'utente è autenticato',
    ],
    icon: Hash,
    color: 'text-warning',
    codeSnippet: 'bcrypt.compare(password, storedHash)',
  },
  {
    id: 3,
    title: 'Generazione Token Sessione',
    description: 'Creazione di un token univoco',
    details: [
      'Viene generato un token JWT o session ID',
      'Il token contiene l\'ID utente e la scadenza',
      'Viene firmato con una chiave segreta',
    ],
    icon: FileKey,
    color: 'text-accent',
    codeSnippet: 'jwt.sign({ userId }, SECRET_KEY)',
  },
  {
    id: 4,
    title: 'Redirect alla Dashboard',
    description: 'Accesso completato con successo',
    details: [
      'Il token viene salvato nel browser',
      'L\'utente viene reindirizzato',
      'Le richieste future includeranno il token',
    ],
    icon: CheckCircle2,
    color: 'text-accent',
    codeSnippet: 'localStorage.setItem("token", token)',
  },
];

interface LoginFlowExplainerProps {
  currentStep: number;
  onStepChange?: (step: number) => void;
  isAutoMode?: boolean;
  onAutoModeToggle?: () => void;
}

const LoginFlowExplainer: React.FC<LoginFlowExplainerProps> = ({
  currentStep,
  onStepChange,
  isAutoMode = true,
  onAutoModeToggle,
}) => {
  const handlePrevStep = () => {
    if (onStepChange && currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (onStepChange && currentStep < loginFlowSteps.length) {
      onStepChange(currentStep + 1);
    }
  };

  const handleReset = () => {
    if (onStepChange) {
      onStepChange(0);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (onStepChange && !isAutoMode) {
      onStepChange(stepIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con controlli */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Flusso di Login
        </h2>
        
        {onAutoModeToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAutoModeToggle}
            className={cn(
              "gap-2 transition-all",
              isAutoMode 
                ? "border-primary/50 text-primary" 
                : "border-accent/50 text-accent"
            )}
          >
            {isAutoMode ? (
              <>
                <Play className="w-3 h-3" />
                Automatico
              </>
            ) : (
              <>
                <User className="w-3 h-3" />
                Manuale
              </>
            )}
          </Button>
        )}
      </div>

      {/* Steps verticali */}
      <div className="space-y-3">
        {loginFlowSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index < currentStep;
          const isCurrent = index === currentStep - 1;
          const isClickable = !isAutoMode && onStepChange;

          return (
            <div
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={cn(
                'relative rounded-xl border-2 p-4 transition-all duration-500',
                isActive 
                  ? 'glass border-primary/50 bg-primary/5' 
                  : 'border-border/30 bg-secondary/20',
                isCurrent && 'ring-2 ring-primary/30 animate-pulse-glow',
                isClickable && 'cursor-pointer hover:border-primary/40'
              )}
            >
              {/* Linea di connessione */}
              {index < loginFlowSteps.length - 1 && (
                <div className={cn(
                  'absolute left-7 top-full w-0.5 h-3 -translate-x-1/2 transition-colors duration-500',
                  isActive ? 'bg-primary' : 'bg-border/30'
                )} />
              )}

              <div className="flex items-start gap-4">
                {/* Icona con numero */}
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500',
                    isActive 
                      ? 'bg-gradient-primary text-primary-foreground' 
                      : 'bg-secondary text-muted-foreground'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {/* Badge numero */}
                  <div className={cn(
                    'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold',
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {step.id}
                  </div>

                  {/* Check per step completati */}
                  {isActive && !isCurrent && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                </div>

                {/* Contenuto */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={cn(
                      'font-semibold transition-colors duration-300',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}>
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium animate-pulse">
                        In corso
                      </span>
                    )}
                  </div>
                  
                  <p className={cn(
                    'text-sm mt-1 transition-colors duration-300',
                    isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'
                  )}>
                    {step.description}
                  </p>

                  {/* Dettagli espansi quando attivo */}
                  {(isActive || isCurrent) && (
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-2 text-xs text-foreground/80"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>

                      {/* Code snippet */}
                      {step.codeSnippet && (
                        <div className="mt-2 p-2 rounded-lg bg-background/80 border border-border/50">
                          <code className="text-xs text-primary font-mono">
                            {step.codeSnippet}
                          </code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controlli manuali */}
      {!isAutoMode && onStepChange && (
        <div className="flex items-center justify-between gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Indietro
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-1"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextStep}
            disabled={currentStep >= loginFlowSteps.length}
            className="gap-1"
          >
            Avanti
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Visualizzazione architettura */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
        <ArchitectureNode
          icon={User}
          label="Client"
          isActive={currentStep >= 1}
          color="primary"
        />
        <ArchitectureNode
          icon={Server}
          label="Server"
          isActive={currentStep >= 2}
          color="warning"
        />
        <ArchitectureNode
          icon={Database}
          label="Database"
          isActive={currentStep >= 2}
          color="accent"
        />
      </div>
    </div>
  );
};

interface ArchitectureNodeProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  color: 'primary' | 'warning' | 'accent';
}

const ArchitectureNode: React.FC<ArchitectureNodeProps> = ({
  icon: Icon,
  label,
  isActive,
  color,
}) => {
  const colorClasses = {
    primary: 'border-primary/50 bg-primary/10 text-primary',
    warning: 'border-warning/50 bg-warning/10 text-warning',
    accent: 'border-accent/50 bg-accent/10 text-accent',
  };

  return (
    <div className={cn(
      'flex flex-col items-center gap-1 p-2 rounded-lg border transition-all duration-500',
      isActive ? colorClasses[color] : 'border-border/30 bg-secondary/20 text-muted-foreground opacity-50'
    )}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};

export default LoginFlowExplainer;
