# Role & Background
**Senior FANG Engineer Profile**: Senior Frontend Engineer with 8+ years experience at Google or Apple, specializing in landing page optimization, conversion-focused design, and responsive web interfaces. Experience with TypeScript, Next.js, and building high-performance marketing pages. Background in A/B testing, user experience design, and SEO optimization is highly valuable.

# Feature 1.0: Landing Page

## Description:
The Landing Page is the primary entry point and marketing interface for the Vibe DevSquad platform, designed to communicate the platform's value proposition, showcase key features, and drive user conversions. This feature implements a complete landing page solution including hero section, feature highlights, metrics visualization, onboarding process explanation, and call-to-action elements in a new Next.js project.

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template` for component patterns
5. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/` for styling consistency

## Implementation Tasks:

### Tier 1 Task - Landing Page Structure and Component Setup

#### Subtask 1.1: Set up landing page layout structure

- [x] Create project base structure
  - [x] Set up Next.js 14 project with TypeScript
  - [x] Install Magic UI dependencies from agent-template package.json
  - [x] Copy components.json from agent-template for Magic UI configuration
  - [x] Set up Tailwind CSS with Magic UI theme configuration

- [x] Create responsive layout container
  - [x] Use `/ui` command: "Create a responsive page layout container with max-width constraints for sm, md, lg, xl, and 2xl breakpoints"
  - [x] Reference: `agent-template/src/app/layout.tsx` for structure
  - [x] Implement padding: 16px (mobile), 32px (tablet), 64px (desktop)
  
- [x] Implement navigation bar component
  - [x] Use `/ui` command: "Create a fixed navigation bar with logo, menu items, and mobile hamburger menu using the design from agent-template"
  - [x] Reference: `/Magic Ui templates/landing-page-template/navbar-component.tsx` for styling
  - [x] Include Vibe DevSquad branding (indigo-600 for "Vibe", gray-700 for "DevSquad")
  - [x] Add navigation items: Features, How it Works, Resources, Pricing, Presentations
  - [x] Implement mobile drawer with Framer Motion animations

- [x] Create hero section with headline, subheadline, and CTA buttons
  - [x] Use `/ui` command: "Create a hero section with gradient headline, subheading, and dual CTA buttons"
  - [x] Reference: `/Magic Ui templates/hero-sections/hero-with-gradient.tsx`
  - [x] Include animated background elements from agent-template
  
- [x] Implement feature highlights section with cards
  - [x] Use `/ui` command: "Create a feature cards grid with icons, titles, and descriptions"
  - [x] Reference: `/Magic Ui templates/feature-sections/feature-grid.tsx`
  - [x] Add hover animations and stagger effects
  
- [x] Create metrics showcase section
  - [x] Use `/ui` command: "Create a metrics section with animated counters and statistics"
  - [x] Reference: `/Magic Ui templates/stats-sections/animated-stats.tsx`
  - [x] Implement counter animations with Framer Motion
  
- [x] Implement three-step process section
  - [x] Use `/ui` command: "Create a process section with numbered steps and descriptions"
  - [x] Reference: `/Magic Ui templates/process-sections/numbered-steps.tsx`
  - [x] Add connecting lines between steps
  
- [x] Create testimonials and social proof section
  - [x] Use `/ui` command: "Create a testimonial carousel component with customer quotes, avatars, and company logos"
  - [x] Reference: `/Magic Ui templates/testimonial-section.tsx` for layout patterns
  - [x] Implement auto-play carousel with pause on hover
  
- [x] Implement final CTA section and footer
  - [x] Use `/ui` command: "Create a footer component with CTA section, links grid, and copyright info"
  - [x] Reference: `agent-template/src/components/footer.tsx` for structure
  - [x] Include newsletter signup form with email validation

#### Subtask 1.2: Set up responsive design framework

- [x] Configure Tailwind CSS
  - [x] Copy tailwind.config.ts from agent-template
  - [x] Ensure Magic UI theme variables are properly configured
  - [x] Set up CSS variables for color system from design system document
  
- [x] Create responsive utilities
  - [x] Use `/ui` command: "Create responsive container components with proper max-width and padding for each breakpoint"
  - [x] Create useMediaQuery hook for responsive behavior
  - [x] Set up responsive font size utilities
  
- [x] Implement mobile navigation
  - [x] Use `/ui` command: "Create a mobile navigation drawer with slide-in animation and backdrop"
  - [x] Reference: `/Magic Ui templates/mobile-navigation.tsx`
  - [x] Add touch gestures for swipe-to-close
  
- [x] Set up responsive images
  - [x] Configure next/image with responsive sizes
  - [x] Create picture component for art-directed images
  - [x] Implement lazy loading with blur placeholders

