# design.md

## Goal
Design a premium public website for **Oultra** that feels:
- advanced
- technical
- fast
- minimal
- product-first

The visual inspiration is the confidence and polish of Inception Labs, but the site must visually communicate a **software product company**, not an AI research lab.

---

## Brand expression
Oultra should feel like:
- a modern software consultancy that ships real products
- credible for technical buyers (CTOs, engineering leads, founders)
- visually sharp without being loud
- intentionally minimal, not empty

Keywords:
- precision
- clarity
- speed
- reliable
- technically honest
- structured output
- direct delivery

Avoid visual themes that feel like:
- crypto
- generic SaaS template
- AI art collage
- neon overload
- “agency gradient soup”

---

## Visual direction
Base aesthetic:
- dark theme first
- cool near-black surfaces
- restrained electric blue accents
- subtle cyan and indigo glow
- soft radial gradients
- deep contrast with generous negative space

This should feel closer to:
- high-end infra / devtool marketing
than to:
- playful startup illustration websites

---

## Color system
Use a restrained token system.

### Core surfaces
- `--bg-0`: main page background, almost black with a cool tint
- `--bg-1`: elevated surface
- `--bg-2`: card / panel surface
- `--bg-3`: interactive hover state

### Text
- `--text-1`: primary text
- `--text-2`: secondary text
- `--text-3`: muted text

### Brand / accent
- `--accent-1`: electric blue
- `--accent-2`: cyan highlight
- `--accent-3`: indigo depth tone

### Semantic
- `--success`
- `--warning`
- `--danger`
- `--info`

### Effects
- soft glow only on:
  - CTAs
  - hero highlights
  - score bars
  - focused input states

Do not use bright accent color on large text blocks.
Use accent mainly to guide attention.

---

## Typography
Use one primary sans family.
Optional second mono family only for tiny technical accents or metrics.

Typography should feel:
- modern
- dense enough to feel technical
- readable on mobile

Rules:
- large headlines with tight but not compressed tracking
- medium-length paragraphs
- avoid giant unreadable marketing headlines on small screens
- use clear hierarchy between headline, support copy, eyebrow, and caption

Recommended hierarchy:
- Hero H1: bold, compact, 2 lines max on desktop
- Section H2: strong and simple
- Card titles: crisp and short
- Body copy: neutral and readable
- Meta labels: small uppercase or semibold microcopy

---

## Layout system
The layout must feel disciplined.
Use a grid, not freeform composition.

Recommended rhythm:
- max width around 1200 to 1280px
- section vertical padding generous
- tighter spacing inside cards
- left alignment for most content
- centered content only in hero and final CTA where justified

Section pattern:
1. eyebrow
2. heading
3. support text
4. content block
5. optional CTA

Avoid sections that combine too many unrelated ideas.

---

## Hero design
The hero is the most important visual surface.

### What it must communicate immediately
- Oultra is a software company
- AI Readiness Audit is real and usable now
- the product analyzes websites for machine readability and discoverability

### Hero composition
Left side:
- eyebrow
- bold headline
- supporting copy
- primary CTA
- secondary CTA
- credibility hint

Right side:
- animated **audit shell**

### Audit shell design
This is not a chat box.
It should resemble a premium analysis interface with:
- URL field
- “scan in progress” state
- score reveal
- category bars
- prioritized issues list
- small status chips

Suggested motion sequence:
1. idle glow
2. URL inserted
3. scan progress passes through categories
4. score animates in
5. top issues appear with stagger
6. subtle loop back to idle

This loop must be slow, elegant, and non-distracting.

---

## Section design language

### Trust strip
If there are no real customer logos yet, do not fake them.
Use a restrained credibility row instead:
- “Instant audits”
- “30+ checks”
- “6 categories”
- “No signup”

### What Oultra does
Use three cards max.
These should be broad capability statements, not fake product suite cards.

### Featured product
Use one standout panel with:
- product title
- what it checks
- value proposition
- CTA
- mini preview

### How it works
Use a 3-step rail.
Should feel operational and easy.
Use minimal icons or numeric markers.

### Example results
This section is a visual anchor.
Display:
- total score
- category breakdown
- priority issues
- small explanatory notes

