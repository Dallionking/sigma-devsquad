# Vibe DevSquad Design System

**Version**: 3.0
**Status**: Canonical  
**Last Updated**: 2025-06-05

## Overview
This document defines the comprehensive design system for the Vibe DevSquad platform, featuring modern glassmorphism aesthetics, interactive micro-animations, and full light/dark mode support. The design system ensures consistency across all UI components while providing an engaging, adaptive user experience that works flawlessly in both light and dark themes.

## Design Principles

1. **Adaptive Theming**: Seamless light/dark mode with automatic theme detection and manual toggle
2. **Luminous Aesthetics**: Modern glassmorphism with ambient glows and depth shadows adapted for both themes
3. **Interactive Elegance**: Subtle micro-animations that enhance user engagement across all themes
4. **Semantic Color System**: Theme-aware color tokens that maintain proper contrast and accessibility
5. **Performance**: Hardware-accelerated animations with reduced motion support
6. **Accessibility**: WCAG 2.1 AA compliance with enhanced contrast ratios in both modes

## UI Component Framework

**Primary**: Magic UI (magicui.design/docs and pro.magicui.design/docs)
**Animation**: Framer Motion for smooth, performant animations
**Templates**: Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/` for purchased components
**Implementation**: Use Magic UI MCP for component generation
**Theming**: Tailwind CSS dark mode with CSS custom properties

## Vibe DevSquad Color System

### Semantic Color Tokens (Theme-Aware)

#### Core Background Colors
```css
/* Light Mode Backgrounds */
--background: 0 0% 100%          /* Pure white */
--foreground: 222.2 84% 4.9%     /* Near black text */
--card: 0 0% 100%                /* Card backgrounds */
--card-foreground: 222.2 84% 4.9% /* Card text */
--popover: 0 0% 100%             /* Popup backgrounds */
--popover-foreground: 222.2 84% 4.9% /* Popup text */

/* Dark Mode Backgrounds */
--background: 222.2 84% 4.9%     /* Slate-950 equivalent */
--foreground: 210 40% 98%        /* Near white text */
--card: 222.2 84% 4.9%           /* Card backgrounds */
--card-foreground: 210 40% 98%   /* Card text */
--popover: 222.2 84% 4.9%        /* Popup backgrounds */
--popover-foreground: 210 40% 98% /* Popup text */
```

#### Interactive Colors
```css
/* Universal (same in both modes) */
--primary: 221.2 83.2% 53.3%     /* Blue-600 */
--primary-foreground: 210 40% 98% /* White text on primary */
--secondary: 210 40% 96%         /* Light secondary */
--secondary-foreground: 222.2 84% 4.9% /* Dark text on secondary */
--muted: 210 40% 96%             /* Muted backgrounds */
--muted-foreground: 215.4 16.3% 46.9% /* Muted text */
--accent: 210 40% 96%            /* Accent backgrounds */
--accent-foreground: 222.2 84% 4.9% /* Accent text */
```

#### State Colors
```css
--destructive: 0 84.2% 60.2%     /* Red-500 for errors */
--destructive-foreground: 210 40% 98% /* White text on red */
--border: 214.3 31.8% 91.4%     /* Light borders / Dark: 217.2 32.6% 17.5% */
--input: 214.3 31.8% 91.4%      /* Input borders */
--ring: 221.2 83.2% 53.3%       /* Focus rings */
```

### Vibe DevSquad Brand Colors

#### Primary Gradient Palette
```css
/* Purple-Blue Gradient (Logo/Brand) */
--vibe-purple-from: 258.3 89.5% 66.3%  /* Purple-500 */
--vibe-purple-to: 217.2 91.2% 59.8%    /* Blue-500 */

/* AI Bot Colors (From Logo) */
--vibe-bot-1: 192.9 95% 68%      /* Cyan-400 (top-left) */
--vibe-bot-2: 217.2 91.2% 59.8%  /* Blue-500 (top-right) */
--vibe-bot-3: 142.1 76.2% 36.3%  /* Green-600 (bottom-left) */
--vibe-bot-4: 316.7 85.1% 47.1%  /* Pink-600 (bottom-right) */
```

#### Extended Color Scheme
```css
/* Success/Growth Colors */
--vibe-success: 142.1 76.2% 36.3%    /* Green-600 */
--vibe-success-light: 142.1 70.6% 45.3% /* Green-500 */

