export const HERO = {
  eyebrow: 'Software consultancy',
  headline: 'We build software that works.',
  subheadline: 'Oultra is a software consultancy. We design, build, and ship custom software — from web applications to AI integrations. Practical code, real outcomes.',
  ctaPrimary: { label: 'Start a project', href: '/contact' },
  ctaSecondary: { label: 'See AI Readiness Audit', href: '/products/ai-readiness' },
  credibility: 'Based in Latin America. Working globally.',
} as const;

export const TRUST_STATS = [
  { value: 'Full-stack', label: 'Development' },
  { value: 'AI-ready', label: 'Integration' },
  { value: 'Fast', label: 'Delivery' },
  { value: 'Direct', label: 'Communication' },
] as const;

export const WHAT_WE_DO = [
  {
    icon: 'code',
    title: 'Software Development',
    body: 'We build web applications, APIs, internal tools, and data pipelines. Production-quality code from day one — no throwaway prototypes.',
  },
  {
    icon: 'bolt',
    title: 'AI Integration',
    body: 'We help teams add AI capabilities to their products. LLM APIs, structured pipelines, AI-powered workflows — practical implementation, not demos.',
  },
  {
    icon: 'grid',
    title: 'Our Products',
    body: 'We also build and ship our own software tools. AI Readiness Audit is the first — a structured audit for website machine-readability.',
    link: { label: 'See our products', href: '/products' },
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell us what you need',
    body: 'We start with a direct conversation about the problem, the constraints, and the outcome you need.',
  },
  {
    step: '02',
    title: 'We design and build',
    body: 'Clear scope, honest timelines, and regular delivery. We write production-ready code and keep you in the loop.',
  },
  {
    step: '03',
    title: 'You ship and scale',
    body: 'Clean handoff, solid documentation, and continued support if you need it. No lock-in.',
  },
] as const;

export const WHY_IT_MATTERS = {
  eyebrow: 'Why work with us',
  headline: 'Most software problems are execution problems.',
  paragraphs: [
    'Good ideas stall because of slow iteration cycles, vague requirements, and code that\'s hard to change. We fix that.',
    'We work directly with founders, product teams, and engineering leads. No account managers, no layers — just people who write code and ship software.',
    'And because we build our own products too, we think about software from both sides of the table: as consultants who deliver, and as builders who maintain.',
  ],
} as const;

export const FINAL_CTA = {
  eyebrow: 'Ready to build?',
  headline: 'Tell us about your project.',
  body: 'We work with teams of all sizes on software development, AI integration, and technical consulting.',
  cta: { label: 'Start a project', href: '/contact' },
  note: 'Or reach us directly at contact@oultra.dev',
} as const;