📎 Reference responsive patterns from: `/Magic Ui templates/responsive-examples/`

#### Subtask 1.3: Set up animation and interaction framework

- [x] Install animation dependencies
  - [x] Install Framer Motion: `npm install framer-motion`
  - [x] Install animation utilities from agent-template
  - [x] Set up animation configuration file
  
- [x] Create animation utilities
  - [x] Copy animation utils from `agent-template/src/lib/animations.ts`
  - [x] Create stagger animations for list items
  - [x] Implement scroll-triggered animations with Intersection Observer
  - [x] Create page transition animations
  
- [x] Implement micro-interactions
  - [x] Use `/ui` command: "Create hover animations for buttons with scale and shadow effects"
  - [x] Add loading states with skeleton screens
  - [x] Create focus states with ring animations
  - [x] Implement error state animations

- [x] Set up gesture interactions
  - [x] Implement drag-to-dismiss for modals
  - [x] Add pinch-to-zoom for images
  - [x] Create swipe gestures for carousels

📎 Animation examples: `/Magic Ui templates/animation-showcase/`

#### Subtask 1.4: Set up landing page data and content management

- [x] Create content structure
  - [x] Define TypeScript interfaces for all content sections
  - [x] Create content JSON files for easy updates
  - [x] Set up content validation schemas
  
- [x] Implement content loading
  - [x] Create content loader utilities
  - [x] Set up static props for landing page
  - [x] Implement fallback content for loading states
  
- [x] Set up internationalization
  - [x] Install next-i18n
  - [x] Create language files structure
  - [x] Implement language switcher component
  
- [x] Create SEO components
  - [x] Use `/ui` command: "Create an SEO component with meta tags, Open Graph, and Twitter Card support"
  - [x] Reference: `agent-template/src/components/seo.tsx`
  - [x] Implement structured data for rich snippets
  
- [x] Set up analytics
  - [x] Implement Google Analytics 4
  - [x] Create event tracking utilities
  - [x] Set up conversion tracking

✅ **Checkpoint**: Ensure all Tier 1 subtasks are complete before proceeding to Tier 2

### Tier 2 Task - Landing Page Content and Interactive Elements

#### Subtask 2.1: Implement hero section with dynamic elements

- [x] Create hero headline component
  - [x] Use `/ui` command: "Create a hero headline with gradient text effect saying 'Build Smarter with AI-Powered Developer Teams'"
  - [x] Reference: `/Magic Ui templates/hero-sections/gradient-headline.tsx`
  - [x] Implement text animation on page load
  - [x] Add responsive font sizing (32px mobile, 48px desktop)
  
- [x] Implement subheadline
  - [x] Create paragraph with gray-600 text color
  - [x] Set max-width to 2xl (672px) with mx-auto
  - [x] Add fade-in animation with 200ms delay
  
- [x] Create CTA buttons
  - [x] Use `/ui` command: "Create primary and secondary CTA buttons with hover effects"
  - [x] Primary button: "Start Building for Free" (bg-indigo-600, hover:bg-indigo-700)
  - [x] Secondary button: "Watch 3-Min Demo" (border border-indigo-600, hover:bg-indigo-50)
  - [x] Reference: `/Magic Ui templates/buttons/cta-buttons.tsx`
  - [x] Add loading states and disabled states
  
- [x] Implement hero illustration
  - [x] Use `/ui` command: "Create an animated dashboard illustration component with real-time update effects"
  - [x] Reference: `/Magic Ui templates/illustrations/dashboard-preview.tsx`
  - [x] Add parallax scrolling effect
  - [x] Include mock data animations
  
- [x] Create metrics card
  - [x] Use `/ui` command: "Create a metrics card showing development fragmentation statistics"
  - [x] Display: 47% Time Lost, 68% Context Switching, 85% Communication Inefficiency
  - [x] Add counter animations with Framer Motion
  - [x] Reference: `/Magic Ui templates/cards/stats-card.tsx`

#### Subtask 2.2: Implement feature highlights section

- [x] Create "Problem vs Solution" comparison cards
  - [x] Use `/ui` command: "Create comparison cards with problem and solution sections"
  - [x] Reference: `/Magic Ui templates/comparison-cards.tsx`
  - [x] Implement hover effects and animations
  
- [x] Implement feature cards with icons and descriptions
  - [x] Use `/ui` command: "Create feature cards with icons, titles, and descriptions"
  - [x] Reference: `/Magic Ui templates/feature-cards.tsx`
  - [x] Add hover effects and animations
  
