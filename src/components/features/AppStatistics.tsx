import { FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  FileText,
  Star,
  Award,
  Target,
  BarChart3
} from 'lucide-react';

export const AppStatistics: FC = () => {
  const stats = [
    {
      title: 'Total Categories',
      value: '50+',
      icon: FileText,
      trend: '+12%',
      color: 'text-primary'
    },
    {
      title: 'Comparison Features',
      value: '15',
      icon: BarChart3,
      trend: '+25%',
      color: 'text-secondary'
    },
    {
      title: 'Supported Languages',
      value: '18',
      icon: Award,
      trend: 'New',
      color: 'text-accent'
    },
    {
      title: 'Active Users',
      value: '10K+',
      icon: Users,
      trend: '+45%',
      color: 'text-success'
    }
  ];

  const features = [
    'Real-time price comparison',
    'Multi-language support',
    'AI-powered recommendations',
    'Smart search & filters',
    'Dark/Light themes',
    'Offline mode support',
    'Translation caching',
    'Auto language detection'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Platform Statistics
          </CardTitle>
          <CardDescription>
            Key metrics and performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-card to-muted border border-border/50 hover:shadow-soft transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Platform Features
          </CardTitle>
          <CardDescription>
            Comprehensive comparison and discovery tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-gradient-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
