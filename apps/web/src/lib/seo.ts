import { SITE } from '@/data/site';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export function buildTitle(title: string): string {
  if (title === SITE.name) return title;
  return `${title} — ${SITE.name}`;
}

export function buildCanonical(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${cleanPath}`;
}

export function orgJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.contactEmail,
      contactType: 'customer support',
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  };
}

export function softwareAppJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Readiness Audit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://aireadiness.oultra.dev',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Structured website audit for AI visibility and crawlability across six scoring categories.',
  };
}
