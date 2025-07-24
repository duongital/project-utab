# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Root Level Commands
- `pnpm install` - Install all dependencies across workspace
- `pnpm build` - Build all packages (includes styles build)
- `pnpm build:styles` - Build centralized TailwindCSS styles
- `pnpm dev:styles` - Watch and rebuild styles on file changes
- `pnpm dev` or `pnpm dev:chrome` - Start development server for Chrome extension (with styles watch)
- `pnpm dev:firefox` - Start development server for Firefox extension (with styles watch)
- `pnpm dev:web` - Start web development server (localhost:3000) (with styles watch)
- `pnpm build:web` - Build web app for production (includes styles build)
- `pnpm preview:web` - Preview web app production build

### Package-Specific Commands
- `pnpm build --filter @utab/extension` - Build extension only
- `pnpm build --filter @utab/tldraw-widgets` - Build widgets library
- `pnpm build --filter @utab/ui-components` - Build UI components library
- `pnpm build --filter @utab/styles` - Build styles package only
- `pnpm --filter @utab/web dev` - Start web app development server directly

## Project Architecture

This is a **monorepo** containing a browser extension called "utab" that replaces the new tab page with a TLDraw infinite canvas. Built with React, TypeScript, Vite, and TailwindCSS.

### Monorepo Structure

```
project-utab/
├── packages/
│   ├── styles/                  # Centralized TailwindCSS styles (@utab/styles)
│   ├── tldraw-widgets/          # Custom TLDraw widgets library  
│   └── ui-components/           # Shared UI components library
├── apps/
│   ├── extension/               # Main browser extension app (@utab/extension)
│   └── web/                     # Web development version (@utab/web)
├── docs/                        # Documentation
├── package.json                 # Workspace root
├── pnpm-workspace.yaml         # Workspace configuration
└── tsconfig.json               # Root TypeScript config
```

### Key Architecture Components

**Browser Extension App (@utab/extension):**
- `apps/extension/src/pages/newtab/` - Main new tab replacement page
- `apps/extension/src/pages/popup/` - Browser extension popup interface
- `apps/extension/src/pages/options/` - Extension options/settings page
- `apps/extension/src/pages/content/` - Content script for web pages
- `apps/extension/src/pages/background/` - Background script for extension lifecycle
- `apps/extension/src/pages/panel/` - DevTools panel
- `apps/extension/src/pages/devtools/` - DevTools integration

**TLDraw Widgets Package (@utab/tldraw-widgets):**
- `packages/tldraw-widgets/src/shapes/CardShape/` - Custom card widgets with types (plain text, todo)
- `packages/tldraw-widgets/src/shapes/Sticker/` - Custom sticker functionality with binding
- `packages/tldraw-widgets/src/tldraw-canvas/` - Shared TldrawCanvas component used by both extension and web apps
- Exports: `CardShapeUtil`, `CardShapeTool`, `StickerShapeUtil`, `StickerTool`, `StickerBindingUtil`, `TldrawCanvas`, `TldrawCanvasProps`
- Custom toolbar integration with TLDraw's UI system

**Styles Package (@utab/styles):**
- `packages/styles/src/input.css` - Base TailwindCSS input file with custom theme
- `packages/styles/dist/index.css` - Generated CSS output consumed by all apps
- `packages/styles/tailwind.config.js` - TailwindCSS configuration scanning all monorepo files
- `packages/styles/build.js` - Custom build system with file watching
- Centralized TailwindCSS v3.4.x system watching all `.tsx/.jsx/.ts/.js` files across monorepo
- Generates utility classes on-demand based on actual usage in components

**UI Components Package (@utab/ui-components):**
- `packages/ui-components/src/` - Shared React components, hooks, and styles
- Ready for future expansion of reusable UI elements