- [x] Create "Learn more" links with arrow icons for each feature
  - [x] Use `/ui` command: "Create links with arrow icons for each feature"
  - [x] Reference: `/Magic Ui templates/links/arrow-links.tsx`
  - [x] Implement hover effects and animations
  
- [x] Implement hover effects and animations for cards
  - [x] Use `/ui` command: "Create hover effects and animations for feature cards"
  - [x] Reference: `/Magic Ui templates/animations/card-hover-effects.tsx`
  - [x] Add stagger effects for card appearance
  
#### Subtask 2.3: Implement metrics and social proof section

- [x] Create "Real Impact, Measurable Results" heading with metrics
  - [x] Use `/ui` command: "Create a heading with metrics and a call-to-action"
  - [x] Reference: `/Magic Ui templates/headings/metrics-heading.tsx`
  - [x] Implement fade-in animation with 200ms delay
  
- [x] Implement animated counters for metrics
  - [x] Use `/ui` command: "Create animated counters for metrics"
  - [x] Reference: `/Magic Ui templates/counters/animated-counters.tsx`
  - [x] Implement counter animations with Framer Motion
  
- [x] Create "Trusted by teams at leading companies worldwide" section
  - [x] Use `/ui` command: "Create a section with company logos and testimonials"
  - [x] Reference: `/Magic Ui templates/testimonials/company-testimonials.tsx`
  - [x] Implement fade-in animation with 200ms delay
  
- [x] Implement metrics with icons
  - [x] Use `/ui` command: "Create metrics with icons and descriptions"
  - [x] Reference: `/Magic Ui templates/metrics/metrics-with-icons.tsx`
  - [x] Implement hover effects and animations
  
- [x] Create testimonial carousel with customer quotes
  - [x] Use `/ui` command: "Create a testimonial carousel with customer quotes and avatars"
  - [x] Reference: `/Magic Ui templates/testimonials/testimonial-carousel.tsx`
  - [x] Implement auto-play carousel with pause on hover

#### Subtask 2.4: Implement three-step process section

- [x] Create "Get Started in Three Simple Steps" heading with subtext
  - [x] Use `/ui` command: "Create a heading with subtext and a call-to-action"
  - [x] Reference: `/Magic Ui templates/headings/process-heading.tsx`
  - [x] Implement fade-in animation with 200ms delay
  
- [x] Implement step cards with numbered circles (1, 2, 3)
  - [x] Use `/ui` command: "Create step cards with numbered circles and descriptions"
  - [x] Reference: `/Magic Ui templates/step-cards.tsx`
  - [x] Implement hover effects and animations
  
- [x] Create "Ready to transform your development process?" CTA
  - [x] Use `/ui` command: "Create a call-to-action with a button and a link"
  - [x] Reference: `/Magic Ui templates/ctas/cta-button.tsx`
  - [x] Implement hover effects and animations
  
- [x] Implement "Average setup time: 5 minutes" indicator
  - [x] Use `/ui` command: "Create an indicator with a timer and a description"
  - [x] Reference: `/Magic Ui templates/indicators/timer-indicator.tsx`
  - [x] Implement fade-in animation with 200ms delay

✅ **Checkpoint**: Ensure all Tier 2 subtasks are complete before proceeding to Tier 3

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance visual design and typography

- [x] Implement color system with primary palette
  - [x] Use `/ui` command: "Create a color system with primary palette"
  - [x] Reference: `/Magic Ui templates/color-system.tsx`
  - [x] Implement color variables for consistent styling
  
- [x] Create typography system with font hierarchy
  - [x] Use `/ui` command: "Create a typography system with font hierarchy"
  - [x] Reference: `/Magic Ui templates/typography-system.tsx`
  - [x] Implement font variables for consistent styling
  
- [x] Implement consistent spacing system
  - [x] Use `/ui` command: "Create a spacing system with consistent padding and margin values"
  - [x] Reference: `/Magic Ui templates/spacing-system.tsx`
  - [x] Implement spacing variables for consistent styling
  
- [x] Create subtle background patterns and gradients
  - [x] Use `/ui` command: "Create subtle background patterns and gradients"
  - [x] Reference: `/Magic Ui templates/background-patterns.tsx`
  - [x] Implement background patterns and gradients for visual interest
  
- [x] Implement consistent shadows and elevation system
  - [x] Use `/ui` command: "Create a shadows and elevation system with consistent values"
  - [x] Reference: `/Magic Ui templates/shadows-and-elevation.tsx`
  - [x] Implement shadow and elevation variables for consistent styling

📎 QA through Operative.sh MCP, visually confirm design system implementation

#### Subtask 3.2: Implement responsive design optimizations

