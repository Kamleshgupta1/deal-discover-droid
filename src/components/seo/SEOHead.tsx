import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords,
  ogImage,
  ogTitle,
  ogDescription,
  type = 'website',
  canonicalUrl
}: SEOHeadProps) => {
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  const defaultImage = `${siteUrl}/og-default.jpg`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description || ''} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content="Your Site Name" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description || ''} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Helmet>
  );
};
