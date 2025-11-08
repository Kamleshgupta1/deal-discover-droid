import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
            <div className="animate-bounce">
              <AlertTriangle className="h-20 w-20 text-destructive mx-auto mb-4" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-muted-foreground">
                We encountered an unexpected error. Don't worry, we're on it!
              </p>
            </div>

            <Card className="p-6 bg-muted/50 animate-scale-in">
              <p className="text-sm text-muted-foreground font-mono text-left overflow-auto">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={this.handleReset} size="lg" className="gap-2">
                <RefreshCw className="h-5 w-5" />
                Try Again
              </Button>
              
              <Button variant="outline" size="lg" asChild className="gap-2">
                <Link to="/">
                  <Home className="h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              If this problem persists, please{' '}
              <Link to="/contact" className="text-primary hover:underline">
                contact support
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
