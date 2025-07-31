import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  illustration: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Explore More",
    description: "Search for what you want. Ex: products, services, destinations and more.",
    illustration: "🔍🛍️"
  },
  {
    title: "Offer Something",
    description: "Offer something in return of what the user wants. Ex: your products, talents, services.",
    illustration: "🤝💝"
  },
  {
    title: "Enjoy Swap",
    description: "Have fun and find your needs. Enjoy the swap experience.",
    illustration: "📱✨"
  }
];

export const WelcomeTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenWelcomeTour');
    if (!hasSeenTour) {
      // Show tour after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcomeTour', 'true');
  };

  if (!isVisible) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-white shadow-elegant border-0 overflow-hidden">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-muted/50 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-0">
            {/* Illustration Area */}
            <div className="bg-gradient-subtle h-64 flex items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-secondary rounded-full animate-pulse delay-300" />
                <div className="absolute bottom-6 left-8 w-4 h-4 bg-accent rounded-full animate-pulse delay-700" />
                <div className="absolute bottom-4 right-6 w-2 h-2 bg-primary rounded-full animate-pulse delay-500" />
              </div>
              
              {/* Main Illustration */}
              <div className="text-center space-y-4 animate-scale-in">
                <div className="text-6xl animate-bounce">
                  {currentTourStep.illustration}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  {currentTourStep.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {currentTourStep.description}
                </p>
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center justify-center gap-2">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'bg-primary w-6'
                        : index < currentStep
                        ? 'bg-primary/60'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  SKIP
                </Button>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      className="px-3"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNext}
                    className="btn-gradient px-6"
                  >
                    {currentStep === tourSteps.length - 1 ? (
                      'GET STARTED'
                    ) : (
                      <>
                        NEXT
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};