# CLAUDE.md

## Project
Build the public marketing website for **Oultra**, a **software consultancy** that builds custom software, integrates AI, and ships its own tools. The site must feel premium, fast, technical, and credible.

Oultra is **not** a single-product AI tool company. It is a software consultancy that:
1. Delivers custom software development, AI integration, and technical consulting for clients
2. Also builds and ships its own software products (first product: AI Readiness Audit)

The site must communicate this dual identity clearly without feeling like a generic agency.

Do **not** build a generic agency site.
Do **not** clone Inception Labs.
Use its motion quality and visual confidence as inspiration only.

Primary reference for visual rhythm and section pacing:
- https://www.inceptionlabs.ai/

Primary product/content reference:
- https://aireadiness.oultra.dev/

---

## Core decision
Use **Astro** for the marketing site and keep heavy interactivity isolated in small React islands.

Why:
- Astro's islands architecture renders most of the page as static HTML and adds JavaScript only where needed, which is a strong fit for a high-performance marketing site. 
- Oultra's public website is mostly content, layout, transitions, and a few interactive demos, not a dashboard-heavy app.
- This gives better control over hydration, bundle size, and Core Web Vitals.

Use **React islands** only for:
- animated hero shell
- counters / score visualization
- interactive result preview
- mobile menu only if needed

Do **not** turn the whole site into a client-side React app.

If a later phase requires authenticated dashboards, user sessions, or deep app workflows, keep those in a separate app such as:
- `app.oultra.dev` or `aireadiness.oultra.dev`

---

## Architecture
Create a clean monorepo-ready structure even if you only implement the marketing site now.

```text
/apps
  /web              -> Astro marketing site
/packages
  /ui               -> shared presentational components, tokens, icons
  /content          -> structured copy, nav, product metadata
  /config           -> seo, site config, env schemas
```

Inside `apps/web`:

```text
src/
  assets/
  components/
    layout/
    sections/
    ui/
    motion/
  content/
    products/
    company/
  data/
  layouts/
  lib/
    analytics/
    seo/
    utils/
  pages/
    index.astro
    products/index.astro
    products/ai-readiness.astro
    company.astro
    contact.astro
    privacy.astro
    terms.astro
  styles/
    tokens.css
    base.css
    utilities.css
public/
```

---

## Technology stack
Use:
- **Astro**
- **TypeScript**
- **Tailwind CSS**
- **React** only for islands
- **Motion for React** for complex scroll-linked or staged animations
- **astro-icon** or inline SVG for icons
- **Zod** for schema validation if structured content is used

Avoid by default:
- GSAP
- full-page canvas backgrounds
- WebGL unless specifically justified
- animation libraries that force site-wide client hydration

Reasoning:
- Motion supports scroll-triggered and scroll-linked animation patterns with performant APIs such as `whileInView`, `useScroll`, and `useTransform`.
- Astro content collections are a good fit if blog/insights are added later.

---

## Product and information architecture
Navigation:
- Home
- Products
- Company
- Contact

Products dropdown now:
- AI Readiness Audit

Prepare structure for future products, but do not fake nonexistent features.
Use “Coming soon” cards only in a restrained way.

Pages required:
1. Home
2. Products index
3. AI Readiness Audit product page
4. Company
5. Contact
6. Privacy
7. Terms

Optional later:
- Insights / Blog
- Changelog
- Case studies

---

## Positioning
The company site should communicate:
- Oultra is a **software consultancy** — custom development, AI integration, technical consulting
- AI Readiness Audit is one product that Oultra has shipped — not the whole company
- The brand is technical, direct, credible, and product-aware

Suggested headline direction:
- **We build software that works.**
- **Software consultancy. We build, integrate, and ship.**

Do not write fluffy copy about “transforming the future.”
Prefer direct, specific language. The consultancy does real work, not vague “AI solutions.”

---

## Page structure

### Home
Sections in order:
1. Sticky header
2. Hero — consultancy positioning, audit shell as product demo (not main message)
3. Trust / credibility strip
4. What Oultra does (3 cards: Software Development, AI Integration, Our Products)
5. How we work (3-step process)
6. Featured product: AI Readiness Audit (one section, not dominant)
7. Example results / score breakdown
8. Why this matters now (consultancy angle)
9. Services + products rail
10. Final CTA (contact-focused)
11. Footer

### AI Readiness product page
Sections:
1. Product hero with URL input pattern
2. What the audit checks
3. Six categories
4. Example result state
5. Prioritized fixes explanation
6. FAQ
7. CTA

