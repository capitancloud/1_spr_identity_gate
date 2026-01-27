import React, { useState, useEffect } from 'react';
import { 
  User, 
  Server, 
  Database, 
  Key, 
  Shield, 
  Check, 
  ArrowRight,
  Lock,
  Hash,
  Fingerprint,
  FileKey,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const loginSteps: FlowStep[] = [
  {
    id: 1,
    title: 'Invio Credenziali',
    description: 'Email e password vengono inviate al server',
    icon: User,
    color: 'text-primary',
  },
  {
    id: 2,
    title: 'Ricerca Utente',
    description: 'Il server cerca l\'utente nel database',
    icon: Database,
    color: 'text-accent',
  },
  {
    id: 3,
    title: 'Verifica Hash',
    description: 'La password viene confrontata con l\'hash salvato',
    icon: Hash,
    color: 'text-warning',
  },
  {
    id: 4,
    title: 'Generazione Token',
    description: 'Viene creato un token di sessione univoco',
    icon: FileKey,
    color: 'text-primary',
  },
  {
    id: 5,
    title: 'Accesso Garantito',
    description: 'L\'utente è autenticato e può accedere',
    icon: CheckCircle2,
    color: 'text-accent',
  },
];

const registerSteps: FlowStep[] = [
  {
    id: 1,
    title: 'Dati Utente',
    description: 'Username, email e password vengono inviati',
    icon: User,
    color: 'text-primary',
  },
  {
    id: 2,
    title: 'Validazione',
    description: 'I dati vengono validati (email unica, etc.)',
    icon: Shield,
    color: 'text-warning',
  },
  {
    id: 3,
    title: 'Hashing Password',
    description: 'La password viene convertita in hash sicuro',
    icon: Lock,
    color: 'text-accent',
  },
  {
    id: 4,
    title: 'Salvataggio',
    description: 'I dati vengono salvati nel database',
    icon: Database,
    color: 'text-primary',
  },
  {
    id: 5,
    title: 'Account Creato',
    description: 'L\'utente può ora effettuare il login',
    icon: CheckCircle2,
    color: 'text-accent',
  },
];

const AuthFlowDiagram: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<'login' | 'register'>('login');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const steps = activeFlow === 'login' ? loginSteps : registerSteps;

  // Auto-advance animation
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          // Reset after showing all steps
          return 0;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnimating, steps.length]);

  // Reset when changing flow
  useEffect(() => {
    setCurrentStep(0);
  }, [activeFlow]);

  return (
    <div className="space-y-8">
      {/* Flow selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveFlow('login')}
          className={cn(
            'px-6 py-3 rounded-xl font-medium transition-all duration-300',
            activeFlow === 'login'
              ? 'bg-gradient-primary text-primary-foreground glow-primary'
              : 'glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
          )}
        >
          <span className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Flusso Login
          </span>
        </button>
        <button
          onClick={() => setActiveFlow('register')}
          className={cn(
            'px-6 py-3 rounded-xl font-medium transition-all duration-300',
            activeFlow === 'register'
              ? 'bg-gradient-accent text-accent-foreground glow-accent'
              : 'glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/30'
          )}
        >
          <span className="flex items-center gap-2">
            <Fingerprint className="w-4 h-4" />
            Flusso Registrazione
          </span>
        </button>
      </div>

      {/* Main diagram */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/30 -translate-y-1/2 hidden lg:block" />
        
        {/* Animated progress line */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-accent -translate-y-1/2 transition-all duration-500 hidden lg:block"
          style={{ 
            width: `${(currentStep / steps.length) * 100}%`,
          }}
        />

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index < currentStep;
            const isCurrent = index === currentStep - 1;

            return (
              <div
                key={step.id}
                className={cn(
                  'relative flex flex-col items-center text-center transition-all duration-500',
                  isActive ? 'opacity-100' : 'opacity-40'
                )}
              >
                {/* Step circle */}
                <div
                  className={cn(
                    'relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 z-10',
                    isActive 
                      ? 'glass border-2 border-primary/50' 
                      : 'bg-secondary/50 border-2 border-border/30',
                    isCurrent && 'animate-pulse-glow scale-110'
                  )}
                >
                  {/* Animated ring */}
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-ping opacity-30" />
                  )}
                  
                  <Icon 
                    className={cn(
                      'w-8 h-8 transition-all duration-300',
                      isActive ? step.color : 'text-muted-foreground'
                    )} 
                  />

                  {/* Check badge */}
                  {isActive && !isCurrent && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center animate-bounce-in">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                  )}
                </div>

                {/* Step number */}
                <div className={cn(
                  'absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-20',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                )}>
                  {step.id}
                </div>

                {/* Arrow (mobile) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden my-2">
                    <ArrowRight className={cn(
                      'w-5 h-5 rotate-90 transition-colors duration-300',
                      isActive ? 'text-primary' : 'text-border'
                    )} />
                  </div>
                )}

                {/* Content */}
                <div className="mt-4 space-y-1">
                  <h4 className={cn(
                    'font-semibold transition-colors duration-300',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-[140px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 rounded-lg glass border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-all"
        >
          {isAnimating ? '⏸ Pausa' : '▶ Riprendi'}
        </button>
        <button
          onClick={() => setCurrentStep(0)}
          className="px-4 py-2 rounded-lg glass border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-all"
        >
          ↺ Ricomincia
        </button>
      </div>

      {/* Data flow visualization */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <DataFlowCard
          icon={User}
          title="Client"
          description="Browser dell'utente"
          items={['Form di login', 'Memorizza token', 'Invia richieste']}
          isActive={currentStep >= 1}
          color="primary"
        />
        <DataFlowCard
          icon={Server}
          title="Server"
          description="Backend dell'applicazione"
          items={['Valida credenziali', 'Genera token', 'Verifica sessioni']}
          isActive={currentStep >= 2}
          color="warning"
        />
        <DataFlowCard
          icon={Database}
          title="Database"
          description="Storage persistente"
          items={['Salva utenti', 'Hash password', 'Gestisce sessioni']}
          isActive={currentStep >= 2}
          color="accent"
        />
      </div>
    </div>
  );
};

interface DataFlowCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
  isActive: boolean;
  color: 'primary' | 'accent' | 'warning';
}

const DataFlowCard: React.FC<DataFlowCardProps> = ({
  icon: Icon,
  title,
  description,
  items,
  isActive,
  color,
}) => {
  const colorClasses = {
    primary: 'border-primary/30 bg-primary/5',
    accent: 'border-accent/30 bg-accent/5',
    warning: 'border-warning/30 bg-warning/5',
  };

  const iconClasses = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    warning: 'text-warning bg-warning/10',
  };

  return (
    <div
      className={cn(
        'rounded-xl border-2 p-5 transition-all duration-500',
        isActive ? colorClasses[color] : 'border-border/30 bg-secondary/20 opacity-50'
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn('p-2 rounded-lg', isActive ? iconClasses[color] : 'bg-secondary')}>
          <Icon className={cn('w-5 h-5', isActive ? `text-${color}` : 'text-muted-foreground')} />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={cn(
              'flex items-center gap-2 text-sm transition-all duration-300',
              isActive ? 'text-foreground' : 'text-muted-foreground'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={cn(
              'w-1.5 h-1.5 rounded-full',
              isActive ? `bg-${color}` : 'bg-muted-foreground'
            )} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthFlowDiagram;
