# AGENTS.md — Developer & AI Agent Guide

This document explains how the Oultra website is structured, how to make common changes, and the rules all contributors (human and AI) must follow. Read this before touching any code.

---

## What this project is

Oultra is a **software consultancy** that also ships its own products. The site communicates both:
1. Services: software development, AI integration, technical consulting
2. Products: AI Readiness Audit (live), more in development

**AI Readiness Audit is one product, not the whole company.** Do not make it the dominant message on general pages.

---

## Repository structure

```
/
├── apps/
│   └── web/                    ← Astro marketing site (only app right now)
│       ├── astro.config.ts     ← Astro + Vite config
│       ├── package.json
│       ├── tsconfig.json
│       ├── public/             ← Static files (favicon, robots.txt)
│       └── src/
│           ├── assets/         ← Images and binary assets
│           ├── components/
│           │   ├── layout/     ← SiteHeader.astro, SiteFooter.astro
│           │   ├── sections/   ← Full page sections (Hero, TrustStrip, etc.)
│           │   ├── ui/         ← Reusable primitives (Button, Card, Reveal, etc.)
│           │   └── motion/     ← React islands (client-side interactive components)
│           ├── data/           ← All copy and structured content (TypeScript)
│           ├── layouts/        ← BaseLayout.astro (wraps every page)
│           ├── lib/            ← Utilities (seo.ts, etc.)
│           ├── pages/          ← Astro page files (one file = one URL)
│           └── styles/
│               └── global.css  ← Tailwind v4 entry, @theme tokens, base styles
│
├── packages/
│   ├── ui/                     ← Stub: shared UI package (not yet used)
│   ├── content/                ← Stub: shared content package (not yet used)
│   └── config/                 ← Stub: shared config package (not yet used)
│
├── CLAUDE.md                   ← Project brief for AI coding agents
├── AGENTS.md                   ← This file — architecture and how-to guide
├── design.md                   ← Visual design system specification
└── pnpm-workspace.yaml         ← Monorepo workspace config
```

---

## Stack

| Tool | Version | Purpose |
|---|---|---|
| Astro | 5.x | Static site generator, page routing, island hydration |
| Tailwind CSS | 4.x | Utility-first styling via CSS `@theme` — no config file |
| React | 19.x | Islands only (interactive components) |
| Motion for React | 12.x | Animation library — import from `motion/react` |
| TypeScript | 5.x | Strict mode throughout |
| pnpm | 10.x | Package manager with workspaces |

---

## Commands

All commands run from the **repo root** (`/Users/dave_u/code/oultra/web-page`).

```bash
# Start dev server
pnpm dev
# or directly:
pnpm --filter @oultra/web dev

# Production build
pnpm build

# Preview production build
pnpm --filter @oultra/web preview

# Type check
pnpm --filter @oultra/web check
```

> Node is managed via nvm. If `pnpm` is not found, run `source ~/.nvm/nvm.sh` first.

---

## CSS and design tokens

Tailwind v4 is configured via CSS only. There is no `tailwind.config.js`.

All tokens are defined in `apps/web/src/styles/global.css` inside `@theme {}`:

```css
@theme {
  --color-bg-0: #080a0f;       /* page background */
  --color-bg-1: #0d1017;       /* elevated surface */
  --color-bg-2: #131720;       /* card / panel */
  --color-bg-3: #1a2030;       /* hover state */

  --color-text-1: #eef2ff;     /* primary text */
  --color-text-2: #8b9ab8;     /* secondary text */
  --color-text-3: #4a5568;     /* muted/label text */

  --color-accent-1: #2563eb;   /* electric blue — primary CTA */
  --color-accent-2: #06b6d4;   /* cyan — highlights */
  --color-accent-3: #6366f1;   /* indigo — secondary accent */

  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger:  #ef4444;

  --color-border: rgba(255,255,255,0.07);
  --color-border-strong: rgba(255,255,255,0.13);

  --font-sans: "Inter Variable", ...;
  --font-mono: "JetBrains Mono", ...;

  --duration-fast: 120ms;
  --duration-mid:  300ms;
  --duration-slow: 600ms;
}
```

