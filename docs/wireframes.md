# EduActivity Finder Wireframe Suggestions

## Overview
Responsive web design with mobile-first approach. Clean, modern UI using React components.

## 1. Home Page
```
[Header with logo, search bar, login/register buttons]

[Hero Section]
- Large search bar with category dropdown
- Popular categories: Education, Sports, etc.
- Featured providers carousel

[How it works section]
- 3-step process: Search → Compare → Contact

[Footer with links]
```

## 2. Search Results Page
```
[Header]

[Filters Sidebar - Desktop: left, Mobile: collapsible]
- Category checkboxes
- Subcategory filters
- Location input with radius
- Price range slider
- Rating filter
- Sort dropdown: Relevance, Distance, Rating, Price

[Main Content]
- Map view toggle button
- Results count
- Provider cards grid/list
  - Photo, name, rating, reviews count
  - Category, address, price
  - Distance, contact buttons
- Pagination

[Footer]
```

## 3. Provider Detail Page
```
[Header]

[Provider Header]
- Main photo, name, rating, reviews count
- Category, address, contact info
- Bookmark button, share button

[Tabs: Overview, Reviews, Photos, Contact]

[Overview Tab]
- Description
- Services offered
- Pricing details
- Certificates
- Map with location

[Reviews Tab]
- Average rating
- Review list with user photos, ratings, text
- Write review button (for logged-in users)

[Photos Tab]
- Photo gallery grid

[Contact Tab]
- Contact form
- Phone, email buttons
- In-app chat button

[Footer]
```

## 4. Login/Register Page
```
[Header]

[Centered Form]
- Email input
- Password input
- Remember me checkbox
- Login button
- Forgot password link
- Social login buttons (Google)
- Switch to register link

[Footer]
```

## 5. Provider Dashboard
```
[Header with provider menu]

[Dashboard Overview]
- Profile completion %
- Profile views this month
- Inquiries count
- Subscription status

[Quick Actions]
- Edit Profile
- Manage Photos
- View Reviews
- Subscription Management

[Recent Activity]
- New reviews
- New inquiries
- Profile view stats

[Footer]
```

## 6. Admin Dashboard
```
[Header with admin menu]

[Stats Overview]
- Total users, providers, subscriptions
- Monthly growth charts
- Revenue metrics

[Provider Management]
- Pending approvals list
- Approved providers table
- Reports/Complaints

[User Management]
- User list with filters
- Activity logs

[Reports]
- Usage statistics
- Payment reports
- System health

[Footer]
```

## 7. Subscription Flow
```
[Choose Plan Page]
- Yearly plan card ($99/year)
- Half-yearly plan card ($59/6 months)
- Feature comparison
- Select button

[Payment Page]
- Plan summary
- Payment method selection (Razorpay/Stripe)
- Billing info form
- Pay now button

[Confirmation Page]
- Success message
- Subscription details
- Next steps
```

## Responsive Design
- **Mobile (< 768px)**: Single column, collapsible menus, bottom navigation
- **Tablet (768px - 1024px)**: Two-column layouts, side navigation
- **Desktop (> 1024px)**: Multi-column, full navigation, advanced filters

## Olive Green Theme Wireframe

### Updated Color Scheme
- **Primary Olive**: `#556B2F` (main) / `#445626` (hover)
- **Light Olive Accents**: `#A3B18A` / `#8F9F77` (hover)
- **Backgrounds**: `#FFFFFF` (white) / `#F3F4F6` (light gray)
- **Text Colors**:
  - Headings: `#1C1C1C`
  - Body: `#374151`
  - Muted: `#6B7280`
- **Borders**: `#E5E7EB`

### Typography
- **Font Family**: Inter, Plus Jakarta Sans (weights 400-700)
- **Headings**: Inter Bold
- **Body**: Inter Regular
- **Responsive scaling** for mobile/desktop

### Key Pages Wireframe