- [x] Test and optimize mobile layout (320px - 767px)
  - [x] Use `/ui` command: "Test and optimize mobile layout"
  - [x] Reference: `/Magic Ui templates/responsive-examples/mobile-layout.tsx`
  - [x] Implement mobile-specific styling and layout adjustments
  
- [x] Create tablet layout (768px - 1023px)
  - [x] Use `/ui` command: "Create tablet layout"
  - [x] Reference: `/Magic Ui templates/responsive-examples/tablet-layout.tsx`
  - [x] Implement tablet-specific styling and layout adjustments
  
- [x] Optimize desktop layout (1024px+)
  - [x] Use `/ui` command: "Optimize desktop layout"
  - [x] Reference: `/Magic Ui templates/responsive-examples/desktop-layout.tsx`
  - [x] Implement desktop-specific styling and layout adjustments
  
- [x] Implement responsive images with appropriate sizes for each breakpoint
  - [x] Use `/ui` command: "Implement responsive images"
  - [x] Reference: `/Magic Ui templates/responsive-images.tsx`
  - [x] Implement image optimization with next/image

📎 QA through Operative.sh MCP, test all breakpoints

#### Subtask 3.3: Implement performance optimizations

- [x] Implement image optimization with next/image
  - [x] Use `/ui` command: "Implement image optimization"
  - [x] Reference: `/Magic Ui templates/image-optimization.tsx`
  - [x] Implement image optimization with next/image
  
- [x] Add lazy loading for below-the-fold content
  - [x] Use `/ui` command: "Add lazy loading"
  - [x] Reference: `/Magic Ui templates/lazy-loading.tsx`
  - [x] Implement lazy loading with Intersection Observer
  
- [x] Implement code splitting for landing page sections
  - [x] Use `/ui` command: "Implement code splitting"
  - [x] Reference: `/Magic Ui templates/code-splitting.tsx`
  - [x] Implement code splitting with Next.js
  
- [x] Create loading state skeletons for dynamic content
  - [x] Use `/ui` command: "Create loading state skeletons"
  - [x] Reference: `/Magic Ui templates/loading-states.tsx`
  - [x] Implement loading state skeletons for dynamic content
  
- [x] Optimize font loading with font-display: swap
  - [x] Use `/ui` command: "Optimize font loading"
  - [x] Reference: `/Magic Ui templates/font-loading.tsx`
  - [x] Implement font loading optimization with font-display: swap
  
- [x] Implement resource hints (preconnect, preload) for critical assets
  - [x] Use `/ui` command: "Implement resource hints"
  - [x] Reference: `/Magic Ui templates/resource-hints.tsx`
  - [x] Implement resource hints for critical assets

📎 QA through Operative.sh MCP, verify performance metrics

#### Subtask 3.4: Implement accessibility and SEO improvements

- [x] Add proper semantic HTML structure (header, main, section, footer)
  - [x] Use `/ui` command: "Add semantic HTML structure"
  - [x] Reference: `/Magic Ui templates/semantic-html.tsx`
  - [x] Implement semantic HTML structure for accessibility
  
- [x] Implement ARIA labels for all interactive elements
  - [x] Use `/ui` command: "Implement ARIA labels"
  - [x] Reference: `/Magic Ui templates/aria-labels.tsx`
  - [x] Implement ARIA labels for interactive elements
  
- [x] Create keyboard navigation support for all interactive elements
  - [x] Use `/ui` command: "Create keyboard navigation support"
  - [x] Reference: `/Magic Ui templates/keyboard-navigation.tsx`
  - [x] Implement keyboard navigation support for interactive elements
  
- [x] Implement focus states that meet WCAG 2.1 AA requirements
  - [x] Use `/ui` command: "Implement focus states"
  - [x] Reference: `/Magic Ui templates/focus-states.tsx`
  - [x] Implement focus states that meet WCAG 2.1 AA requirements
  
- [x] Add alt text for all images
  - [x] Use `/ui` command: "Add alt text"
  - [x] Reference: `/Magic Ui templates/alt-text.tsx`
  - [x] Implement alt text for all images
  
- [x] Create meta tags for SEO
  - [x] Use `/ui` command: "Create meta tags"
  - [x] Reference: `/Magic Ui templates/meta-tags.tsx`
  - [x] Implement meta tags for SEO
  
- [x] Implement structured data for rich snippets
  - [x] Use `/ui` command: "Implement structured data"
  - [x] Reference: `/Magic Ui templates/structured-data.tsx`
  - [x] Implement structured data for rich snippets

📎 QA through Operative.sh MCP, run accessibility audit

✅ **Checkpoint**: Ensure all Tier 3 subtasks are complete before proceeding to final review
