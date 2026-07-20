# AGENTS.md

# SYNC Website Development Rules

This repository is used to build premium digital experiences and interactive websites.

The objective is not to generate generic SaaS websites, AI startup templates, dashboard landing pages, shadcn showcases, or marketing boilerplates.

Every page should feel handcrafted, intentional, immersive, and memorable.

The final experience should feel closer to an award-winning digital product than a traditional corporate website.

---

# Required Skills

Whenever generating designs, layouts, interactions, animations, components, or pages, agents must actively use all available relevant skills.

## UI / UX

Required Skill:

- ui-ux-pro-max

Purpose:

- Visual hierarchy
- Layout composition
- Storytelling through design
- Premium design systems
- Typography systems
- Enterprise-grade polish
- User experience optimization

Never generate generic layouts.

Every section should feel custom-designed.

---

## GSAP

Required Skills:

- gsap-core
- gsap-react
- gsap-scrolltrigger
- gsap-timeline
- gsap-performance
- gsap-plugins
- gsap-frameworks
- gsap-utils

Purpose:

- Narrative scroll experiences
- Timeline orchestration
- Layered motion systems
- Performance optimization
- Scroll storytelling

GSAP should drive major animation systems.

---

## Framer Motion

Required Skills:

- framer-motion
- motion-react
- motion-framer

Purpose:

- Micro interactions
- Physics-based motion
- Hover interactions
- Continuous ambient motion
- Presence transitions

Framer Motion should enhance components and interactions.

GSAP controls storytelling.

Framer Motion controls interaction.

---

# Design Philosophy

Every page should feel:

- Premium
- Intentional
- Editorial
- Interactive
- Modern
- Cinematic
- Immersive

Avoid:

- Generic SaaS design
- Dashboard-style layouts
- Feature card overload
- Cookie-cutter landing pages
- Repetitive alternating sections
- Generic startup aesthetics
- Template-driven composition

Prefer:

- Storytelling
- Layered experiences
- Editorial layouts
- Custom section architecture
- Immersive interactions
- Spatial composition
- Strong visual rhythm

---

# Narrative Experience

Pages should feel like experiences rather than collections of sections.

Content should unfold progressively.

Information should be revealed in stages.

Users should naturally discover information while scrolling.

Every section should connect visually and emotionally to the next.

Avoid dumping information all at once.

Create curiosity and progression.

---

# Motion Philosophy

Motion must communicate meaning.

Animation should never exist purely for decoration.

Motion should improve:

- Storytelling
- Focus
- Hierarchy
- Transitions
- User engagement
- Visual flow

Every section should contain meaningful motion.

Do not rely only on fade-in animations.

---

# Headline Animations

Preferred patterns:

- Character reveal
- Word reveal
- Mask reveal
- Stagger reveal
- Scroll reveal
- Highlight transitions
- Scrub animations
- Perspective reveals
- Split text animations

Headlines should feel intentional and cinematic.

---

# Description Animations

Preferred patterns:

- Word-by-word reveal
- Progressive opacity
- Reading-focused timing
- Scroll-activated reveals
- Dynamic emphasis
- Sequential content reveals

Large text blocks should never appear instantly.

Reading should feel guided.

---

# Visual Animations

Preferred patterns:

- Layered parallax
- Scroll-linked movement
- Perspective shifts
- Rotation systems
- Depth transitions
- Physics interactions
- Momentum-based movement
- Floating systems
- Magnetic interactions
- Reactive visuals

Visuals should feel alive.

Static visuals should be avoided whenever possible.

---

# Scroll Experiences

Use GSAP ScrollTrigger extensively where appropriate.

Preferred patterns:

- Scrubbing
- Pinning
- Layer reveals
- Timeline orchestration
- Progressive storytelling
- Section transitions
- Depth-based movement
- Visual sequencing

Avoid basic fade-in-only experiences.

---

# Visual Architecture

Every visual should be constructed using independent layers.

Example:

HeroVisual
├── background
├── gradients
├── particles
├── grid
├── foreground
├── highlights
├── shadows
├── overlays
└── interaction layer

Do not flatten visuals into a single image whenever animation is expected.

Layer separation is required.

---

# 3D Direction

Target stack:

- Three.js
- React Three Fiber
- GSAP
- Framer Motion

3D should support storytelling.

Never use 3D purely for decoration.

Every 3D element must communicate meaning.

3D should feel integrated into the narrative.

---

# Interaction Design

Use advanced interactions where appropriate.

Examples:

- Magnetic buttons
- Cursor interactions
- Hover transformations
- Physics reactions
- Layer depth interactions
- Motion-driven focus
- Interactive storytelling

Interactions should feel premium and responsive.

---

# Reference-Driven Development

When a design reference is provided:

1. Treat the reference as the source of truth.
2. Match composition accurately.
3. Match hierarchy accurately.
4. Match spacing relationships.
5. Match visual rhythm.
6. Match typography hierarchy.
7. Match overall mood and intent.

Do not redesign the reference.

Do not reinterpret the reference.

Replicate first.

Enhance through motion second.

Optimize third.

Visual fidelity is the highest priority.

---

# Anti-Template Rules

Never generate:

- Generic SaaS hero sections
- Dashboard mockup heroes
- Generic feature grids
- Repetitive alternating layouts
- Startup boilerplate sections
- AI website clichés
- Stock template compositions

If the design resembles a common SaaS template, reconsider the solution.

---

# Accessibility

Required:

- Semantic HTML
- Proper heading hierarchy
- Keyboard navigation support
- Reduced motion support
- Accessible interactions
- WCAG-conscious color usage

Animations must gracefully degrade.

---

# Performance

Target:

- 60 FPS
- Smooth scrolling
- Minimal layout shift
- GPU-accelerated animations
- Efficient asset loading

Prefer:

- transform
- opacity
- will-change when appropriate

Avoid:

- Layout thrashing
- Heavy paint operations
- Excessive blur usage
- Unnecessary DOM complexity

---

# Code Standards

Always generate:

- TypeScript
- Next.js App Router
- Tailwind CSS v4
- Reusable components
- Modular architecture
- Production-ready code

Avoid:

- Monolithic components
- Inline animation spaghetti
- Hardcoded magic values
- Unstructured files

---

# Recommended Project Structure

src/
├── app/
├── components/
│   ├── sections/
│   ├── visuals/
│   ├── animations/
│   ├── shared/
│   └── ui/
│
├── hooks/
├── lib/
├── constants/
├── data/
├── styles/
└── assets/

---

# Animation Ownership

GSAP should be responsible for:

- Scroll storytelling
- Timelines
- Section transitions
- Narrative progression
- Large-scale motion systems

Framer Motion should be responsible for:

- Hover interactions
- Micro interactions
- Presence animations
- Physics-based effects
- Interactive states

Use both together where beneficial.

---

# Success Criteria

A successful implementation should:

- Feel handcrafted
- Feel premium
- Feel immersive
- Feel cinematic
- Feel interactive
- Feel performant
- Feel modern
- Feel memorable

The website should feel like a living experience rather than a collection of static sections.

If the result looks like a generic SaaS template, generic AI landing page, or common marketing website, the implementation has failed.