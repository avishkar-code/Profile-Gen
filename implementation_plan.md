# Implementation Plan: The Ultimate GitHub Profile Generator

## 1. Project Overview
A "No-Code" builder for GitHub Profile READMEs with a specialized "Badge Studio" for custom assets. The app features a 3-column layout (Navigator, Editor, Preview) and exports a ZIP file containing the `README.md` and generated assets.

## 2. Tech Stack Verification
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (Vanilla, per instructions, but utilizing utility classes for premium design)
- **State Management**: Zustand
- **Image Generation**: html-to-image
- **Zip Generation**: jszip + file-saver
- **Icons**: react-icons
- **Drag & Drop**: @dnd-kit/core & @dnd-kit/sortable (for reordering blocks)
- **Animations**: framer-motion (for micro-animations and smooth transitions)

## 3. Architecture & State Management (Zustand)
The global store `useProfileStore` will manage:
- `blocks`: Array of block objects (id, type, data).
- `selectedBlockId`: ID of the currently acting block.
- `globalSettings`: Theme, etc.
- Actions: `addBlock`, `removeBlock`, `updateBlock`, `reorderBlocks`.

## 4. Component Structure
### Layout
- **MainLayout**: CSS Grid/Flex layout for the 3 columns.
    - `Col 1`: **BlockNavigator** (Sidebar)
    - `Col 2`: **BlockEditor** (Dynamic Forms)
    - `Col 3`: **LivePreview** (Real-time Render)

### Core Components
- **BadgeStudio** (Inside Editor):
    - Color pickers (Solid/Gradient).
    - Icon selector.
    - Geometry controls (padding, radius).
    - *Preview Node*: A hidden (or visible) DOM node used by `html-to-image`.
- **BlockList** (Navigator):
    - Drag-and-drop list of added sections.
- **PreviewRenderer**:
    - Maps state blocks to actual UI representations.
    - Note: This must look exactly like GitHub's Markdown output (fonts, spacing).

## 5. Implementation Steps

### Phase 1: Foundation
1.  **Initialize Project**: `npx create-vite@latest ./ --template react-ts`
2.  **Install Dependencies**: `npm install tailwindcss postcss autoprefixer zustand html-to-image jszip file-saver react-icons framer-motion @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities clsx tailwind-merge`
3.  **Setup Tailwind**: Configure `tailwind.config.js` with premium colors/fonts (Inter/Outfit).
4.  **Global Styles**: Add base styles for a "Dark Mode" aesthetic (Glassmorphism).

### Phase 2: Core Logic (store)
1.  Create `src/store/useProfileStore.ts`.
2.  Define types: `Block`, `BadgeStyle`, `ProfileData`.
3.  Implement CRUD actions for blocks.

### Phase 3: The 3-Column UI
1.  **Navigator**: Create the sidebar with available blocks (Header, About, Tech Stack, etc.).
2.  **Editor**: Create the dynamic form container.
    - Implement `HeaderEditor`.
    - Implement `AboutEditor`.
    - Implement `TechStackEditor` (The Badge Studio).
3.  **Preview**: Create the `README` preview area.
    - Implement rendering logic for each block type.

### Phase 4: The Badge Studio & Image Gen
1.  Create `BadgePreview` component (the DOM node to capture).
2.  Implement "Export to PNG" logic using `html-to-image`.
3.  Ensure gradients export correctly (avoid `transparent`, use `rgba`).

### Phase 5: Export System
1.  Create `MarkdownGenerator`: Function to convert state -> Markdown string.
2.  Create `ZipBundler`:
    - Generate Markdown string.
    - specific "Tech Stack" blocks trigger image generation.
    - Add text and images to `JSZip` instance.
    - Trigger download.

## 6. Detailed Feature Specs

### Blocks
- **Header**:
    - Inputs: Name, Subtitle (Typing effect simulation?), Banner Image URL.
    - Markdown: `<h1 align="center">...</h1>`
- **Tech Stack (Badge Studio)**:
    - Inputs: Icon List, Style (Solid/Gradient), Colors, Radius.
    - Output: `<p align="center"><img src="./assets/badge-1.png" /> ...</p>`
- **Stats**:
    - Inputs: Theme selection (dracula, dark, radical), show_icons toggle.
    - Output: `![Stats](https://github-readme-stats.vercel.app/api?username=...)`

### Design System (Premium)
- **Colors**: Deep dark backgrounds (`#0f172a`), Vibrant accents (`#8b5cf6`, `#ec4899`).
- **Effects**: Glassmorphism blocks, smooth hover states.
- **Typography**: Sans-serif, clean (Inter or native system fonts).

## 7. QA & Polish
- precise layout check (does the preview match GitHub?).
- Performance check on Image Generation (loading states).
- Tooltip/Guide for user on how to upload the result.
