import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export const EmptyState = ({ icon, title, description, className, delay = 0 }: EmptyStateProps) => {
  return (
    <div className={cn('text-center py-12', className)}>
      <div 
        className="text-6xl mb-4 animate-float" 
        style={{ animationDelay: `${delay}ms` }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};