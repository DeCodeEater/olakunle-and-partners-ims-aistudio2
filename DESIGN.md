---
name: Architectural Prestige
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#49454e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#7a757f'
  outline-variant: '#cbc4cf'
  surface-tint: '#675689'
  primary: '#251544'
  on-primary: '#ffffff'
  primary-container: '#3b2b5b'
  on-primary-container: '#a693cb'
  inverse-primary: '#d1bdf7'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#141f30'
  on-tertiary: '#ffffff'
  tertiary-container: '#293447'
  on-tertiary-container: '#919cb3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d1bdf7'
  on-primary-fixed: '#221141'
  on-primary-fixed-variant: '#4e3e6f'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  financial-data:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin: 32px
  container-max: 1440px
---

## Brand & Style

The design system is defined by a "Corporate Architectural" aesthetic—a philosophy that treats digital interfaces with the same precision, structural integrity, and clinical clarity as a physical blueprint. It targets high-stakes professional environments where data density and clarity are paramount.

The visual narrative is **Minimalist** and **Highly Structured**. It avoids decorative flourishes in favor of intentional whitespace, hairline borders, and a disciplined color application. The emotional response is one of absolute reliability, intellectual rigor, and sophisticated authority. The UI feels like a high-end physical tool: cold to the touch but perfectly calibrated for performance.

## Colors

The palette is anchored by **Midnight Purple**, a deep, regal accent that introduces a layer of modern prestige to the existing architectural foundation. This primary color is used sparingly for high-impact actions and active states, replacing the previous reliance on slate to elevate the brand’s perceived value.

- **Primary (Midnight Purple):** Used for primary calls-to-action, active navigation markers, and critical focus states.
- **Secondary (Emerald Trust):** Reserved for growth indicators, success states, and secondary brand highlights.
- **Tertiary (Deep Slate):** Utilized for structural text and secondary UI elements to maintain a grounded, professional weight.
- **Background (Canvas White):** A clean, off-white base that prevents eye strain while maintaining a clinical atmosphere.
- **Borders (Whisper):** Subtle, low-contrast dividers that define the "blueprinting" grid without cluttering the visual field.

## Typography

Typography in this design system follows a strict hierarchical logic to manage high information density.

- **Headlines (Outfit):** Geometric and authoritative. Used to anchor the layout and provide clear structural wayfinding.
- **Body (Hanken Grotesk):** A modern, highly legible sans-serif that balances the warmth of humanistic design with the precision of a grotesque. It provides the primary reading experience.
- **Financials & Labels (JetBrains Mono):** A monospaced font used for all numerical data, financial tables, and technical labels. This reinforces the "architectural" feel and ensures that columns of numbers align perfectly for rapid scanning and comparison.

## Layout & Spacing

The layout is governed by a **12-column fixed grid** on desktop, transitioning to a flexible 4-column layout on mobile. The spacing rhythm is based on a strict 4px baseline grid, ensuring every element is mathematically aligned.

- **Density:** High. Padding is tight (often 8px or 12px within components) to allow for maximum data visibility without sacrificing legibility.
- **Margins:** Generous exterior margins (32px+) create a "frame" for the content, emphasizing the clinical, gallery-like presentation of data.
- **Alignment:** Every element must align to the grid edges. Centered layouts are discouraged; left-aligned "staircase" structures are preferred to mimic architectural documentation.

## Elevation & Depth

To maintain the architectural "blueprinting" feel, this design system rejects heavy shadows and physical depth. Instead, it utilizes **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Tiers:** Depth is communicated by shifting the background color slightly (e.g., a "Canvas White" base with a "Whisper" tinted container).
- **Outlines:** All containers, cards, and input fields use a 1px "Whisper Border." No shadows are used for static elements.
- **Active Elevation:** Only transient elements (dropdowns, modals) may use a minimal, highly diffused ambient shadow (#000000 at 5% opacity) to provide just enough separation from the background.

## Shapes

The shape language is **Soft but Precise**. While the overall layout is rigid and rectangular, a subtle 4px (0.25rem) corner radius is applied to interactive elements to prevent the UI from feeling hostile or overly sharp.

- **Interactive Elements:** Buttons, inputs, and chips use a uniform `rounded-sm` (4px).
- **Structural Elements:** Large containers and cards follow the same 4px radius, maintaining a consistent silhouette across the entire interface. 
- **Pill Shapes:** Strictly forbidden. Even the smallest tags should maintain the architectural 4px corner radius.

## Components

- **Buttons:** Primary buttons are solid Midnight Purple with white text. Secondary buttons use a Whisper Border with Deep Slate text. All buttons feature the 4px corner radius and Outfit typography.
- **Input Fields:** Clinical and minimal. They utilize a 1px Whisper Border that transitions to Midnight Purple on focus. Labels are always in JetBrains Mono to signify their "technical" nature.
- **Data Tables:** High-density, utilizing JetBrains Mono for all numeric cells. Rows are separated by 1px hairline dividers; zebra-striping is avoided in favor of subtle hover highlights in a 5% opacity Midnight Purple tint.
- **Active Navigation:** The active state in sidebars or top-nav is indicated by a 2px Midnight Purple vertical or horizontal stroke, coupled with a weight change in the typography.
- **Cards:** Flat with Whisper Borders. No shadows. Content inside cards follows a rigid grid-within-a-grid alignment.
- **Financial Indicators:** Emerald Trust is used for positive trends, while a muted "Architectural Red" (#991B1B) is used for negatives, both presented in JetBrains Mono for consistency.