#### 1. Home Page - Olive Green Theme
```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR] EduActivity Finder                    [Login] [Sign Up] │
│ ────────────────────────────────────────────────────────────── │
│                                                             │
│  [HERO SECTION - Olive Green Gradient Background]          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Find the Perfect                                 │    │
│  │  Educational & Activity                            │    │
│  │  Provider                                          │    │
│  │                                                     │    │
│  │  [Search Bar] [Category Dropdown]                   │    │
│  │                                                     │    │
│  │  [Primary Button - Olive]  [Outline Button]        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [HOW IT WORKS - Light Gray Background]                     │
│  ┌─────┐  ┌─────┐  ┌─────┐                                 │
│  │  1  │  │  2  │  │  3  │                                 │
│  │Search│  │Comp │  │Cont │                                 │
│  └─────┘  └─────┘  └─────┘                                 │
│                                                             │
│  [POPULAR CATEGORIES - White Background]                    │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│  │ [Education Icon]│ │ [Sports Icon]   │ │ [Music Icon]    │ │
│  │ Education       │ │ Sports          │ │ Music           │ │
│  │ [Explore Button]│ │ [Explore Button]│ │ [Explore Button]│ │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│                                                             │
│  [FEATURED PROVIDERS - Light Gray Background]               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Provider Card 1] [Provider Card 2] [Provider Card 3] │    │
│  │ Name: ABC Learning   Name: Math Masters   Name: Music  │    │
│  │ Rating: ★★★★☆       Rating: ★★★★☆        Rating: ★★★★☆ │    │
│  │ [View Profile]       [View Profile]        [View Profile]│    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [CTA SECTION - Dark Olive Gradient]                        │
│  Ready to Get Started?                                      │
│  [Sign Up Free] [Sign In]                                   │
│                                                             │
│ [FOOTER] © 2025 EduActivity Finder                          │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Login Page - Olive Green Theme
```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR] EduActivity Finder                    [Home] [Search] │
│ ────────────────────────────────────────────────────────────── │
│                                                             │
│                                                             │
│                                                             │
│                [LOGIN FORM - White Card]                    │
│                ┌─────────────────────────────┐              │
│                │           Sign In           │              │
│                │                             │              │
│                │ Email: [_______________]   │              │
│                │ Password: [____________]   │              │
│                │ [ ] Remember me            │              │
│                │                             │              │
│                │ [Sign In - Olive Button]   │              │
│                │                             │              │
│                │ Forgot password?           │              │
│                │ ────────────────────────── │              │
│                │ Don't have account?        │              │
│                │ [Sign Up - Outline]        │              │
│                └─────────────────────────────┘              │
│                                                             │
│                                                             │
│                                                             │
│ [FOOTER]                                                    │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Provider Detail Page - Olive Green Theme
```
┌─────────────────────────────────────────────────────────────┐
│ [NAVBAR] EduActivity Finder [Search Bar] [Login] [Sign Up]   │
│ ────────────────────────────────────────────────────────────── │
│                                                             │
│  [PROVIDER HEADER - Olive Gradient Background]              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Provider Photo]                                   │    │
│  │ ABC Learning Center                                │    │
│  │ ★★★★☆ (4.5) • 127 reviews                          │    │
│  │ Education • 123 Main St, City                       │    │
│  │ [Contact] [Bookmark] [Share]                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [TABS: Overview | Reviews | Photos | Contact]             │
│                                                             │
│  [OVERVIEW TAB - White Background]                         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Professional educational services for all ages.     │    │
│  │                                                     │    │
│  │ Services:                                           │    │
│  │ • Mathematics Tutoring                              │    │
│  │ • Science Coaching                                  │    │
│  │ • Test Preparation                                   │    │
│  │                                                     │    │
│  │ Pricing: From $25/hour                             │    │
│  │                                                     │    │
│  │ [Book Now - Olive Button]                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│ [FOOTER]                                                    │
└─────────────────────────────────────────────────────────────┘
```

### Design Elements
- **Buttons**: Olive green gradients with hover effects
- **Cards**: Glassmorphism with subtle shadows
- **Navigation**: Clean navbar with olive green accents
- **Typography**: Inter font family with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Icons**: Modern icons with olive green coloring

### Responsive Breakpoints
- **Mobile (< 768px)**: Single column, stacked elements
- **Tablet (768px+)**: Two-column layouts
- **Desktop (1024px+)**: Multi-column with full features

### Interactive Elements
- **Hover States**: Smooth transitions to darker olive
- **Focus States**: Olive green outlines for accessibility
- **Loading States**: Olive green spinners and progress bars
- **Error States**: Modern error messages with olive accents

## Icons
- Material Icons or Font Awesome
- Consistent iconography throughout

## Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
