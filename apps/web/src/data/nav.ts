export interface NavItem {
  label: string;
  href: string;
}

export interface NavDropdownItem extends NavItem {
  description: string;
  badge?: string;
}

export interface NavDropdown {
  label: string;
  items: NavDropdownItem[];
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
];

export const WORK_DROPDOWN: NavDropdown = {
  label: 'Work',
  items: [
    {
      label: 'Software Development',
      href: '/company#services',
      description: 'Custom apps, APIs, and tools built to production standards.',
      badge: 'Service',
    },
    {
      label: 'AI Integration',
      href: '/company#services',
      description: 'From prototype to production — practical AI implementation.',
      badge: 'Service',
    },
    {
      label: 'Technical Consulting',
      href: '/company#services',
      description: 'Architecture reviews, tech selection, and engineering leadership.',
      badge: 'Service',
    },
    {
      label: 'AI Readiness Audit',
      href: '/products/ai-readiness',
      description: 'Structured website audit for AI visibility and crawlability.',
      badge: 'Product',
    },
  ],
};

export const FOOTER_LINKS = {
  services: [
    { label: 'Software Development', href: '/company#services' },
    { label: 'AI Integration', href: '/company#services' },
    { label: 'Technical Consulting', href: '/company#services' },
  ],
  products: [
    { label: 'AI Readiness Audit', href: '/products/ai-readiness' },
    { label: 'All Products', href: '/products' },
  ],
  company: [
    { label: 'About', href: '/company' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
