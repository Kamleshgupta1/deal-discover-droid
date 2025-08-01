import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="animate-slide-up">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <Button variant="ghost" asChild className="w-full">
              <Link to="/">
                <Search className="h-4 w-4 mr-2" />
                Search Categories
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="text-sm text-muted-foreground">
          Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
