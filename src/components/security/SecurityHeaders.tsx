import { useEffect } from 'react';

export const SecurityHeaders = () => {
  useEffect(() => {
    // Content Security Policy
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;";
    document.head.appendChild(meta);

    // XSS Protection
    const xssProtection = document.createElement('meta');
    xssProtection.httpEquiv = 'X-XSS-Protection';
    xssProtection.content = '1; mode=block';
    document.head.appendChild(xssProtection);

    // Content Type Options
    const contentType = document.createElement('meta');
    contentType.httpEquiv = 'X-Content-Type-Options';
    contentType.content = 'nosniff';
    document.head.appendChild(contentType);

    // Frame Options
    const frameOptions = document.createElement('meta');
    frameOptions.httpEquiv = 'X-Frame-Options';
    frameOptions.content = 'DENY';
    document.head.appendChild(frameOptions);

    // Referrer Policy
    const referrer = document.createElement('meta');
    referrer.name = 'referrer';
    referrer.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrer);

    // Permissions Policy
    const permissions = document.createElement('meta');
    permissions.httpEquiv = 'Permissions-Policy';
    permissions.content = 'camera=(), microphone=(), geolocation=(), payment=()';
    document.head.appendChild(permissions);

    return () => {
      // Cleanup
      document.head.removeChild(meta);
      document.head.removeChild(xssProtection);
      document.head.removeChild(contentType);
      document.head.removeChild(frameOptions);
      document.head.removeChild(referrer);
      document.head.removeChild(permissions);
    };
  }, []);

  return null;
};