/* Warning/Attention Colors */
--vibe-warning: 32.1 94.6% 43.7%     /* Orange-600 */
--vibe-warning-light: 24.6 95% 53.1%  /* Orange-500 */

/* Error/Critical Colors */
--vibe-error: 346.8 77.2% 49.8%      /* Red-600 */
--vibe-error-light: 0 84.2% 60.2%     /* Red-500 */
```

### Theme Implementation Classes

#### Background Classes
```css
/* Adaptive backgrounds */
.bg-adaptive-primary    { @apply bg-background; }
.bg-adaptive-secondary  { @apply bg-muted; }
.bg-adaptive-card       { @apply bg-card; }
.bg-adaptive-elevated   { @apply bg-slate-100 dark:bg-slate-800; }

/* Section backgrounds with gradients */
.bg-hero-gradient {
  @apply bg-gradient-to-br from-slate-100 via-background to-slate-100 
         dark:from-slate-900 dark:via-slate-950 dark:to-slate-900;
}

.bg-features-gradient {
  @apply bg-gradient-to-br from-blue-50 via-background to-purple-50 
         dark:from-blue-950/20 dark:via-slate-950 dark:to-purple-950/20;
}

.bg-benefits-gradient {
  @apply bg-gradient-to-br from-purple-50 via-background to-blue-50 
         dark:from-purple-950/20 dark:via-slate-950 dark:to-blue-950/20;
}
```

#### Text Color Classes
```css
/* Semantic text colors */
.text-adaptive-primary     { @apply text-foreground; }
.text-adaptive-secondary   { @apply text-muted-foreground; }
.text-adaptive-muted       { @apply text-muted-foreground dark:text-gray-400; }
.text-adaptive-contrast    { @apply text-foreground dark:text-white; }

/* Enhanced contrast for dark mode */
.text-enhanced-contrast {
  @apply text-gray-900 dark:text-white;
}

