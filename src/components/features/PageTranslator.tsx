import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PageTranslatorProps {
  contentSelector?: string;
}

export const PageTranslator = ({ contentSelector = 'main' }: PageTranslatorProps) => {
  const { translateMultiple, isTranslating } = useTranslation();
  const { languages, currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [targetLanguage, setTargetLanguage] = useState(currentLanguage);
  const [originalContent, setOriginalContent] = useState<{ element: Element; text: string }[]>([]);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [showRateLimitWarning, setShowRateLimitWarning] = useState(false);

  useEffect(() => {
    setTargetLanguage(currentLanguage);
  }, [currentLanguage]);

  const translatePage = async () => {
    setShowRateLimitWarning(false);
    
    try {
      const container = document.querySelector(contentSelector);
      if (!container) {
        toast({
          title: 'Error',
          description: 'Content container not found',
          variant: 'destructive',
        });
        return;
      }

      // Store original content if not already stored
      if (originalContent.length === 0) {
        const textNodes: { element: Element; text: string }[] = [];
        const walker = document.createTreeWalker(
          container,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const text = node.textContent?.trim();
              if (text && text.length > 0 && node.parentElement) {
                // Skip script, style, and code elements
                const parent = node.parentElement;
                if (!['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(parent.tagName)) {
                  return NodeFilter.FILTER_ACCEPT;
                }
              }
              return NodeFilter.FILTER_REJECT;
            },
          }
        );

        let node;
        while ((node = walker.nextNode())) {
          if (node.parentElement) {
            textNodes.push({
              element: node.parentElement,
              text: node.textContent || '',
            });
          }
        }
        setOriginalContent(textNodes);
        
        // Limit the number of elements to translate to avoid rate limits
        if (textNodes.length > 50) {
          setShowRateLimitWarning(true);
          toast({
            title: 'Warning',
            description: `This page has ${textNodes.length} text elements. Translation may take a while and could hit rate limits.`,
            variant: 'default',
          });
        }
      }

      // Translate in batches with progress updates
      const textsToTranslate = originalContent.map(item => item.text);
      const BATCH_SIZE = 10;
      const translatedTexts: string[] = [];
      
      for (let i = 0; i < textsToTranslate.length; i += BATCH_SIZE) {
        const batch = textsToTranslate.slice(i, i + BATCH_SIZE);
        const batchTranslations = await translateMultiple(batch, targetLanguage);
        translatedTexts.push(...batchTranslations);
        
        // Update progress
        const progress = Math.min(100, Math.round(((i + batch.length) / textsToTranslate.length) * 100));
        setTranslationProgress(progress);
      }

      // Update DOM with translations
      originalContent.forEach((item, index) => {
        const textNode = Array.from(item.element.childNodes).find(
          node => node.nodeType === Node.TEXT_NODE
        );
        if (textNode && translatedTexts[index]) {
          textNode.textContent = translatedTexts[index];
        }
      });

      setTranslationProgress(0);
      toast({
        title: 'Translation Complete',
        description: `Page translated to ${languages.find(l => l.code === targetLanguage)?.name}`,
      });
    } catch (error) {
      console.error('Page translation error:', error);
      setTranslationProgress(0);
      toast({
        title: 'Translation Failed',
        description: 'Failed to translate page content. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const restoreOriginal = () => {
    originalContent.forEach((item) => {
      const textNode = Array.from(item.element.childNodes).find(
        node => node.nodeType === Node.TEXT_NODE
      );
      if (textNode) {
        textNode.textContent = item.text;
      }
    });

    toast({
      title: 'Restored',
      description: 'Original content restored',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 space-y-2">
      {showRateLimitWarning && (
        <Alert className="bg-background/95 backdrop-blur-sm border-border max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Large page detected. Translation uses rate-limited API and may take time.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <Select value={targetLanguage} onValueChange={setTargetLanguage}>
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={translatePage}
            disabled={isTranslating || targetLanguage === 'en'}
          >
            {isTranslating ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                {translationProgress > 0 ? `${translationProgress}%` : 'Translating...'}
              </>
            ) : (
              'Translate Page'
            )}
          </Button>
          {originalContent.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={restoreOriginal}
              disabled={isTranslating}
            >
              Restore
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
