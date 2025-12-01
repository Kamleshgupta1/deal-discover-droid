import { Check, X } from 'lucide-react';
import { PasswordValidation } from '@/utils/passwordValidation';

interface PasswordStrengthIndicatorProps {
  validation: PasswordValidation;
  password: string;
}

export const PasswordStrengthIndicator = ({ validation, password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const getStrengthColor = () => {
    switch (validation.strength) {
      case 'strong': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'weak': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStrengthWidth = () => {
    switch (validation.strength) {
      case 'strong': return 'w-full';
      case 'medium': return 'w-2/3';
      case 'weak': return 'w-1/3';
      default: return 'w-0';
    }
  };

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Password strength</span>
          <span className={`font-medium ${
            validation.strength === 'strong' ? 'text-success' :
            validation.strength === 'medium' ? 'text-warning' :
            'text-destructive'
          }`}>
            {validation.strength.charAt(0).toUpperCase() + validation.strength.slice(1)}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getStrengthColor()} ${getStrengthWidth()}`}
          />
        </div>
      </div>

      {/* Requirements Checklist */}
      <div className="space-y-1.5">
        <p className="text-xs text-muted-foreground font-medium">Requirements:</p>
        <div className="grid grid-cols-1 gap-1">
          <RequirementItem
            met={validation.checks.length}
            text="At least 8 characters"
          />
          <RequirementItem
            met={validation.checks.uppercase}
            text="One uppercase letter (A-Z)"
          />
          <RequirementItem
            met={validation.checks.lowercase}
            text="One lowercase letter (a-z)"
          />
          <RequirementItem
            met={validation.checks.number}
            text="One number (0-9)"
          />
          <RequirementItem
            met={validation.checks.special}
            text="One special character (!@#$%...)"
          />
        </div>
      </div>
    </div>
  );
};

const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center gap-2 text-xs">
    {met ? (
      <Check className="h-3.5 w-3.5 text-success flex-shrink-0" />
    ) : (
      <X className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
    )}
    <span className={met ? 'text-foreground' : 'text-muted-foreground'}>
      {text}
    </span>
  </div>
);