### Why this matters now
Use clean copy blocks, not a noisy infographic.
Optional background grid or soft gradient.

### Future products rail
Show muted placeholders only.
These cards should imply roadmap breadth without pretending those products exist today.

### Final CTA
Keep it simple and conversion-focused.
No large complexity here.

---

## Card style
Cards should feel premium and controlled.

Characteristics:
- medium-large radius
- thin borders with low contrast
- layered surface depth
- subtle inner highlight
- mild backdrop blur only where it helps
- hover lift very small

Avoid:
- thick borders
- loud shadows
- glassmorphism everywhere
- over-rounded bubbly UI

---

## Motion system
Motion quality is critical, but motion density must stay controlled.

### Motion principles
- smooth, not flashy
- directional, not random
- tied to hierarchy
- fast enough to feel responsive
- quiet enough to keep focus on content

### Approved motion patterns
- fade + y translate reveal
- staggered children reveal
- soft scale-in for metrics
- scroll-linked parallax on background layers
- progress bar growth
- subtle blur-to-sharp reveal on highlighted panels
- sticky section transitions only if lightweight

### Motion hierarchy
Level 1: ambient
- background drift
- glow breathing
- subtle gradient movement

Level 2: entry
- section reveal
- cards stagger
- CTA emphasis

Level 3: product storytelling
- audit shell state changes
- category scoring animation
- issue list reveal

Use Level 3 sparingly.

### Timing guidance
- micro interactions: fast
- section reveals: medium
- hero storytelling: slower and more cinematic

Avoid very long animations that block comprehension.

---

## Performance-aware motion rules
The site must remain fast.

Rules:
- prefer transform and opacity
- avoid animating layout dimensions unless necessary
- avoid expensive filter animation on mobile
- reduce blur intensity on smaller screens
- disable nonessential ambient motion under reduced-motion settings
- avoid simultaneous motion in multiple nearby regions

For simple reveal patterns, CSS can be enough.
Use Motion only where state choreography or scroll linkage materially improves the experience.

---

## Responsive design rules
Mobile is not a compressed desktop clone.

Requirements:
- stacked hero layout
- shorter headline line lengths
- simplified audit shell
- reduced glow and blur
- reduced or disabled parallax
- single-column cards where needed
- high tap target sizes

On mobile, clarity beats spectacle.

---

## Imagery and graphics
Preferred graphics:
- UI mock surfaces
- abstract gradient fields
- thin grid overlays
- score visualizations
- clean iconography

Avoid:
- stock photos
- fake 3D renders unless extremely restrained
- decorative illustrations unrelated to the product

If you need visual richness, use product UI and data visualization motifs.

---

## Microcopy style
Microcopy should feel:
- precise
- helpful
- technical
- non-corporate

Examples of good direction:
- Instant audit
- Machine-readable structure
- Priority fixes
- Answer-first content
- Structured signals

Avoid generic CTA labels like:
- Learn More
- Discover Now
- Unlock the Future

Prefer:
- Start audit
- View product
- Contact Oultra

---

## Component-specific design notes

### Header
- transparent to solid transition on scroll
- compact height
- CTA button visually stronger than nav

### Buttons
- clear primary and secondary variants
- primary should feel luminous but controlled
- hover state should tighten focus, not explode in glow

### Inputs
- dark surfaces
- visible focus ring
- technical precision
- no giant pill shapes unless justified by the hero composition

### Score bars
- horizontal bars with restrained glow edge
- readable labels
- simple percentage/value alignment

### Metric counters
- large but not cartoonish
- easy to parse in one glance

---

## Anti-patterns
Do not ship any of the following:
- random floating blobs everywhere
- multiple unrelated gradient colors fighting each other
- very large glowing borders on every component
- continuous motion on all cards
- fake benchmark claims
- text over visually noisy backgrounds
- low-contrast body text
- oversized marketing jargon headlines

---

## Final design bias
When choosing between options, prefer:
1. clarity
2. hierarchy
3. performance
4. polish
5. novelty

The site should feel memorable because it is sharp and well executed, not because it is trying too hard.
