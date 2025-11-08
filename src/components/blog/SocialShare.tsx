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

  const surprisingTexts = [
    "🚀 This blew my mind!",
    "💡 Must read! Life-changing insights:",
    "🔥 You won't believe this!",
    "✨ Game changer alert!",
    "🎯 This is pure gold!",
    "💪 Absolutely brilliant!",
    "🌟 Stop everything and read this!",
    "🎨 Beautiful insights here:",
    "⚡ Mind-blowing content!",
    "🏆 Best thing I read today!",
  ];

  const getRandomText = () => {
    return surprisingTexts[Math.floor(Math.random() * surprisingTexts.length)];
  };

  const shareText = `${getRandomText()} ${title}`;
  const encodedShareText = encodeURIComponent(shareText);

  const copyToClipboard = async () => {
    try {
      const shareableText = `${shareText}\n\n${url}`;
      await navigator.clipboard.writeText(shareableText);
      toast({
        title: 'Link copied!',
        description: 'The link with exciting text has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async (platform: string, shareUrl: string) => {
    if (navigator.share && platform === 'native') {
      try {
        await navigator.share({
          title: shareText,
          text: description,
          url: url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedShareText}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedShareText}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-gray-600'
    }
  ];

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-sm font-semibold mb-4">Share this amazing article 🎉</h3>
      <div className="flex flex-wrap gap-2">
        {navigator.share && (
          <Button
            variant="default"
            size="sm"
            className="animate-fade-in"
            onClick={() => handleShare('native', '')}
          >
            <Link2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              className={`transition-all hover-scale ${link.color} hover:text-white`}
              onClick={() => handleShare(link.name, link.url)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {link.name}
            </Button>
          );
        })}
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-primary hover:text-primary-foreground hover-scale"
          onClick={copyToClipboard}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  );
};
