import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Database, CheckCircle, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const TranslationCacheManager = () => {
  const { toast } = useToast();
  const [cacheSize, setCacheSize] = useState(() => {
    try {
      const cached = localStorage.getItem('translation-cache');
      return cached ? Object.keys(JSON.parse(cached)).length : 0;
    } catch {
      return 0;
    }
  });

  const getCacheStorageSize = () => {
    try {
      const cached = localStorage.getItem('translation-cache');
      if (!cached) return '0 KB';
      const bytes = new Blob([cached]).size;
      return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(2)} KB`;
    } catch {
      return '0 KB';
    }
  };

  const clearCache = () => {
    try {
      localStorage.removeItem('translation-cache');
      setCacheSize(0);
      toast({
        title: "Cache Cleared",
        description: "All cached translations have been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear translation cache.",
        variant: "destructive",
      });
    }
  };

  const exportCache = () => {
    try {
      const cached = localStorage.getItem('translation-cache');
      if (!cached) {
        toast({
          title: "No Data",
          description: "Translation cache is empty.",
        });
        return;
      }

      const blob = new Blob([cached], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translation-cache-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Cache Exported",
        description: "Translation cache has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export translation cache.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Database className="h-4 w-4" />
          Translation Cache
        </CardTitle>
        <CardDescription>
          Manage your translation cache to improve performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Cached Translations</p>
              <p className="text-xs text-muted-foreground">Number of stored translations</p>
            </div>
            <Badge variant="secondary" className="text-base">
              {cacheSize}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm font-medium">Storage Size</p>
              <p className="text-xs text-muted-foreground">Cache memory usage</p>
            </div>
            <Badge variant="secondary" className="text-base">
              {getCacheStorageSize()}
            </Badge>
          </div>
        </div>

        {cacheSize > 0 ? (
          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <CheckCircle className="h-4 w-4 text-success" />
            <p className="text-sm text-success-foreground">
              Cache is active and improving translation speed
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No cached translations yet
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={exportCache}
            disabled={cacheSize === 0}
          >
            Export Cache
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={cacheSize === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Translation Cache?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all {cacheSize} cached translations. They will be re-fetched when needed, which may temporarily slow down translations.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearCache}>
                  Clear Cache
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
