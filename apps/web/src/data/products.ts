export interface AuditCategory {
  id: string;
  name: string;
  score: number;
  description: string;
  checks: string[];
}

export const AUDIT_CATEGORIES: AuditCategory[] = [
  {
    id: 'metadata',
    name: 'Metadata & Titles',
    score: 85,
    description: 'Page titles, meta descriptions, canonical URLs, and hreflang signals that orient crawlers.',
    checks: ['Title tag presence and length', 'Meta description quality', 'Canonical URL consistency', 'Open Graph completeness'],
  },
  {
    id: 'structured-data',
    name: 'Structured Data',
    score: 60,
    description: 'JSON-LD schema markup that turns page content into parseable, citable knowledge.',
    checks: ['JSON-LD presence', 'Schema type coverage', 'FAQ and HowTo markup', 'Organization and WebSite schema'],
  },
  {
    id: 'content-quality',
    name: 'Content Quality',
    score: 78,
    description: 'Answer-dense, factual content with clear structure that LLMs can extract and cite.',
    checks: ['Heading hierarchy', 'Answer-first content patterns', 'Reading level', 'Content-to-code ratio'],
  },
  {
    id: 'performance',
    name: 'Performance',
    score: 71,
    description: 'Page speed and Core Web Vitals — fast pages get crawled more and ranked higher.',
    checks: ['LCP estimate', 'CLS signals', 'Render-blocking resources', 'Image optimization'],
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    score: 82,
    description: 'Semantic HTML and ARIA signals that help both assistive tech and AI parsing.',
    checks: ['Alt text coverage', 'ARIA landmark usage', 'Color contrast indicators', 'Form label associations'],
  },
  {
    id: 'crawlability',
    name: 'Crawlability',
    score: 65,
    description: 'How easily crawlers can discover, navigate, and index your content.',
    checks: ['Robots.txt signals', 'Sitemap presence', 'Internal link depth', 'Noindex / nofollow patterns'],
  },
];

export const EXAMPLE_SCORE = {
  total: 74,
  url: 'example.com',
  categories: AUDIT_CATEGORIES,
};

export const TOP_ISSUES = [
  {
    severity: 'high' as const,
    title: 'Missing FAQ schema on 8 pages',
    detail: 'FAQ schema increases LLM citation probability for Q&A content.',
  },
  {
    severity: 'high' as const,
    title: 'No canonical URL on product pages',
    detail: 'Duplicate content signals confuse crawlers and suppress rankings.',
  },
  {
    severity: 'medium' as const,
    title: 'Heading hierarchy breaks on 3 pages',
    detail: 'H1 → H3 skips weaken semantic structure for both AI and search.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What exactly does the audit check?',
    answer: 'The audit checks 30+ signals across six categories: metadata, structured data, content quality, performance, accessibility, and crawlability. Each check is weighted for relevance to AI and LLM discoverability.',
  },
  {
    question: 'Who is this for?',
    answer: 'Marketing and SEO teams who want to understand how AI tools see their website, and developers who need a structured checklist of machine-readability improvements.',
  },
  {
    question: 'Is it free?',
    answer: 'Yes. The core audit is free with no account required. Run it on any public URL and get results in under 60 seconds.',
  },
  {
    question: 'How is this different from a standard SEO audit?',
    answer: 'Standard SEO audits optimize for Google\'s ranking algorithm. AI Readiness Audit optimizes for how LLMs, AI crawlers, and structured search systems parse and cite your content — which overlaps with but is not identical to traditional SEO.',
  },
  {
    question: 'How often should I run it?',
    answer: 'Run it after major content changes, redesigns, or migrations. For active sites, once a month gives you a useful baseline trend.',
  },
];