Token → Tailwind class mapping:
- `--color-accent-1` → `bg-accent-1`, `text-accent-1`, `border-accent-1`
- `--color-bg-2` → `bg-bg-2`
- `--color-text-2` → `text-text-2`
- `--font-sans` → `font-sans`
- `--duration-fast` → `duration-fast` (for `transition-duration`)

**Rule**: Never use raw hex or rgba values in component files. Always use the token-backed Tailwind class. If a new recurring value is needed, add it to `@theme` in `global.css` first.

---

## Data files — where copy lives

All site copy lives in `apps/web/src/data/`. Never hardcode copy inside component or page files.

| File | What it contains |
|---|---|
| `site.ts` | Site name, URL, description, contact email, SERVICES array, PRODUCTS object |
| `nav.ts` | Nav links, WORK_DROPDOWN items, FOOTER_LINKS |
| `home.ts` | HERO, TRUST_STATS, WHAT_WE_DO, HOW_IT_WORKS, WHY_IT_MATTERS, FINAL_CTA |
| `products.ts` | AUDIT_CATEGORIES, EXAMPLE_SCORE, TOP_ISSUES, FAQ_ITEMS |

To update copy: edit the relevant data file. Components read from it automatically.

---

## How to add a new page

1. Create `apps/web/src/pages/[your-slug].astro`
2. Import and use `BaseLayout` with title, description, and canonical:
   ```astro
   ---
   import BaseLayout from '@/layouts/BaseLayout.astro';
   ---
   <BaseLayout
     title="Page Title"
     description="Meta description for this page."
     canonical="/your-slug"
   >
     <!-- content here -->
   </BaseLayout>
   ```
3. Add the page to nav if it needs to appear in menus: edit `apps/web/src/data/nav.ts`
4. Add it to `FOOTER_LINKS` in `nav.ts` if it belongs in the footer

**Rules:**
- One `<h1>` per page only
- Always pass `canonical` to BaseLayout
- Use `<section>` for major page blocks, not `<div>`

---

## How to add a new section component

1. Create `apps/web/src/components/sections/YourSection.astro`
2. Import data from `@/data/` — never hardcode copy
3. Use `SectionShell` for the outer wrapper if the section has a standard eyebrow/heading/subheading pattern:
   ```astro
   ---
   import SectionShell from '@/components/ui/SectionShell.astro';
   ---
   <SectionShell eyebrow="Label" heading="Main heading">
     <!-- content -->
   </SectionShell>
   ```
4. Add `data-reveal` to elements that should animate in on scroll:
   ```astro
   <div data-reveal data-delay="1">...</div>
   ```
5. Import the section in the relevant page file

---

## How to add a new service

1. Open `apps/web/src/data/site.ts`
2. Add an entry to the `SERVICES` array:
   ```ts
   {
     id: 'your-service-id',
     name: 'Service Name',
     description: 'One-sentence description.',
   }
   ```
3. The service will appear automatically in:
   - `FutureProductsRail.astro` (services + products grid on home page)
   - `company.astro` (services section)
4. Add it to `WORK_DROPDOWN` in `nav.ts` if it should appear in the nav

---

## How to add a new product

1. Open `apps/web/src/data/site.ts`
2. Add a key to the `PRODUCTS` object:
   ```ts
   export const PRODUCTS = {
     aiReadiness: { ... },          // existing
     yourProduct: {
       name: 'Product Name',
       url: 'https://yourproduct.oultra.dev',
       slug: '/products/your-product',
       tagline: 'One-line description.',
       description: 'Two-sentence description.',
     },
   };
   ```
3. Create the product page: `apps/web/src/pages/products/your-product.astro`
4. Add product data to `apps/web/src/data/products.ts` (categories, FAQs, etc.)
5. Add to `WORK_DROPDOWN` in `nav.ts`:
   ```ts
   { label: 'Product Name', href: '/products/your-product', description: '...', badge: 'Product' }
   ```
6. Add to `FOOTER_LINKS.products` in `nav.ts`
7. Add a `ProductCard` to `apps/web/src/pages/products/index.astro`

---

## How to add a React island

React islands are for **interactive UI only** — animation state machines, focus traps, count-up animations. Don't use React for static content.

1. Create `apps/web/src/components/motion/YourComponent.tsx`
2. Export a default React component
3. Import and use in an Astro file with a hydration directive:
   ```astro
   import YourComponent from '@/components/motion/YourComponent';
   <YourComponent client:visible />
   ```

