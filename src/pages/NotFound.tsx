import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft, Ghost } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background flex items-center justify-center px-4 overflow-hidden">
      <div className="text-center space-y-8 max-w-2xl mx-auto relative">
        {/* Floating animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="animate-fade-in">
          <div className="relative mb-8">
            <div className="text-9xl font-black bg-gradient-to-r from-primary via-primary/60 to-primary bg-clip-text text-transparent animate-scale-in">
              404
            </div>
            <Ghost className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 text-primary/20 animate-bounce" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Lost in Space
          </h1>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in max-w-md mx-auto">
            Oops! Looks like this page took a wrong turn in the digital universe. 
            Don't worry, we'll help you find your way back!
          </p>
        </div>

        <Card className="animate-scale-in shadow-2xl border-primary/20">
          <CardContent className="p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Button asChild size="lg" className="group hover-scale">
                <Link to="/">
                  <Home className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Return Home
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)} 
                size="lg"
                className="group hover-scale"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
            </div>
            
            <Button variant="ghost" asChild size="lg" className="w-full hover-scale">
              <Link to="/blog">
                <Search className="h-5 w-5 mr-2" />
                Explore Our Blog
              </Link>
            </Button>
          </CardContent>
        </Card>

        <p className="text-sm text-muted-foreground animate-fade-in">
          Still lost?{' '}
          <Link to="/contact" className="text-primary hover:underline font-semibold story-link">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
