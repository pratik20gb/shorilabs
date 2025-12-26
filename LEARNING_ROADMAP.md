# 🗺️ Learning Roadmap for shorilabs

A comprehensive guide to understand how this project works, from basics to advanced concepts.

## 📚 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Tech Stack Overview](#tech-stack-overview)
3. [Project Architecture](#project-architecture)
4. [Learning Path](#learning-path)
5. [Key Concepts](#key-concepts)
6. [Code Walkthrough](#code-walkthrough)
7. [Advanced Topics](#advanced-topics)

---

## 🎯 Prerequisites

Before diving in, you should be familiar with:

- **HTML/CSS** - Basic web structure and styling
- **JavaScript Fundamentals** - Variables, functions, arrays, objects
- **ES6+ Features** - Arrow functions, destructuring, modules, async/await
- **React Basics** - Components, props, state, hooks
- **TypeScript Basics** - Types, interfaces, type inference
- **Node.js & npm** - Package management and CLI tools

---

## 🛠️ Tech Stack Overview

### Core Technologies

#### 1. **React 18** - UI Library
- **Why?** Component-based, declarative UI
- **Key Features Used:**
  - Functional components with hooks
  - Context API (via next-themes)
  - React Router for navigation

#### 2. **TypeScript** - Type Safety
- **Why?** Catches errors at compile-time, better IDE support
- **Key Features:**
  - Type annotations
  - Interfaces for props
  - Type inference

#### 3. **Vite** - Build Tool
- **Why?** Fast development server, optimized builds
- **Key Features:**
  - Hot Module Replacement (HMR)
  - ES modules
  - Plugin system

#### 4. **Tailwind CSS** - Utility-First CSS
- **Why?** Rapid UI development, consistent design
- **Key Features:**
  - Utility classes
  - Custom theme configuration
  - Dark mode support

#### 5. **shadcn/ui** - Component Library
- **Why?** Pre-built, accessible components
- **Key Features:**
  - Copy-paste components (not a dependency)
  - Built on Radix UI primitives
  - Fully customizable

#### 6. **Framer Motion** - Animation Library
- **Why?** Smooth, performant animations
- **Key Features:**
  - Declarative animations
  - Gesture support
  - Layout animations

---

## 🏗️ Project Architecture

### Directory Structure

```
shorilabs/
├── public/              # Static assets (images, robots.txt)
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components (reusable)
│   │   └── ...         # Custom components (Header, Footer, etc.)
│   ├── data/           # Pattern data (patterns.ts)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── App.tsx         # Root component
├── cli/                # CLI tool (separate package)
└── scripts/            # Build scripts
```

### Data Flow

```
User Interaction
    ↓
Component (e.g., PatternCard)
    ↓
State Management (useState, localStorage)
    ↓
Data Source (patterns.ts)
    ↓
UI Update (React re-render)
```

---

## 📖 Learning Path

### Phase 1: Foundation (Week 1-2)

#### Day 1-2: Understanding the Build System
1. **Vite Configuration** (`vite.config.ts`)
   - Learn: How Vite bundles your code
   - Practice: Modify port, add plugins
   - Key Concepts:
     - ES modules
     - Path aliases (`@/` → `src/`)
     - Development vs production builds

2. **TypeScript Setup** (`tsconfig.json`)
   - Learn: TypeScript compiler options
   - Practice: Add strict type checking
   - Key Concepts:
     - Module resolution
     - Type definitions
     - Compiler options

#### Day 3-4: React Basics in This Project
1. **Component Structure** (`src/components/`)
   - Learn: How components are organized
   - Practice: Create a new component
   - Key Files:
     - `Header.tsx` - Navigation component
     - `PatternCard.tsx` - Reusable card component
     - `Footer.tsx` - Footer component

2. **Props and State**
   - Learn: How data flows between components
   - Practice: Add a new prop to PatternCard
   - Key Concepts:
     - Props drilling
     - State management
     - Component composition

#### Day 5-7: Styling with Tailwind
1. **Tailwind Configuration** (`tailwind.config.ts`)
   - Learn: Custom theme, colors, animations
   - Practice: Add a new color or animation
   - Key Concepts:
     - Design tokens
     - Utility classes
     - Responsive design

2. **Component Styling**
   - Learn: How Tailwind classes are used
   - Practice: Style a new component
   - Key Concepts:
     - Conditional classes (`cn()` utility)
     - Dark mode classes
     - Responsive utilities

---

### Phase 2: Core Features (Week 3-4)

#### Day 8-10: Pattern Data Structure
1. **Data Model** (`src/data/patterns.ts`)
   - Learn: How patterns are structured
   - Practice: Add a new pattern
   - Key Concepts:
     - TypeScript interfaces
     - Data types
     - Pattern categories

2. **Data Flow**
   - Learn: How patterns are loaded and used
   - Practice: Filter patterns by category
   - Key Files:
     - `PatternGrid.tsx` - Pattern display logic
     - `PatternCard.tsx` - Individual pattern rendering

#### Day 11-14: State Management
1. **Local State** (`useState`)
   - Learn: Component-level state
   - Practice: Add search functionality
   - Key Files:
     - `Header.tsx` - Search state
     - `PatternGrid.tsx` - Filter state

2. **Persistent State** (`localStorage`)
   - Learn: Saving favorites
   - Practice: Add a "recently viewed" feature
   - Key Concepts:
     - Browser storage API
     - JSON serialization
     - State synchronization

#### Day 15-17: User Interactions
1. **Event Handling**
   - Learn: Click, hover, keyboard events
   - Practice: Add keyboard shortcuts
   - Key Files:
     - `PatternCard.tsx` - Click handlers
     - `PatternPreviewModal.tsx` - Modal interactions

2. **Clipboard API**
   - Learn: Copying to clipboard
   - Practice: Add copy feedback
   - Key Concepts:
     - Async operations
     - User feedback (toasts)
     - Error handling

---

### Phase 3: Advanced Features (Week 5-6)

#### Day 18-21: Animations
1. **Framer Motion** (`framer-motion`)
   - Learn: Animation basics
   - Practice: Add page transitions
   - Key Files:
     - `PatternGrid.tsx` - List animations
     - `Header.tsx` - Header animations
   - Key Concepts:
     - `motion` components
     - `AnimatePresence`
     - Animation variants

2. **CSS Animations**
   - Learn: Infinite scroll animation
   - Practice: Add loading animations
   - Key Concepts:
     - Keyframes
     - Animation timing
     - Performance optimization

#### Day 22-25: Advanced React Patterns
1. **Custom Hooks** (`src/hooks/`)
   - Learn: Reusable logic extraction
   - Practice: Create a `usePatterns` hook
   - Key Files:
     - `use-mobile.tsx` - Responsive hook
     - `use-toast.ts` - Toast notifications

2. **Context API**
   - Learn: Theme management
   - Practice: Add a settings context
   - Key Concepts:
     - Provider pattern
     - Context consumption
     - Performance considerations

#### Day 26-28: Performance Optimization
1. **React Optimization**
   - Learn: `useMemo`, `useCallback`
   - Practice: Optimize PatternGrid rendering
   - Key Concepts:
     - Memoization
     - Re-render prevention
     - Virtual scrolling (if needed)

2. **Code Splitting**
   - Learn: Lazy loading components
   - Practice: Split large components
   - Key Concepts:
     - Dynamic imports
     - Route-based splitting
     - Bundle analysis

---

### Phase 4: CLI Tool (Week 7)

#### Day 29-35: Understanding the CLI
1. **CLI Architecture** (`cli/`)
   - Learn: How CLI tools work
   - Practice: Add a new command
   - Key Files:
     - `cli/src/index.ts` - CLI entry point
     - `cli/src/commands/` - Command implementations

2. **Commander.js**
   - Learn: Command-line argument parsing
   - Practice: Add command options
   - Key Concepts:
     - Command structure
     - Option parsing
     - Help text generation

3. **File Operations**
   - Learn: Reading/writing files
   - Practice: Export patterns to different formats
   - Key Concepts:
     - File system APIs
     - Path manipulation
     - Error handling

---

## 🔑 Key Concepts

### 1. Component Composition

**What it is:** Building complex UIs from simple components

**Example:**
```tsx
// PatternCard is composed of smaller pieces
<PatternCard>
  <PatternPreview />
  <PatternActions />
</PatternCard>
```

**Where to see it:**
- `PatternGrid.tsx` - Composes PatternCard components
- `PatternPreviewModal.tsx` - Composes multiple UI elements

### 2. State Management Patterns

**Local State:**
```tsx
const [searchQuery, setSearchQuery] = useState("");
```

**Persistent State:**
```tsx
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
```

**Where to see it:**
- `PatternGrid.tsx` - Multiple state hooks
- `Header.tsx` - Search state

### 3. Type Safety with TypeScript

**Interface Definition:**
```tsx
interface Pattern {
  id: string;
  name: string;
  category: PatternCategory;
  css: string;
  tailwind: string;
}
```

**Type Usage:**
```tsx
const pattern: Pattern = { ... };
```

**Where to see it:**
- `src/data/patterns.ts` - Pattern type definitions
- `src/components/PatternCard.tsx` - Component props typing

### 4. Conditional Rendering

**Pattern:**
```tsx
{isLoading ? (
  <LoadingSkeleton />
) : (
  <PatternList />
)}
```

**Where to see it:**
- `PatternGrid.tsx` - Loading states
- `PatternPreviewModal.tsx` - Modal visibility

### 5. Event Handling

**Click Events:**
```tsx
onClick={(e) => {
  e.stopPropagation();
  handleClick();
}}
```

**Where to see it:**
- `PatternCard.tsx` - Card interactions
- `Header.tsx` - Navigation clicks

### 6. CSS-in-JS Pattern (Tailwind)

**Dynamic Classes:**
```tsx
className={cn(
  "base-classes",
  condition && "conditional-class",
  className // Allow override
)}
```

**Where to see it:**
- All component files use `cn()` utility
- `src/lib/utils.ts` - `cn()` function definition

---

## 🔍 Code Walkthrough

### Understanding the App Flow

#### 1. **Entry Point** (`src/main.tsx`)
```tsx
// Renders App component into DOM
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```

#### 2. **App Component** (`src/App.tsx`)
```tsx
// Sets up providers (Theme, Router, Query)
<ThemeProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  </BrowserRouter>
</ThemeProvider>
```

#### 3. **Index Page** (`src/pages/Index.tsx`)
```tsx
// Main page layout
<Header onSearch={setSearchQuery} />
<PatternGrid searchQuery={searchQuery} />
<CLISection />
<Footer />
```

#### 4. **Pattern Grid** (`src/components/PatternGrid.tsx`)
```tsx
// Manages pattern display logic
- Loads patterns from data
- Filters by category/search
- Manages favorites
- Handles pattern selection
```

#### 5. **Pattern Card** (`src/components/PatternCard.tsx`)
```tsx
// Individual pattern display
- Shows pattern preview
- Handles click to open modal
- Manages favorite toggle
- Handles copy to clipboard
```

---

## 🚀 Advanced Topics

### 1. Performance Optimization

**Memoization:**
```tsx
const filteredPatterns = useMemo(() => {
  return patterns.filter(/* ... */);
}, [activeCategory, searchQuery]);
```

**Where:** `PatternGrid.tsx`

### 2. Animation Patterns

**Framer Motion:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
```

**Where:** `PatternGrid.tsx`, `Header.tsx`

### 3. Error Boundaries

**Future Enhancement:**
```tsx
<ErrorBoundary>
  <PatternGrid />
</ErrorBoundary>
```

### 4. Testing Strategy

**Recommended:**
- Unit tests for utilities
- Component tests for UI
- Integration tests for flows

### 5. Accessibility

**Current:**
- ARIA labels
- Keyboard navigation
- Focus management

**Where:** All interactive components

---

## 📝 Practice Exercises

### Beginner
1. Add a new pattern category
2. Change the color scheme
3. Add a new button to Header
4. Modify PatternCard styling

### Intermediate
1. Add a "Recently Viewed" feature
2. Implement keyboard shortcuts
3. Add pattern rating system
4. Create a pattern comparison view

### Advanced
1. Add pattern editor
2. Implement pattern sharing
3. Add user accounts
4. Create pattern marketplace

---

## 🎓 Resources

### Official Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Project-Specific
- `README.md` - Project overview
- `CONTRIBUTING.md` - How to contribute
- Code comments - Inline documentation

---

## ✅ Learning Checklist

### Week 1-2: Foundation
- [ ] Understand Vite build process
- [ ] Understand TypeScript configuration
- [ ] Create a new component
- [ ] Modify Tailwind theme
- [ ] Understand component props

### Week 3-4: Core Features
- [ ] Understand pattern data structure
- [ ] Implement a new filter
- [ ] Add localStorage feature
- [ ] Understand state management
- [ ] Implement user interaction

### Week 5-6: Advanced
- [ ] Add animation to component
- [ ] Create custom hook
- [ ] Optimize component rendering
- [ ] Understand performance patterns
- [ ] Implement code splitting

### Week 7: CLI
- [ ] Understand CLI architecture
- [ ] Add new CLI command
- [ ] Understand file operations
- [ ] Build and publish CLI

---

## 🎯 Next Steps

1. **Start with Phase 1** - Build foundation
2. **Read the code** - Don't just copy, understand
3. **Make changes** - Break things, fix them
4. **Ask questions** - Use comments, documentation
5. **Build something** - Apply what you learned

---

**Happy Learning! 🚀**

Remember: Understanding comes from practice. Don't just read—code along!

