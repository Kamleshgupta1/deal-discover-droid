import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { 
  Mail, 
  ArrowLeft,
  Lock,
  CheckCircle
} from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import appIcon from '@/assets/app-icon.png';

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email sending process
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>

        {/* Forgot Password Card */}
        <Card className="overflow-hidden shadow-strong animate-scale-in">
          {/* Header */}
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {isEmailSent ? 'Check Your Email' : 'Forgot Password?'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isEmailSent 
                ? "We've sent password reset instructions to your email address"
                : "No worries, we'll send you reset instructions"
              }
            </p>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 bg-muted/50 border-muted focus:bg-background"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 btn-gradient font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Instructions...
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="p-3 bg-success/10 rounded-full">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                </div>

                {/* Email Info */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We sent a password reset link to:
                  </p>
                  <p className="font-medium text-foreground">{email}</p>
                </div>

                {/* Instructions */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">Next steps:</h3>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Check your email inbox</li>
                    <li>Click the reset link in the email</li>
                    <li>Create a new password</li>
                    <li>Sign in with your new password</li>
                  </ol>
                </div>

                {/* Resend Button */}
                <Button
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      Resending...
                    </div>
                  ) : (
                    'Resend Email'
                  )}
                </Button>
              </div>
            )}

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or{' '}
            <Link to="/contact" className="text-primary hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};