**Hydration directives:**
- `client:load` — hydrates immediately on page load (use for above-fold, critical interactivity like MobileMenu, HeroAuditShell)
- `client:visible` — hydrates when element enters viewport (use for below-fold animations like ScoreBreakdown)
- Never use `client:only` — it skips SSR and hurts performance

**Motion imports:**
```tsx
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
```

Always check `useReducedMotion()` and skip or simplify animations when it returns `true`.

---

## Key components and their props

### `BaseLayout.astro`
```ts
interface Props {
  title: string;          // required — page title (site name appended automatically)
  description?: string;   // meta description (falls back to SITE.description)
  canonical?: string;     // URL path e.g. "/products/ai-readiness"
  ogImage?: string;       // path to OG image, default: "/og-default.png"
  noindex?: boolean;      // set true for legal/utility pages
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];  // additional JSON-LD
}
```

### `SectionShell.astro`
```ts
interface Props {
  eyebrow?: string;       // small label above heading
  heading?: string;       // h2
  subheading?: string;    // paragraph under heading
  align?: 'left' | 'center';
  id?: string;            // HTML id for anchor links
  class?: string;
}
```

### `Button.astro`
```ts
interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  type?: 'button' | 'submit';
}
```

### `GlowPanel.astro`
```ts
interface Props {
  glow?: 'blue' | 'cyan' | 'indigo' | 'none';
  border?: boolean;
}
```

### `Reveal.astro`
```ts
interface Props {
  delay?: 0 | 1 | 2 | 3 | 4 | 5;  // stagger delay index
  tag?: string;                      // HTML tag to render (default: 'div')
}
```

---

## Reveal animations

Any element with `data-reveal` will fade + translate up when it enters the viewport. A small inline script in `BaseLayout.astro` handles this via `IntersectionObserver`.

```html
<!-- Basic reveal -->
<div data-reveal>Content</div>

<!-- With stagger delay (1–5, each = 100ms offset) -->
<div data-reveal data-delay="1">First</div>
<div data-reveal data-delay="2">Second</div>
```

Under `prefers-reduced-motion`, elements are immediately visible with no animation.

---

## SEO utilities (`lib/seo.ts`)

```ts
import { buildTitle, buildCanonical, orgJsonLd, websiteJsonLd, softwareAppJsonLd } from '@/lib/seo';
```

- `orgJsonLd()` — Organization schema (included on all pages by BaseLayout)
- `websiteJsonLd()` — WebSite schema (included on all pages by BaseLayout)
- `softwareAppJsonLd()` — SoftwareApplication schema for product pages
- Pass additional schemas via the `jsonLd` prop on `BaseLayout`

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Astro components | PascalCase | `SiteHeader.astro` |
| React islands | PascalCase | `HeroAuditShell.tsx` |
| Pages | kebab-case | `ai-readiness.astro` |
| Data exports | SCREAMING_SNAKE or PascalCase | `HERO`, `AUDIT_CATEGORIES` |
| CSS classes (custom) | kebab-case | `score-bar-fill` |
| TypeScript interfaces | PascalCase | `NavDropdownItem` |

---

## What NOT to do

- **Don't hardcode copy** in component or page files. It goes in `src/data/`.
- **Don't add React** to a component that doesn't need client-side state or animation. Use Astro.
- **Don't use `client:only`** — it skips SSR.
- **Don't use arbitrary CSS values** in component files — add a token to `global.css` instead.
- **Don't present AI Readiness Audit as the whole company** on general pages. It is one product.
- **Don't invent fake services or products** that don't exist. Use "Coming soon" only sparingly.
- **Don't animate layout properties** (width, height, top, left). Animate `transform` and `opacity` only.
- **Don't skip `prefers-reduced-motion` checks** in React islands.
- **Don't write comments** unless the why is non-obvious. The code should speak for itself.

---

## Checklist before shipping a change

- [ ] `pnpm build` completes with no errors
- [ ] New copy comes from `src/data/` files, not hardcoded
- [ ] New pages have title, description, canonical in BaseLayout
- [ ] New interactive components use `useReducedMotion`
- [ ] All `<img>` tags have explicit width and height (use Astro `<Image>` where possible)
- [ ] New nav items are added to both the dropdown and `FOOTER_LINKS`
- [ ] No `any` types in TypeScript
