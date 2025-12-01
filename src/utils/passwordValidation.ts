export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export const validatePassword = (password: string): PasswordValidation => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const errors: string[] = [];
  if (!checks.length) errors.push('Password must be at least 8 characters long');
  if (!checks.uppercase) errors.push('Include at least one uppercase letter');
  if (!checks.lowercase) errors.push('Include at least one lowercase letter');
  if (!checks.number) errors.push('Include at least one number');
  if (!checks.special) errors.push('Include at least one special character (!@#$%^&*...)');

  const passedChecks = Object.values(checks).filter(Boolean).length;
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (passedChecks >= 5) strength = 'strong';
  else if (passedChecks >= 3) strength = 'medium';

  return {
    isValid: errors.length === 0,
    errors,
    strength,
    checks,
  };
};