.text-enhanced-secondary {
  @apply text-gray-600 dark:text-gray-300;
}
```

### Glassmorphism System (Theme-Aware)

#### Light Mode Glass
```css
.glass-light {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

#### Dark Mode Glass
```css
.glass-dark {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

#### Adaptive Glass Component
```css
.glass-card {
  @apply backdrop-blur-md border;
  @apply bg-white/80 border-white/20 shadow-lg
         dark:bg-gray-900/30 dark:border-gray-800/50 dark:shadow-xl;
}

.glass-elevated {
  @apply backdrop-blur-md border;
  @apply bg-white/90 border-gray-200/50 shadow-xl
         dark:bg-gray-800/40 dark:border-gray-700/50 dark:shadow-2xl;
}
```

## Component Specifications (Theme-Aware)

### Enhanced Buttons

#### Primary Button (Adaptive)
```css
.btn-primary {
  @apply px-6 py-3 rounded-xl font-semibold text-base;
  @apply glass-card hover-lift shimmer glow-effect interactive-btn;
  @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white;
  @apply hover:from-blue-500 hover:to-purple-500;
  @apply shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40;
  @apply border border-blue-500/30 hover:border-blue-400/50;
  @apply depth-shadow-lg hover:depth-shadow-xl floating;
  @apply dark-glow-blue contrast-text;
  @apply min-w-[200px] flex items-center justify-center;
}
```

#### Secondary Button (Adaptive)
```css
.btn-secondary {
  @apply px-6 py-3 rounded-xl font-semibold text-base;
  @apply glass-card hover-lift shimmer glow-effect interactive-btn;
  @apply border transition-all duration-300;
  @apply min-w-[200px] flex items-center justify-center;
  
  /* Light mode styles */
  @apply bg-white/80 text-gray-700 border-gray-300;
  @apply hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400;
  @apply shadow-md hover:shadow-lg;
  
  /* Dark mode styles */
  @apply dark:bg-gray-800/50 dark:text-white dark:border-gray-700/50;
  @apply dark:hover:bg-gray-700/50 dark:hover:border-gray-600/50;
  @apply dark:shadow-lg dark:hover:shadow-xl dark:shadow-gray-500/10;
  @apply dark:backdrop-blur-md dark:depth-shadow-lg dark:hover:depth-shadow-xl;
}
```

#### Outline Button (Adaptive)
```css
.btn-outline {
  @apply px-6 py-3 rounded-xl font-semibold text-base;
  @apply border-2 transition-all duration-300 hover-lift;
  @apply min-w-[200px] flex items-center justify-center;
  
  /* Light mode */
  @apply bg-transparent border-gray-300 text-gray-700;
  @apply hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900;
  
  /* Dark mode */
  @apply dark:border-gray-600 dark:text-gray-300;
  @apply dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-gray-500;
}
```

### Enhanced Cards (Theme-Aware)

#### Feature Card (Adaptive)
```css
.feature-card {
  @apply h-full p-6 transition-all duration-300 text-center;
  @apply glass-card shimmer glow-effect;
  @apply depth-shadow-lg hover:depth-shadow-xl;
  @apply hover:scale-105 hover:-translate-y-2;
  @apply shadow-lg hover:shadow-xl interactive-btn;
  @apply border rounded-xl;
  
  /* Light mode */
  @apply bg-white/90 border-gray-200/50;
  @apply hover:bg-white hover:border-gray-300/70;
  
  /* Dark mode */
  @apply dark:bg-gray-900/40 dark:backdrop-blur-md;
  @apply dark:border-gray-800/50 dark:hover:border-gray-700/70;
}
```

#### Testimonial Card (Adaptive)
```css
.testimonial-card {
  @apply p-6 rounded-xl transition-all duration-300;
  @apply glass-card shimmer glow-effect floating;
  @apply backdrop-blur-md border;
  @apply depth-shadow-lg hover:depth-shadow-xl;
  @apply hover:-translate-y-1 hover:scale-[1.02];
  
  /* Light mode */
  @apply bg-white/90 border-gray-200/50;
  @apply hover:bg-white hover:border-gray-300/50;
  
  /* Dark mode */
  @apply dark:bg-gray-800/30 dark:border-gray-700/50;
  @apply dark:hover:bg-gray-800/40 dark:hover:border-gray-600/50;
}
```

#### Metric Card (Adaptive)
```css
.metric-card {
  @apply p-8 rounded-2xl transition-all duration-300;
  @apply glass-card hover-lift shimmer glow-effect;
  @apply border backdrop-blur-md;
  @apply depth-shadow-lg hover:depth-shadow-xl;
  
  /* Light mode */
  @apply bg-white/80 border-gray-200/50;
  @apply hover:bg-white/90 hover:border-gray-300/70;
  @apply shadow-lg hover:shadow-xl;
  
  /* Dark mode */
  @apply dark:bg-gray-900/30 dark:border-gray-800/50;
  @apply dark:hover:bg-gray-900/40 dark:hover:border-gray-700/70;
  @apply dark:shadow-xl dark:hover:shadow-2xl;
}
```

### Navigation Enhancements (Theme-Aware)

#### Interactive Links (Adaptive)
```css
.nav-link {
  @apply transition-all duration-300 letter-spacing-hover;
  @apply hover:shimmer;
  
  /* Light mode */
  @apply text-gray-700 hover:text-blue-600;
  
  /* Dark mode */
  @apply dark:text-gray-300 dark:hover:text-purple-300 dark:contrast-text;
}
```

#### Navigation Arrows (Adaptive)
```css
.nav-arrow {
  @apply p-2 rounded-full transition-all duration-300;
  @apply glass-card hover-lift shimmer glow-effect;
  @apply border backdrop-blur-md;
  @apply depth-shadow-md hover:depth-shadow-lg;
  
  /* Light mode */
  @apply bg-white/80 border-gray-200/50;
  @apply text-gray-600 hover:text-gray-900;
  @apply hover:bg-white hover:border-gray-300/50;
  
  /* Dark mode */
  @apply dark:bg-gray-800/50 dark:border-gray-700/50;
  @apply dark:text-gray-300 dark:hover:text-white;
  @apply dark:hover:bg-gray-700/50 dark:hover:border-gray-600/50;
}
```

## Dark Mode Implementation (Updated)

### Theme-Aware Utilities
```css
/* Adaptive background utilities */
.bg-adaptive-primary {
  @apply bg-background;
}

.bg-adaptive-secondary {
  @apply bg-slate-50 dark:bg-slate-900;
}

.bg-adaptive-card {
  @apply bg-card;
}

.bg-adaptive-elevated {
  @apply bg-slate-100 dark:bg-slate-800;
}

/* Section-specific backgrounds */
.bg-section-hero {
  @apply bg-gradient-to-br from-slate-100 via-background to-slate-100
         dark:from-slate-900 dark:via-slate-950 dark:to-slate-900;
}

.bg-section-features {
  @apply bg-gradient-to-br from-blue-50 via-background to-purple-50
         dark:from-blue-950/20 dark:via-slate-950 dark:to-purple-950/20;
}

.bg-section-alternate {
  @apply bg-gradient-to-br from-purple-50 via-background to-blue-50
         dark:from-purple-950/20 dark:via-slate-950 dark:to-blue-950/20;
}
```

### Text Color Utilities (Updated)
```css
/* Semantic text colors */
.text-adaptive-primary {
  @apply text-foreground;
}

.text-adaptive-secondary {
  @apply text-muted-foreground;
}

.text-adaptive-muted {
  @apply text-gray-600 dark:text-gray-400;
}

.text-adaptive-contrast {
  @apply text-gray-900 dark:text-white;
}

/* Enhanced contrast classes */
.text-enhanced-contrast {
  @apply text-foreground dark:contrast-text;
}

.text-enhanced-secondary {
  @apply text-muted-foreground dark:contrast-text-secondary;
}
```

### Glow Effects (Theme-Aware)
```css
/* Light mode glows (subtle) */
.glow-light-blue   { box-shadow: 0 0 15px rgba(59, 130, 246, 0.2); }
.glow-light-purple { box-shadow: 0 0 15px rgba(147, 51, 234, 0.2); }
.glow-light-green  { box-shadow: 0 0 15px rgba(34, 197, 94, 0.2); }

/* Dark mode glows (enhanced) */
.glow-dark-blue   { box-shadow: 0 0 25px rgba(59, 130, 246, 0.4); }
.glow-dark-purple { box-shadow: 0 0 25px rgba(147, 51, 234, 0.4); }
.glow-dark-green  { box-shadow: 0 0 25px rgba(34, 197, 94, 0.4); }

/* Adaptive glow utility */
.glow-adaptive {
  @apply glow-light-blue dark:glow-dark-blue;
}
```

## Theme Toggle Implementation

### Theme Toggle Component
```tsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-adaptive-primary border-border text-adaptive-primary 
                 hover:bg-adaptive-secondary transition-all duration-300"
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
}
```

### CSS Custom Properties Integration
```css
:root {
  /* Light mode variables */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  /* Dark mode variables */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 217.2 32.6% 17.5%;
}
```

## Enhanced Color Palette

### Primary Colors (Light Mode Optimized)
- **Primary-50**: #F0F9FF (Light backgrounds)
- **Primary-100**: #E0F2FE (Subtle highlights)
- **Primary-200**: #BAE6FD (Light accents)
- **Primary-300**: #7DD3FC (Medium accents)
- **Primary-400**: #38BDF8 (Bright interactive)
- **Primary-500**: #0EA5E9 (Main brand)
- **Primary-600**: #0284C7 (Dark interactive)
- **Primary-700**: #0369A1 (Deep brand)
- **Primary-800**: #075985 (Very dark)
- **Primary-900**: #0C4A6E (Darkest)

### Enhanced Dark Theme Colors
- **Slate-950**: #020617 (Primary dark background)
- **Slate-900**: #0F172A (Secondary dark background)
- **Slate-800**: #1E293B (Card backgrounds)
- **Slate-700**: #334155 (Elevated surfaces)
- **Slate-600**: #475569 (Border colors)
- **Slate-500**: #64748B (Disabled text)
- **Slate-400**: #94A3B8 (Secondary text)
- **Slate-300**: #CBD5E1 (Primary text)
- **Slate-200**: #E2E8F0 (High contrast text)
- **Slate-100**: #F1F5F9 (Maximum contrast)

### Gradient Colors
- **Cyan-Blue**: `from-cyan-500 to-blue-500`
- **Blue-Purple**: `from-blue-500 to-purple-500`
- **Purple-Pink**: `from-purple-500 to-pink-500`
- **Green-Emerald**: `from-green-500 to-emerald-500`
- **Pink-Rose**: `from-pink-500 to-rose-500`
- **Amber-Orange**: `from-amber-500 to-orange-500`

### Glow Effect Colors (Theme-Aware)
- **Cyan Glow**: `shadow-cyan-500/30` (data visualization)
- **Blue Glow**: `shadow-blue-500/30` (primary actions)
- **Purple Glow**: `shadow-purple-500/30` (secondary actions)
- **Green Glow**: `shadow-green-500/30` (success states)
- **Pink Glow**: `shadow-pink-500/30` (accent features)
- **Amber Glow**: `shadow-amber-500/30` (warning states)

## Advanced Typography System

### Enhanced Font Stack
- **Primary**: Inter Variable (optimized for dark themes)
- **Monospace**: JetBrains Mono Variable
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

### Typography Effects
- **Text Glow**: `text-shadow: 0 0 20px currentColor`
- **3D Text**: `text-shadow: 1px 1px 2px rgba(0,0,0,0.3)`
- **Letter Spacing Hover**: `transition: letter-spacing 0.3s ease`
- **Gradient Text**: Background clipping for colorful text effects

### Contrast Classes
- **High Contrast**: `.contrast-text` - Enhanced visibility in dark mode
- **Secondary Contrast**: `.contrast-text-secondary` - Subtle text with good readability
- **Glow Subtle**: `.text-glow-subtle` - Soft ambient text glow

## Interactive Animation System

### Core Animation Classes

#### Entrance Animations
```css
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

.fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
}

.scale-in {
  animation: scaleIn 0.4s ease-out forwards;
}
```

#### Stagger Animation Delays
```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
.stagger-6 { animation-delay: 0.6s; }
```

#### Micro-Interaction Classes
```css
.floating {
  animation: floating 3s ease-in-out infinite;
}

.hover-lift {
  transition: transform 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
}

.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shimmer 2s infinite;
}
```

#### Glow Effects
```css
.glow-effect {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  transition: box-shadow 0.3s ease;
}

.dark-glow-cyan { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
.dark-glow-blue { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
.dark-glow-purple { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
.dark-glow-green { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
.dark-glow-pink { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3); }
.dark-glow-amber { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
```

### Depth Shadow System
```css
.depth-shadow-sm { box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06); }
.depth-shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06); }
.depth-shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05); }
.depth-shadow-xl { box-shadow: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04); }
```

### Glassmorphism Components
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.interactive-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.interactive-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

## Layout System Enhancements

### Responsive Grid Layouts
- **Features Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (3x2 layout)
- **Benefits Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 
- **Testimonials**: Horizontal scroll with smooth snap
- **Steps**: Alternating left/right layout on desktop

### Container Specifications
```css
.section-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24;
}

.content-container {
  @apply max-w-4xl mx-auto text-center mb-16;
}
```

## Dark Mode Implementation

### Theme-Aware Utilities
```css
.dark-optimized {
  @apply bg-slate-950 text-slate-200;
}

