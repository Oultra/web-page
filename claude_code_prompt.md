

You are building the public marketing website for **Oultra**, a software company focused on practical AI products.

The first real product is **AI Readiness Audit**.

## Goal
Build a premium, fast, product-first website that feels technically credible and visually polished, inspired by the motion quality and confidence of https://www.inceptionlabs.ai/ but **not cloned**. Use https://aireadiness.oultra.dev/ as the product/content reference.

The site must communicate:
1. Oultra builds practical AI software.
2. AI Readiness Audit is a real product available now.
3. More products may come later, so the information architecture must scale.

## Core stack decision
Use **Astro + TypeScript + Tailwind CSS**.
Use **React islands only where interactivity is necessary**.
Use **Motion for React** for the complex animated parts.

Do **not** build the whole site as a client-side React app.
Do **not** use GSAP unless absolutely necessary.
Do **not** use heavy canvas/WebGL backgrounds.
Prioritize Core Web Vitals, minimal hydration, and clean maintainable code.

## Architecture
Use a monorepo-ready structure even if only the marketing site is implemented now:

```txt
/apps
  /web
/packages
  /ui
  /content
  /config
```

Inside `apps/web` use something like:

```txt
src/
  assets/
  components/
    layout/
    sections/
    ui/
    motion/
  content/
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

## Product and navigation
Navigation must be:
- Home
- Products
- Company
- Contact

Products dropdown should currently contain:
- AI Readiness Audit

Prepare the structure for future products, but do not invent fake features or fake product detail.

## Positioning and copy direction
Avoid generic AI fluff.
Avoid “transforming the future” language.
Prefer direct, product-led copy.

Suggested direction:
- “Software for the AI era.”
- “Measure how visible, structured and machine-readable your website really is.”

The tone should feel:
- technical
- precise
- modern
- credible
- minimal

## Visual design system
Dark theme first.
Use cool near-black surfaces, restrained electric blue accents, cyan/indigo highlights, soft radial gradients, and generous negative space.

The visual style should feel closer to a premium devtool / infra / software product company than to a research lab or generic SaaS template.

Avoid:
- crypto aesthetics
- neon overload
- generic startup illustrations
- gradient soup
- AI-art collage visuals

### Design rules
- One primary sans font.
- Optional mono only for small technical labels / metrics.
- Tight but readable headline rhythm.
- Max width around 1200–1280px.
- Disciplined grid layout.
- Cards should feel like premium software panels, not template boxes.

## Motion direction
Motion quality is critical, but motion density must stay controlled.

Use:
- fade + translate reveal
- staggered card entrance
- subtle parallax on gradients
- count-up metrics
- progress bars
- slow ambient drift
- hero state transitions

Avoid:
- constant looping movement everywhere
- large layout shifts
- scroll-jacking
- distracting autoplay behavior
- heavy blur animation on mobile
- particle systems

Rules:
- animate transform and opacity first
- respect `prefers-reduced-motion`
- reduce motion on mobile
- no section should depend on motion to be understandable

## Hero requirement
The hero is the key visual surface.
It must immediately communicate that Oultra is a software company and AI Readiness Audit is a real usable product.

### Hero layout
Left side:
- eyebrow
- strong headline
- support copy
- primary CTA
- secondary CTA
- small credibility line

Right side:
- animated **audit shell**

### Important
This should **not** look like a chatbot.
It should look like a premium audit / analysis interface.

The hero audit shell should include:
- URL field
- scan in progress state
- score reveal
- category bars
- prioritized issues list
- small status chips

Suggested animation sequence:
1. idle ambient glow
2. URL inserted
3. scan progress moves across categories
4. score animates in
5. top issues appear with stagger
6. soft reset back to idle

Keep this elegant and non-distracting.

## Required pages
Implement:
1. Home
2. Products index
3. AI Readiness Audit product page
4. Company
5. Contact
6. Privacy
7. Terms

## Home page sections
Build the Home page in this order:
1. Sticky header
2. Hero with animated audit shell
3. Trust / credibility strip
4. What Oultra does
5. Featured product: AI Readiness Audit
6. How it works
7. Example results / score breakdown
8. Why this matters now
9. Future products rail
10. Final CTA
11. Footer

### Content notes
If there are no real customer logos, do not fake them.
Use a credibility strip instead, such as:
- Instant audits
- 30+ checks
- 6 categories
- No signup

“What Oultra does” should be three cards max.
Example themes:
- AI Visibility
- Website Intelligence
- Practical Audit Workflows

“How it works” should be a clean 3-step rail:
1. Paste a URL
2. Run the audit
3. Get prioritized fixes

“Example results” should show:
- total score
- category breakdown
- prioritized issues
- small explanatory notes

“Future products” may include restrained “Coming soon” placeholders, but do not oversell nonexistent products.

## AI Readiness product page
Sections:
1. Product hero with URL input pattern
2. What the audit checks
3. Six categories
4. Example result state
5. Prioritized fixes explanation
6. FAQ
7. CTA

## Company page
Keep it concise.
Focus on:
- mission
- approach
- why Oultra exists
- contact CTA

Do not invent a large team story.

## Contact page
Keep it simple and credible.
Include:
- headline
- short supporting text
- email/contact CTA
- optional lightweight form UI if easy to maintain

## Implementation requirements
- Use semantic HTML.
- Use accessible focus states.
- Use reduced-motion handling.
- Use reusable section and surface primitives.
- Keep content data-driven where possible.
- Keep copy easy to replace from central content files.
- Add SEO basics: title, description, OG, canonical handling.
- Add a clean mobile nav.
- Use responsive images and avoid unnecessary JS.

## Performance requirements
Treat performance as a product requirement.

Targets:
- minimal client-side JS
- no unnecessary hydration
- strong Lighthouse performance practices
- lazy-load anything non-critical
- avoid large font/image payloads
- keep animations GPU-friendly where possible

## Deliverables
Provide all code needed to run the site.
Also provide:
1. final folder structure
2. reusable component list
3. notes on where React islands are used and why
4. notes on performance decisions
5. notes on how future products can be added cleanly

## Execution style
Make strong implementation decisions.
Do not ask unnecessary questions.
If something is missing, choose the most production-sensible option and continue.
Do not generate placeholder bloat.
Do not overengineer.

## What to build now
Build the full first version of the marketing site with production-minded code quality.
Use realistic placeholder copy only where content is truly missing.
Keep the result visually impressive, but technically disciplined.
