import { Card } from '@/components/ui/card';

export const HomeFeatures = () => {
  const features = [
    {
      emoji: '🔍',
      title: 'Smart Comparison',
      description: 'Compare features, prices, and reviews across multiple platforms instantly',
      gradient: 'from-primary/10 to-accent/10'
    },
    {
      emoji: '⚡',
      title: 'Real-Time Results',
      description: 'Get accurate results in seconds with our advanced comparison engine',
      gradient: 'from-accent/10 to-success/10'
    },
    {
      emoji: '💰',
      title: 'Best Deals',
      description: 'Find exclusive offers and save money on your favorite services',
      gradient: 'from-success/10 to-warning/10'
    },
    {
      emoji: '🎯',
      title: 'Personalized',
      description: 'Get recommendations tailored to your preferences and location',
      gradient: 'from-warning/10 to-primary/10'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Choose First Look?</h2>
        <p className="text-muted-foreground text-lg">The smartest way to compare and find the best deals</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={feature.title}
            className={`text-center p-6 border-0 bg-gradient-to-br ${feature.gradient} hover:shadow-elegant transition-all duration-300 hover-scale`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
              <span className="text-3xl">{feature.emoji}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};