import React from 'react';
import { Lightbulb, Code, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationCardProps {
  title: string;
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'code';
  className?: string;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  title,
  children,
  type = 'info',
  className,
}) => {
  const icons = {
    info: Lightbulb,
    warning: AlertTriangle,
    success: CheckCircle,
    code: Code,
  };

  const styles = {
    info: 'border-primary/30 bg-primary/5',
    warning: 'border-warning/30 bg-warning/5',
    success: 'border-accent/30 bg-accent/5',
    code: 'border-code-border bg-code-bg',
  };

  const iconColors = {
    info: 'text-primary',
    warning: 'text-warning',
    success: 'text-accent',
    code: 'text-muted-foreground',
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'rounded-xl border-2 p-5 space-y-3 glass backdrop-blur-sm transition-all hover:border-opacity-50',
      styles[type],
      className
    )}>
      <div className="flex items-center gap-2">
        <div className={cn('p-2 rounded-lg', styles[type])}>
          <Icon className={cn('w-5 h-5', iconColors[type])} />
        </div>
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <div className="text-sm text-foreground/80 leading-relaxed pl-11">
        {children}
      </div>
    </div>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  title,
}) => {
  return (
    <div className="rounded-xl border-2 border-border/50 overflow-hidden glass">
      {title && (
        <div className="bg-secondary/50 px-4 py-2 border-b border-border/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-warning/50" />
            <div className="w-3 h-3 rounded-full bg-accent/50" />
          </div>
          <span className="text-sm font-mono text-muted-foreground ml-2">{title}</span>
        </div>
      )}
      <pre className="bg-code-bg p-4 overflow-x-auto">
        <code className="font-mono text-sm text-foreground whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
};

interface StepIndicatorProps {
  steps: string[];
  currentStep?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep = 0,
}) => {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
            index === currentStep && 'bg-primary/10 border border-primary/30 glow-primary',
            index < currentStep && 'opacity-50'
          )}
        >
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
            index === currentStep 
              ? 'bg-gradient-primary text-primary-foreground animate-pulse-glow' 
              : index < currentStep 
                ? 'bg-accent/20 text-accent' 
                : 'bg-secondary text-secondary-foreground'
          )}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          <span className={cn(
            'text-sm',
            index === currentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
          )}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};
