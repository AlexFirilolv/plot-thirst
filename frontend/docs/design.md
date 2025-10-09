# Design Language & Themes

## Overview

Plot Thirst is an AI-generated erotic story platform that embraces a dark, sophisticated, and sensual aesthetic. The design language draws inspiration from the symbolism of the rose—beauty intertwined with danger, passion with restraint.

## Color Palette

### Primary Colors

- **Dark Red (Passion)** - `#8B0000` to `#DC143C`
  - Primary accent color
  - Used for CTAs, highlights, and interactive elements
  - Evokes desire, intensity, and forbidden pleasure
  - Use for: buttons, links, active states, emphasis

- **Thorn Green (Danger)** - `#1C2B1F` to `#2D4A2F`
  - Secondary accent color
  - Deep, almost black-green reminiscent of rose thorns
  - Represents the edge of danger and intrigue
  - Use for: secondary buttons, borders, subtle accents

- **Steel Gray (Restraint)** - `#36454F` to `#708090`
  - Neutral base color
  - Cold, metallic quality like handcuffs
  - Provides contrast and sophistication
  - Use for: text, backgrounds, dividers, cards

### Supporting Colors

- **Deep Black** - `#0A0A0A` to `#1A1A1A`
  - Primary background color
  - Creates depth and intimacy
  - Use for: main backgrounds, overlays

- **Soft White/Cream** - `#F5F5F5` to `#E8E8E8`
  - Primary text color
  - High contrast against dark backgrounds
  - Use for: body text, headings

- **Rose Petal** - `#FF6B9D` (sparingly)
  - Accent for hover states and highlights
  - Softer, more inviting touch
  - Use for: hover effects, notifications, badges

## Typography

### Font Families

- **Headings**: Serif fonts (e.g., Playfair Display, Cormorant, Libre Baskerville)
  - Elegant, sophisticated, with a literary quality
  - Evokes classic romance and erotica novels
  - Weight: 600-700 for impact

- **Body Text**: Sans-serif fonts (e.g., Inter, Roboto, Open Sans)
  - Clean, readable for long-form content
  - Modern and accessible
  - Weight: 400 for body, 500-600 for emphasis

- **Accent/Special**: Script or decorative serif (used sparingly)
  - For brand name, special callouts
  - Adds sensuality and personality

### Type Scale

```
Display:    48-64px (Brand, landing headers)
H1:         36-42px
H2:         28-32px
H3:         24-28px
H4:         20-24px
Body:       16-18px
Small:      14px
Tiny:       12px
```

## Design Principles

### 1. Dark & Intimate
- Predominantly dark backgrounds create a private, intimate atmosphere
- Like reading by candlelight or in a dimly lit bedroom
- Reduces harsh brightness, encouraging longer reading sessions

### 2. Sophisticated Sensuality
- Avoid crude or garish design
- Elegance and taste are paramount
- Sensual without being explicit in the UI itself
- Think high-end boutique, not adult store

### 3. Contrast & Tension
- High contrast between text and background for readability
- Visual tension through color pairing (red against green, light against dark)
- Mirrors the tension in erotic storytelling

### 4. Minimalism with Purpose
- Clean layouts that don't distract from content
- Every element serves a purpose
- White space (or rather, dark space) is generous
- Focus on the stories, not the chrome

### 5. Subtle Luxury
- Refined details: smooth gradients, soft shadows, elegant borders
- Premium feel without being ostentatious
- Quality over quantity in visual elements

## UI Components

### Buttons

**Primary (CTA)**
- Background: Dark Red gradient
- Text: White
- Hover: Brighter red with subtle glow
- Border-radius: 4-8px (slightly rounded, not pill-shaped)

**Secondary**
- Background: Transparent
- Border: 2px Thorn Green
- Text: Steel Gray
- Hover: Background Thorn Green, text White

**Ghost/Tertiary**
- Background: Transparent
- Text: Rose Petal
- Hover: Underline or subtle background

### Cards

- Background: `#1A1A1A` to `#242424`
- Border: 1px `#2D4A2F` or subtle dark red glow
- Border-radius: 8-12px
- Shadow: Soft, dark shadow for depth
- Hover: Subtle lift with increased shadow and red glow

### Forms & Inputs

- Background: `#0A0A0A`
- Border: 1px `#36454F`
- Focus: Border becomes dark red with subtle glow
- Text: `#F5F5F5`
- Placeholder: `#708090`
- Border-radius: 4px

### Navigation

- Background: Deep black with slight transparency
- Active state: Dark red underline or background
- Hover: Rose petal color transition
- Sticky/fixed for easy access

## Imagery & Graphics

### Photography Style
- Moody, low-key lighting
- High contrast with deep shadows
- Black and white with red accents preferred
- Artistic, suggestive rather than explicit
- Focus on textures: silk, leather, metal, rose petals

### Iconography
- Line icons, not filled
- Thin to medium weight (1.5-2px strokes)
- Consistent style throughout
- Color: Steel gray default, dark red on hover/active

### Illustrations
- Minimal, abstract shapes when needed
- Rose motifs (petals, thorns, stems)
- Handcuff silhouettes (subtle, sophisticated)
- Flowing, organic curves suggesting sensuality

## Spacing & Layout

### Grid System
- 12-column grid for flexibility
- Generous margins (15-20% on desktop)
- Content max-width: 1200px for reading comfort
- Story text max-width: 680px (optimal reading length)

### Spacing Scale
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

## Motion & Animation

### Principles
- Subtle, smooth, sensual
- Ease-in-out curves
- Duration: 200-400ms (quick but noticeable)
- No jarring or bouncy animations

### Examples
- Hover transitions: 300ms ease
- Page transitions: Smooth fades, 400ms
- Modal/overlay: Fade in background, slide in content
- Loading states: Gentle pulse or fade

## Accessibility

- Maintain WCAG AA contrast ratios minimum
- Ensure dark red has sufficient contrast on black (use lighter shades when needed)
- Provide focus indicators (red outline/glow)
- Respect prefers-reduced-motion
- Semantic HTML throughout
- ARIA labels for icon-only buttons

## Voice & Tone (Visual)

The visual design should communicate:
- **Confident**: Bold color choices, strong contrast
- **Mysterious**: Dark backgrounds, shadows, selective lighting
- **Sophisticated**: Clean layouts, refined typography, subtle details
- **Inviting**: Warm reds, smooth interactions, comfortable reading experience
- **Safe**: Professional execution, clear navigation, trustworthy UI

## Examples of Application

### Landing Page
- Full viewport hero with dark gradient background
- Large serif heading in white
- Dark red CTA button with glow effect
- Rose petal graphics subtly animated
- Dark green accent borders

### Story Cards
- Dark gray background (`#1A1A1A`)
- Thorn green left border (4px)
- Title in serif font, white
- Metadata in steel gray, smaller sans-serif
- Hover: Red glow shadow, slight lift

### Reading View
- Deep black background
- Cream text for optimal reading
- Generous line-height (1.6-1.8)
- Dark red highlights for selections
- Minimal UI while reading (hide nav)

### Authentication Pages
- Centered card on dark background
- Steel gray form inputs with red focus states
- Handcuff icon watermark (very subtle, 5% opacity)
- Dark red primary button

---

*This design language should be consistently applied across all touchpoints to create a cohesive, immersive brand experience that matches the passionate, sophisticated nature of the content.*
