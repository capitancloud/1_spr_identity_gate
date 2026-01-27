import React from 'react';
import { Lightbulb, Code, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * =====================================
 * CODE EXPLANATION - BLOCCHI EDUCATIVI
 * =====================================
 * 
 * Componenti per mostrare spiegazioni e codice in modo educativo.
 */

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
      'rounded-xl border-2 p-4 space-y-3',
      styles[type],
      className
    )}>
      <div className="flex items-center gap-2">
        <Icon className={cn('w-5 h-5', iconColors[type])} />
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <div className="text-sm text-foreground/80 leading-relaxed">
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
    <div className="rounded-xl border-2 border-code-border overflow-hidden">
      {title && (
        <div className="bg-secondary px-4 py-2 border-b border-code-border">
          <span className="text-sm font-mono text-muted-foreground">{title}</span>
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
            'flex items-center gap-3 p-2 rounded-lg transition-all',
            index === currentStep && 'bg-primary/10',
            index < currentStep && 'opacity-50'
          )}
        >
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
            index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          )}>
            {index + 1}
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
