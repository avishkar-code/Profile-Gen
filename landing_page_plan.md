# Implementation Plan - Landing Page & Dynamic UI

## Objective
Create a visually stunning, premium landing page that acts as the entry point to the application. It should highlight the tool's capabilities (drag-and-drop, custom badges, live preview) and provide a clear transitions to the main "Dashboard" (Editor).

## Design Philosophy
*   **Aesthetic**: "Cyber-Preneur" / Modern Dev. Dark mode, deep slate backgrounds, distinct "Glassmorphism" panels, and vibrant neon accents (primary/accent colors).
*   **Motion**: Smooth entrance animations, floating elements, and interactive hover states using `framer-motion`.
*   **Typography**: Clean sans-serif (Inter) with large, bold headlines.

## Proposed Layout

### 1. Hero Section (Above the Fold)
*   **Headline**: "Craft Your Ultimate Developer Identity."
*   **Subheadline**: "The most advanced drag-and-drag GitHub Profile README generator. Customize badges, visualize stats, and stand out."
*   **CTA Button**: Large, glowing "Enter Studio" button.
*   **Visual**: A tilted, 3D-style perspective view of the Editor interface or floating badge elements that react to mouse movement.

### 2. Feature Grid (Bento Style)
*   A grid of glass panels highlighting key features:
    *   🎨 **Custom & Dynamic Badges**: "Gradient, solid, or mixed styles."
    *   📊 **Live GitHub Stats**: "Real-time data fetching."
    *   🖱️ **Drag & Drop**: "Effortless reordering."
    *   ⚡ **Instant Export**: "Copy Markdown in one click."

### 3. Footer
*   Minimal footer with credits.

## Technical Implementation Steps

### Step 1: Refactor `App.tsx`
*   Current `App.tsx` contains the entire Editor logic.
*   **Action**: Extract the current Editor UI into a new component `src/components/dashboard/Dashboard.tsx`.
*   **Action**: Update `App.tsx` to handle a simple state `view: 'landing' | 'dashboard'`.

### Step 2: Create `LandingPage.tsx`
*   Create `src/components/landing/LandingPage.tsx`.
*   Use `framer-motion` for animations.
*   Implement the Hero and Feature sections.

### Step 3: Add Animations & Polish
*   Add `initial`, `animate`, `exit` states for smooth transition between Landing and Dashboard.
*   Ensure the "Enter Studio" button feels substantial (hover effects, scale).

## User Flow
1.  User opens app -> Sees **Landing Page** with entrance animation.
2.  User explores features.
3.  User clicks **"Enter Studio"**.
4.  Background transitions (or zooms in), Landing fades out.
5.  **Dashboard** (Editor) fades in, ready to work.