.dark-surface {
  @apply bg-slate-900/50 border-slate-800;
}

.dark-elevated {
  @apply bg-slate-800/50 border-slate-700;
}
```

### Contrast Enhancements
```css
.high-contrast-text {
  @apply text-slate-100;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.accessible-link {
  @apply text-blue-400 hover:text-blue-300 underline-offset-4;
}
```

## Animation Performance Guidelines

### Hardware Acceleration
- Use `transform` and `opacity` properties for animations
- Prefer `will-change: transform` for elements that will animate
- Use `transform3d()` to force GPU acceleration when needed

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .floating,
  .shimmer,
  .scale-in,
  .fade-in {
    animation: none;
  }
  
  .hover-lift:hover {
    transform: none;
  }
}
```

### Performance Optimization
- Limit concurrent animations to 3-5 elements
- Use `animation-fill-mode: forwards` to prevent layout shifts
- Implement intersection observers for entrance animations
- Debounce hover effects with CSS transitions

## Accessibility Enhancements

### Enhanced Focus States
```css
.focus-visible:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900;
}
```

### Screen Reader Support
- Use semantic HTML structure
- Implement proper ARIA labels
- Provide alternative text for decorative elements
- Ensure proper heading hierarchy

### Color Contrast Compliance
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text and UI components
- Enhanced contrast classes for critical content
- Theme-aware color adjustments

## Implementation Guidelines

### Framer Motion Integration
```tsx
// Entrance Animation Pattern
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  className="fade-in-up stagger-{index}"
>

// Hover Animation Pattern
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.98 }}
  className="interactive-btn hover-lift"
>
```

### CSS Variable System
```css
:root {
  --animate-duration: 0.6s;
  --animate-delay: 0.1s;
  --glow-color: rgba(59, 130, 246, 0.3);
  --surface-opacity: 0.05;
  --backdrop-blur: 10px;
}
```

### Component Development Pattern
1. Start with Magic UI MCP generation
2. Apply glassmorphism base classes
3. Add micro-animation classes
4. Implement theme-aware glow effects
5. Test accessibility and performance
6. Document component variations

## Testing Guidelines

### Animation Testing
- Test on different devices and browsers
- Verify reduced motion compliance
- Check performance with dev tools
- Validate accessibility with screen readers

### Visual Testing
- Verify contrast ratios in dark mode
- Test glow effects across themes
- Validate responsive behavior
- Check depth shadow consistency

## Container Specifications (Theme-Aware)
```css
.section-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24;
}

.content-container {
  @apply max-w-4xl mx-auto text-center mb-16;
}

.adaptive-section {
  @apply relative overflow-hidden;
  @apply bg-background dark:bg-slate-950;
}

.elevated-section {
  @apply relative overflow-hidden;
  @apply bg-slate-50 dark:bg-slate-900;
}
```

## Implementation Guidelines

### Theme Implementation Best Practices

#### 1. Always Use Semantic Classes
```tsx
// ✅ Good - Theme-aware
<div className="bg-background text-foreground">
<div className="bg-muted text-muted-foreground">

// ❌ Avoid - Hardcoded colors
<div className="bg-white text-black">
<div className="bg-slate-950 text-gray-300">
```

#### 2. Leverage Tailwind Dark Mode Variants
```tsx
// ✅ Good - Explicit light/dark modes
<div className="bg-white dark:bg-slate-950">
<p className="text-gray-700 dark:text-gray-300">

// ✅ Better - Semantic approach
<div className="bg-background">
<p className="text-muted-foreground">
```

#### 3. Section Background Patterns
```tsx
// Hero sections
<section className="bg-gradient-to-br from-slate-100 via-background to-slate-100 
                   dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">

// Feature sections  
<section className="bg-gradient-to-br from-blue-50 via-background to-purple-50 
                   dark:from-blue-950/20 dark:via-slate-950 dark:to-purple-950/20">

// Alternating sections
<section className="bg-gradient-to-br from-purple-50 via-background to-blue-50 
                   dark:from-purple-950/20 dark:via-slate-950 dark:to-blue-950/20">
```

#### 4. Card and Component Theming
```tsx
// Adaptive card
<div className="bg-white/90 border-gray-200/50 
               dark:bg-gray-900/40 dark:border-gray-800/50 
               backdrop-blur-md rounded-xl">

// Button theming
<button className="bg-white/80 text-gray-700 border-gray-300 
                  dark:bg-gray-800/50 dark:text-white dark:border-gray-700/50 
                  hover:bg-gray-50 dark:hover:bg-gray-700/50">
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
.mobile-first {
  @apply text-sm md:text-base lg:text-lg xl:text-xl;
  @apply p-4 md:p-6 lg:p-8 xl:p-12;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
```

### Accessibility Considerations

#### Color Contrast Requirements
- **Light Mode**: Minimum 4.5:1 contrast ratio for normal text
- **Dark Mode**: Enhanced contrast with glowing effects for improved readability
- **Interactive Elements**: Clear focus states in both themes

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .floating,
  .shimmer,
  .scale-in,
  .fade-in {
    animation: none;
  }
  
  .hover-lift:hover {
    transform: none;
  }
}
```

## Component Usage Examples

### Theme-Aware Feature Card
```tsx
const FeatureCard = ({ icon, title, description }: FeatureProps) => (
  <div className="h-full p-6 transition-all duration-300 text-center
                  bg-white/90 border-gray-200/50 rounded-xl
                  dark:bg-gray-900/40 dark:border-gray-800/50 dark:backdrop-blur-md
                  hover:scale-105 hover:-translate-y-2
                  hover:bg-white dark:hover:border-gray-700/70
                  shadow-lg hover:shadow-xl">
    <div className="text-blue-600 dark:text-purple-400 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
)
```

### Theme-Aware Button Component
```tsx
const AdaptiveButton = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300"
  
  const variantClasses = {
    primary: `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white 
              hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl`,
    secondary: `${baseClasses} border bg-white/80 text-gray-700 border-gray-300
               dark:bg-gray-800/50 dark:text-white dark:border-gray-700/50
               hover:bg-gray-50 dark:hover:bg-gray-700/50`,
    outline: `${baseClasses} border-2 bg-transparent border-gray-300 text-gray-700
             dark:border-gray-600 dark:text-gray-300
             hover:bg-gray-100 dark:hover:bg-gray-800`
  }
  
  return (
    <button className={variantClasses[variant]} {...props}>
      {children}
    </button>
  )
}
```

## Design System Checklist

### Before Implementation
- [ ] Identify component's light/dark mode requirements
- [ ] Choose appropriate semantic color tokens
- [ ] Plan hover and focus states for both themes
- [ ] Consider glassmorphism and blur effects
- [ ] Test contrast ratios in both modes

### During Development
- [ ] Use theme-aware Tailwind classes
- [ ] Implement proper backdrop-blur for glass effects
- [ ] Add appropriate glow effects per theme
- [ ] Ensure interactive states work in both modes
- [ ] Test with reduced motion preferences

### Quality Assurance
- [ ] Visual verification in light mode
- [ ] Visual verification in dark mode
- [ ] Theme toggle functionality
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Mobile responsiveness in both themes

## Version History
- 3.0 (2025-06-05): Comprehensive light/dark mode theming approach with Vibe DevSquad colors
- 2.0 (2025-06-05): Comprehensive micro-animations, glassmorphism, and dark mode optimization
- 1.0 (2025-06-04): Initial version

## Conclusion

This design system provides a complete foundation for building consistent, accessible, and visually stunning user interfaces that work seamlessly across light and dark themes. The Vibe DevSquad color scheme maintains brand identity while the adaptive theming ensures excellent user experience in any lighting condition.

**Key Takeaways:**
- Always use semantic color tokens (`bg-background`, `text-foreground`, etc.)
- Leverage Tailwind's dark mode variants for explicit theming
- Maintain proper contrast ratios in both light and dark modes
- Use glassmorphism effects that adapt to the current theme
- Test all interactive states in both themes for consistency

For component implementation, refer to the Magic UI documentation and use the MCP tools for generating theme-aware components that follow this design system.
