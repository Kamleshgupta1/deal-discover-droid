// Rate limiting configuration
const RATE_LIMIT_DELAY = 100; // ms between requests
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // ms

// Queue for managing translation requests
let requestQueue: Array<() => Promise<void>> = [];
let isProcessingQueue = false;

const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      await request();
      // Add delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
    }
  }
  
  isProcessingQueue = false;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const translateText = async (
  text: string, 
  targetLanguage: string, 
  sourceLanguage: string = 'en',
  retryCount: number = 0
): Promise<string> => {
  // Return immediately if same language
  if (targetLanguage === sourceLanguage) {
    return text;
  }

  return new Promise((resolve, reject) => {
    const executeRequest = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const response = await fetch(`${supabaseUrl}/functions/v1/translate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            text,
            targetLanguage,
            sourceLanguage,
          }),
        });

        if (!response.ok) {
          if (response.status === 429 && retryCount < MAX_RETRIES) {
            // Rate limited - retry with exponential backoff
            const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryCount);
            console.log(`Rate limited, retrying in ${retryDelay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})`);
            await sleep(retryDelay);
            const result = await translateText(text, targetLanguage, sourceLanguage, retryCount + 1);
            resolve(result);
            return;
          }
          
          throw new Error(`Translation failed: ${response.status}`);
        }

        const data = await response.json();
        resolve(data.translatedText || text);
      } catch (error) {
        console.error('Translation error:', error);
        resolve(text); // Return original text on error
      }
    };

    // Add to queue
    requestQueue.push(executeRequest);
    processQueue();
  });
};

// Batch translation function to reduce API calls
export const translateBatch = async (
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string[]> => {
  if (targetLanguage === sourceLanguage) {
    return texts;
  }

  // Process in smaller batches to avoid overwhelming the API
  const BATCH_SIZE = 5;
  const results: string[] = [];
  
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(text => translateText(text, targetLanguage, sourceLanguage))
    );
    results.push(...batchResults);
  }
  
  return results;
};
