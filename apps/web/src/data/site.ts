export const SITE = {
  name: 'Oultra',
  domain: 'oultra.dev',
  url: 'https://oultra.dev',
  description: 'Oultra is a software consultancy that builds custom software, integrates AI, and ships practical tools. We write production-grade code and deliver real outcomes.',
  contactEmail: 'contact@oultra.dev',
  ogImage: '/og-default.png',
  twitterHandle: '@oultra',
} as const;

export const SERVICES = [
  {
    id: 'software-development',
    name: 'Software Development',
    description: 'Custom web applications, APIs, and internal tools built to production standards.',
  },
  {
    id: 'ai-integration',
    name: 'AI Integration',
    description: 'We help teams adopt AI practically — from proof-of-concept to production deployment.',
  },
  {
    id: 'technical-consulting',
    name: 'Technical Consulting',
    description: 'Architecture reviews, technology selection, and hands-on technical leadership.',
  },
] as const;

export const PRODUCTS = {
  aiReadiness: {
    name: 'AI Readiness Audit',
    url: 'https://aireadiness.oultra.dev',
    slug: '/products/ai-readiness',
    tagline: 'Measure how visible, structured, and machine-readable your website really is.',
    description: 'A structured audit across six categories that tells you exactly where your website stands for AI crawlers, LLMs, and search engines — and what to fix first.',
  },
} as const;