### Company page
Focus on:
- what Oultra does (consultancy + products)
- how we work (approach)
- services list with descriptions
- products we ship
- contact CTA

Do not invent a large team narrative if that content does not exist.

---

## Motion principles
The goal is **high perceived quality**, not maximum animation density.

Allowed motion patterns:
- fade + translate reveal
- staggered card entrance
- soft parallax on large background gradients
- number count-up
- progress bars
- spotlight / glow tracking only if subtle
- hero state transitions for scan flow
- section separators with slow ambient drift

Forbidden patterns:
- constant looping motion everywhere
- large layout shifts caused by animation
- autoplay effects that compete with readability
- heavy blur animations on mobile
- full-screen particle systems
- scroll-jacking

Rules:
- animate `transform` and `opacity` first
- avoid animating expensive properties when possible
- respect `prefers-reduced-motion`
- mobile gets reduced motion by default
- no section should depend on animation to be understandable

---

## Performance requirements
This project is explicitly optimized for web performance.

Targets:
- LCP under 2.5s on a modern mid-range mobile device
- CLS under 0.1
- INP under 200ms where feasible
- JS only where necessary

Implementation rules:
- default to Astro server/static output with minimal hydration
- use optimized images with explicit width/height
- no video in hero unless lazy and optional
- preload only truly critical assets
- self-host fonts or use one performant family only
- avoid more than one heavy variable font unless proven necessary
- use code splitting for every React island
- keep hero island lean
- avoid client-side state libraries unless needed
- no unnecessary analytics scripts

Budget guidance:
- avoid shipping large animation bundles site-wide
- keep each island focused and isolated
- prefer CSS for simple transitions
- use Motion only where CSS becomes awkward or brittle

---

## SEO and discoverability
Every page must include:
- unique title
- unique meta description
- canonical URL
- Open Graph metadata
- Twitter metadata
- structured internal linking

Add JSON-LD where appropriate:
- Organization
- WebSite
- SoftwareApplication for AI Readiness Audit if content is ready

The AI Readiness site already emphasizes discoverability, structured data, and machine-readable content. The corporate site must reflect the same philosophy in its own implementation.

---

## Accessibility
Non-negotiable:
- semantic headings
- visible focus states
- keyboard reachable navigation
- color contrast that passes WCAG AA
- reduced motion support
- all interactive demo states accessible without relying on hover

Do not hide essential content behind hover-only interactions.

---

## Content rules
Tone:
- technical
- concise
- confident
- product-led

Avoid:
- vague startup clichés
- inflated claims
- fake enterprise proof
- fake customer logos
- fake metrics

You may use placeholders for future proof, but label them internally and do not present them as real.

---

## Component guidelines
Build reusable components for:
- `SiteHeader`
- `SiteFooter`
- `SectionShell`
- `HeroAuditShell`
- `ProductCard`
- `FeatureGrid`
- `StepRail`
- `ScoreBreakdown`
- `MetricCounter`
- `CTASection`
- `GlowPanel`
- `Reveal`

Each component should:
- have a single responsibility
- receive typed props
- avoid hidden side effects
- avoid overconfiguration

---

## Styling guidelines
Use design tokens for:
- colors
- spacing
- radius
- shadows
- blur levels
- z-index
- motion durations
- easing curves

Do not scatter arbitrary values throughout the codebase.
If a value repeats twice, consider tokenizing it.

---

## Coding standards
- TypeScript strict mode
- no `any` unless strongly justified
- prefer server-rendered content
- keep React islands small and local
- avoid prop drilling by keeping components simple
- extract constants and content data out of JSX
- use meaningful names
- no dead code
- no placeholder lorem ipsum in final output

When implementing a section:
1. build semantic structure first
2. style second
3. animate last
4. measure performance before adding more motion

---

## Delivery expectations
Implement the site in phases.

### Phase 1
- architecture
- tokens
- layout shell
- home page structure
- AI Readiness page structure
- responsive navigation
- footer

### Phase 2
- hero animation
- section reveals
- score breakdown module
- credibility strip
- contact page polish

### Phase 3
- SEO refinement
- structured data
- accessibility pass
- performance tuning
- content polish

---

## Important product-specific constraint
The hero should not imitate a chatbot.
The primary demo surface must look like an **audit / analysis product**:
- URL input
- scanning state
- category scoring
- prioritized fixes
- structured output

That aligns with the actual AI Readiness product and improves message-product consistency.

---

## Final implementation bias
If forced to choose, prefer:
1. faster page
2. clearer messaging
3. cleaner code
4. stronger information hierarchy
5. more animation

Animation is a multiplier, not the product.
