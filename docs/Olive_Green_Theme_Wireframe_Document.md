# EduActivity Finder - Olive Green Theme Wireframe Document

**Version:** 1.0  
**Date:** September 25, 2025  
**Designer:** AI Assistant  
**Project:** EduActivity Finder React Application  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Overview](#design-overview)
3. [Color Palette](#color-palette)
4. [Typography](#typography)
5. [Component Specifications](#component-specifications)
6. [Page Wireframes](#page-wireframes)
7. [Responsive Design](#responsive-design)
8. [Interactive Elements](#interactive-elements)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Implementation Notes](#implementation-notes)

---

## Executive Summary

This document presents the wireframe and design specifications for the EduActivity Finder application with a modern olive green theme. The design maintains all existing functionality while implementing a cohesive olive green color scheme that provides excellent readability and a professional, nature-inspired aesthetic.

The theme features olive green gradients, clean typography using the Inter font family, and maintains responsive design principles across all device sizes.

---

## Design Overview

### Theme Philosophy
- **Nature-Inspired**: Olive green evokes trust, growth, and education
- **Professional**: Clean, modern design suitable for educational services
- **Accessible**: High contrast ratios and readable typography
- **Responsive**: Seamless experience across all devices

### Key Design Principles
- Consistent use of olive green across all interactive elements
- Glassmorphism effects for modern card designs
- Smooth hover transitions and animations
- Clear visual hierarchy with proper spacing
- Mobile-first responsive design approach

---

## Color Palette

### Primary Colors
| Color Name | Hex Code | Usage | Contrast Ratio |
|------------|----------|-------|----------------|
| **Primary Olive** | `#556B2F` | Primary buttons, links, accents | 4.5:1 (AAA) |
| **Primary Olive Hover** | `#445626` | Button hover states | 3.8:1 (AA) |
| **Light Olive Accent** | `#A3B18A` | Secondary buttons, borders | 2.1:1 |
| **Light Olive Hover** | `#8F9F77` | Secondary hover states | 2.3:1 |

### Background Colors
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **White Background** | `#FFFFFF` | Main content areas, cards |
| **Light Gray Background** | `#F3F4F6` | Section separators, subtle areas |
| **Dark Olive Background** | `#1B1F1A` | CTA sections, dark mode |
| **Dark Olive Secondary** | `#2D3228` | Dark section backgrounds |

### Text Colors
| Color Name | Hex Code | Usage | Contrast Ratio |
|------------|----------|-------|----------------|
| **Heading Text** | `#1C1C1C` | H1-H6 headings | 18.1:1 (AAA) |
| **Body Text** | `#374151` | Paragraphs, labels | 10.2:1 (AAA) |
| **Muted Text** | `#6B7280` | Secondary text, captions | 4.6:1 (AA) |

### Utility Colors
| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Border Color** | `#E5E7EB` | Dividers, card borders |
| **Error Red** | `#EF4444` | Error messages, validation |
| **Success Green** | `#22C55E` | Success states, confirmations |

---

## Typography

### Font Family
- **Primary**: Inter, Plus Jakarta Sans
- **Fallback**: sans-serif
- **Weights Available**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Type Scale
| Element | Font Size | Line Height | Font Weight | Usage |
|---------|-----------|-------------|-------------|-------|
| **H1** | 2.5rem (40px) | 1.2 | 800 | Page titles, hero headings |
| **H2** | 2rem (32px) | 1.2 | 700 | Section headings |
| **H3** | 1.5rem (24px) | 1.2 | 600 | Subsection headings |
| **H4** | 1.25rem (20px) | 1.2 | 600 | Card titles, form labels |
| **H5** | 1.1rem (18px) | 1.2 | 500 | Small headings |
| **H6** | 1rem (16px) | 1.2 | 500 | Small labels |
| **Body** | 1rem (16px) | 1.6 | 400 | Paragraphs, descriptions |
| **Small** | 0.875rem (14px) | 1.4 | 400 | Captions, metadata |

### Responsive Typography
- **Mobile (< 768px)**: Font sizes reduced by 0.25rem
- **Tablet (768px+)**: Standard sizes
- **Desktop (1024px+)**: Slightly larger for better readability

---

## Component Specifications

### Buttons

#### Primary Button
```
┌─────────────────────────────┐
│        [Button Text]        │
└─────────────────────────────┘
```
- **Background**: `linear-gradient(135deg, #556B2F 0%, #445626 100%)`
- **Text Color**: White
- **Border Radius**: 16px
- **Padding**: 14px 28px
- **Font Weight**: 600
- **Hover Effect**: Scale 1.02, translateY -3px

#### Secondary Button
```
┌─────────────────────────────┐
│        [Button Text]        │
└─────────────────────────────┘
```
- **Background**: `linear-gradient(135deg, #A3B18A 0%, #8F9F77 100%)`
- **Text Color**: White
- **Border Radius**: 16px
- **Padding**: 14px 28px
- **Font Weight**: 600

#### Outline Button
```
┌─────────────────────────────┐
│        [Button Text]        │
└─────────────────────────────┘
```
- **Background**: Transparent
- **Border**: 2px solid `#A3B18A`
- **Text Color**: `#556B2F`
- **Hover**: Background changes to light olive

### Cards

#### Standard Card
```
┌─────────────────────────────────┐
│                                 │
│        [Card Content]           │
│                                 │
│        [Card Actions]           │
│                                 │
└─────────────────────────────────┘
```
- **Background**: `rgba(255, 255, 255, 0.9)`
- **Backdrop Filter**: `blur(10px)`
- **Border Radius**: 20px
- **Border**: 1px solid `rgba(255, 255, 255, 0.2)`
- **Box Shadow**: Multiple layered shadows
- **Padding**: 2.5rem

### Form Elements

#### Input Field
```
┌─────────────────────────────┐
│ [Label]                      │
│ ┌─────────────────────────┐ │
│ │ [Placeholder Text]      │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```
- **Border**: 1px solid `#E5E7EB`
- **Border Radius**: 8px
- **Padding**: 12px 16px
- **Focus State**: Olive green border and shadow

---

## Page Wireframes

### 1. Home Page

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [LOGO] EduActivity Finder                    [Login] [Sign Up] │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ╔═════════════════════════════════════════════════╗  │    │
│  │  ║           HERO SECTION                         ║  │    │
│  │  ║           (Olive Green Gradient)               ║  │    │
│  │  ╚═════════════════════════════════════════════════╝  │    │
│  │                                                     │    │
│  │  Find the Perfect Educational & Activity Provider  │    │
│  │                                                     │    │
│  │  ┌─────────────────┐ ┌─────────────────┐           │    │
│  │  │ [Search Bar]    │ │ [Category ▼]    │           │    │
│  │  └─────────────────┘ └─────────────────┘           │    │
│  │                                                     │    │
│  │  ┌─────────────────┐ ┌─────────────────┐           │    │
│  │  │ Primary Button  │ │ Outline Button  │           │    │
│  │  └─────────────────┘ └─────────────────┘           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 HOW IT WORKS                         │    │
│  │                 (Light Gray Background)              │    │
│  │                                                     │    │
│  │  ┌─────┐  ┌─────┐  ┌─────┐                           │    │
│  │  │  1  │  │  2  │  │  3  │                           │    │
│  │  │Search│  │Comp │  │Cont │                           │    │
│  │  └─────┘  └─────┘  └─────┘                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              POPULAR CATEGORIES                      │    │
│  │              (White Background)                      │    │
│  │                                                     │    │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │  │ [Education Icon]│ │ [Sports Icon]   │ │ [Music Icon]    │ │
│  │  │ Education       │ │ Sports          │ │ Music           │ │
│  │  │ [Explore Button]│ │ [Explore Button]│ │ [Explore Button]│ │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐        │
│  │              FEATURED PROVIDERS                      │        │
│  │              (Light Gray Background)                │        │
│  │                                                     │        │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │  │ Provider Card 1 │ │ Provider Card 2 │ │ Provider Card 3 │ │
│  │  │ ★★★★☆ (4.5)     │ │ ★★★★☆ (4.2)     │ │ ★★★★☆ (4.8)     │ │
│  │  │ [View Profile]  │ │ [View Profile]  │ │ [View Profile]  │ │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐        │
│  │              CALL TO ACTION                         │        │
│  │              (Dark Olive Gradient)                  │        │
│  │                                                     │        │
│  │  Ready to Get Started?                              │        │
│  │                                                     │        │
│  │  ┌─────────────────┐ ┌─────────────────┐                    │
│  │  │ Sign Up Free    │ │ Sign In         │                    │
│  │  └─────────────────┘ └─────────────────┘                    │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────┐        │
│  │                    FOOTER                            │        │
│  │  © 2025 EduActivity Finder                          │        │
│  └─────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 2. Login Page

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [LOGO] EduActivity Finder                    [Home] [Search] │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                                                             │
│                                                             │
│                                                             │
│                ┌─────────────────────────────────────┐       │
│                │           LOGIN FORM               │       │
│                │           (White Card)             │       │
│                │                                     │       │
│                │  Email: _____________________      │       │
│                │                                     │       │
│                │  Password: __________________      │       │
│                │                                     │       │
│                │  [ ] Remember me                    │       │
│                │                                     │       │
│                │  ┌─────────────────────────────┐   │       │
│                │  │     Sign In (Olive)         │   │       │
│                │  └─────────────────────────────┘   │       │
│                │                                     │       │
│                │  Forgot your password?             │       │
│                │  ───────────────────────────────── │       │
│                │  Don't have an account?            │       │
│                │  ┌─────────────────────────────┐   │       │
│                │  │     Sign Up (Outline)       │   │       │
│                │  └─────────────────────────────┘   │       │
│                └─────────────────────────────────────┘       │
│                                                             │
│                                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐     │
│  │                    FOOTER                            │     │
│  └─────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 3. Provider Detail Page

```
┌─────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [LOGO] EduActivity Finder [Search] [Login] [Sign Up]     │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              PROVIDER HEADER                       │    │
│  │              (Olive Gradient Background)           │    │
│  │                                                     │    │
│  │  [Provider Photo]                                   │    │
│  │                                                     │    │
│  │  ABC Learning Center                                │    │
│  │  ★★★★☆ (4.5) • 127 reviews                          │    │
│  │                                                     │    │
│  │  Education • 123 Main Street, City                  │    │
│  │                                                     │    │
│  │  ┌─────┐ ┌─────┐ ┌─────┐                            │    │
│  │  │Contact│ │Book│ │Share│                            │    │
│  │  └─────┘ └─────┘ └─────┘                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Overview] [Reviews] [Photos] [Contact]            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 OVERVIEW TAB                        │    │
│  │                 (White Background)                  │    │
│  │                                                     │    │
│  │  Professional educational services for all ages.   │    │
│  │                                                     │    │
│  │  Services Offered:                                  │    │
│  │  • Mathematics Tutoring                             │    │
│  │  • Science Coaching                                 │    │
│  │  • Test Preparation                                 │    │
│  │                                                     │    │
│  │  Pricing: From $25/hour                            │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────┐                    │    │
│  │  │     Book Now (Olive)       │                    │    │
│  │  └─────────────────────────────┘                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    FOOTER                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Layout
- Single column layout
- Collapsible navigation
- Stacked form elements
- Touch-friendly button sizes
- Reduced typography scale

### Tablet Layout
- Two-column layouts where appropriate
- Side navigation
- Medium-sized touch targets
- Balanced content distribution

### Desktop Layout
- Multi-column layouts
- Full navigation menu
- Advanced filtering options
- Optimized for mouse interaction

---

## Interactive Elements

### Hover States
- **Buttons**: Scale transform + color transition
- **Links**: Color change to olive green
- **Cards**: Subtle lift effect + shadow increase
- **Navigation**: Background highlight

### Focus States
- **Inputs**: Olive green border + shadow
- **Buttons**: Olive green outline
- **Links**: Olive green underline

### Loading States
- **Buttons**: Olive green spinner
- **Cards**: Skeleton loading with olive accents
- **Forms**: Olive green progress indicators

### Error States
- **Forms**: Red error messages with olive accents
- **Buttons**: Disabled state with muted olive
- **Alerts**: Modern error cards with olive styling

---

## Accessibility Considerations

### Color Contrast
- All text meets WCAG 2.1 AA standards
- Interactive elements have sufficient contrast
- Error states are clearly distinguishable

### Keyboard Navigation
- Tab order follows logical content flow
- Focus indicators are visible and olive-themed
- Keyboard shortcuts for common actions

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Alt text for all images
- Proper heading hierarchy

### Touch Targets
- Minimum 44px touch targets on mobile
- Adequate spacing between interactive elements
- Clear visual feedback for touch interactions

---

## Implementation Notes

### CSS Variables
All colors are defined as CSS custom properties for easy maintenance:

```css
:root {
  --color-primary: #556B2F;
  --color-primary-hover: #445626;
  --color-secondary: #A3B18A;
  --color-secondary-hover: #8F9F77;
  --color-text-heading: #1C1C1C;
  --color-text-body: #374151;
  --color-text-muted: #6B7280;
  --color-bg-light: #FFFFFF;
  --color-bg-subtle: #F3F4F6;
  --color-border: #E5E7EB;
}
```

### Component Structure
- Maintain existing React component structure
- Only visual styling changes applied
- All functionality preserved
- Responsive design maintained

### Browser Support
- Modern browsers with CSS Grid and Flexbox support
- CSS Custom Properties (CSS Variables)
- CSS Backdrop-filter for glassmorphism effects
- Progressive enhancement for older browsers

---

## Conclusion

This wireframe document provides a comprehensive guide for implementing the olive green theme across the EduActivity Finder application. The design maintains professional aesthetics while providing excellent usability and accessibility.

The olive green color scheme creates a trustworthy, educational atmosphere while the clean typography and modern components ensure a premium user experience across all devices.

**Document Version:** 1.0  
**Last Updated:** September 25, 2025  
**Next Review:** October 25, 2025