**Web App (@utab/web):**
- `apps/web/src/` - Web development version of the TLDraw canvas application
- `apps/web/src/components/TldrawCanvas.tsx` - Wrapper component using shared TldrawCanvas from @utab/tldraw-widgets
- `apps/web/src/pages/Dashboard.tsx` - Web version of the newtab page
- `apps/web/src/pages/Settings.tsx` - Web version of extension options with localStorage
- React Router setup for navigation between Canvas and Settings
- Uses shared TldrawCanvas component with localStorage storage and same widgets as extension
- Runs on localhost:3000 for faster development and testing

**Build System:**
- Vite-based build with separate configs for Chrome and Firefox in extension app
- Uses `@crxjs/vite-plugin` for Chrome extension manifest v3 support
- Custom Vite plugins in `apps/extension/custom-vite-plugins.ts`
- Nodemon configs for hot-reloading during development
- Standard Vite setup for web app with React (removed TailwindCSS Vite plugin)
- Centralized TailwindCSS build system in `@utab/styles` package
- TypeScript project references for efficient builds across packages
- Root scripts automatically build styles before other packages and run styles watcher in development

**Widget System:**
The extension has an extensible widget system using the tldraw-widgets package:
- Base card shape with configurable types (plain text, todo list)
- Widget types are defined in `packages/tldraw-widgets/src/shapes/CardShape/CardType/`
- Migration system for shape data (`card-shape-migration.ts`)
- Sticker system with binding utilities for attaching to other shapes
- Shared TldrawCanvas component with configurable storage (Chrome extension storage vs localStorage)

**Shared TldrawCanvas Component:**
The `TldrawCanvas` component in `@utab/tldraw-widgets` provides:
- Unified TLDraw implementation used by both extension and web app
- Configurable storage type (`chrome` for extension, `localStorage` for web)
- Customizable persistence keys, focus mode defaults, and asset URLs
- Type-safe props interface with `TldrawCanvasProps`

**Centralized Styles System:**
The `@utab/styles` package provides:
- Single source of truth for TailwindCSS across the monorepo
- Automatic scanning of all `.tsx/.jsx/.ts/.js` files in apps and packages
- On-demand utility class generation based on actual usage
- Custom build system with file watching for development
- Both apps import styles via `@import '@utab/styles'` in their CSS files

**Focus Mode:**
The extension includes focus mode functionality accessible through the popup interface.

## Important Files

**Browser Extension:**
- `apps/extension/manifest.json` - Chrome extension manifest (production)
- `apps/extension/manifest.dev.json` - Development manifest overrides
- `apps/extension/vite.config.base.ts` - Shared Vite configuration
- `apps/extension/vite.config.chrome.ts` - Chrome-specific build config
- `apps/extension/vite.config.firefox.ts` - Firefox-specific build config
- `apps/extension/src/pages/newtab/Newtab.tsx` - Uses shared TldrawCanvas component with Chrome storage

**Styles Package:**
- `packages/styles/package.json` - Styles package configuration with TailwindCSS v3.4.x
- `packages/styles/tailwind.config.js` - TailwindCSS configuration with content paths
- `packages/styles/build.js` - Custom build script with file watching
- `packages/styles/src/input.css` - Base TailwindCSS input with custom theme
- `packages/styles/dist/index.css` - Generated CSS output (auto-generated, don't edit)

**Web App:**
- `apps/web/package.json` - Web app dependencies and scripts
- `apps/web/vite.config.ts` - Vite configuration for web development (removed TailwindCSS plugin)
- `apps/web/tsconfig.json` - TypeScript configuration extending root config
- `apps/web/src/main.tsx` - React app entry point with router setup
- `apps/web/src/App.tsx` - Main app component with routing
- `apps/web/src/index.css` - Imports centralized styles via `@import '@utab/styles'`

**Workspace:**
- `pnpm-workspace.yaml` - PNPM workspace configuration
- Root `package.json` - Workspace scripts with styles build integration
- Root `tsconfig.json` - TypeScript project references and path mapping