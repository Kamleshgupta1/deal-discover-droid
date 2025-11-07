import { Facebook, Twitter, Linkedin, Mail, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copied!',
        description: 'The link has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-600'
    }
  ];

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold mb-4">Share this article</h3>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              className={`transition-colors ${link.color} hover:text-white`}
              onClick={() => window.open(link.url, '_blank', 'width=600,height=400')}
            >
              <Icon className="h-4 w-4 mr-2" />
              {link.name}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary hover:text-primary-foreground"
          onClick={copyToClipboard}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  );
};
