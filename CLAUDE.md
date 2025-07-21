# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Root Level Commands
- `pnpm install` - Install all dependencies across workspace
- `pnpm build` - Build all packages
- `pnpm dev` or `pnpm dev:chrome` - Start development server for Chrome extension
- `pnpm dev:firefox` - Start development server for Firefox extension

### Package-Specific Commands
- `pnpm build --filter @utab/browser-extension` - Build extension only
- `pnpm build --filter @utab/tldraw-widgets` - Build widgets library
- `pnpm build --filter @utab/ui-components` - Build UI components library

## Project Architecture

This is a **monorepo** containing a browser extension called "utab" that replaces the new tab page with a TLDraw infinite canvas. Built with React, TypeScript, Vite, and TailwindCSS.

### Monorepo Structure

```
project-utab/
├── packages/
│   ├── browser-extension/        # Main extension package
│   ├── tldraw-widgets/          # Custom TLDraw widgets library  
│   └── ui-components/           # Shared UI components library
├── apps/                        # Future applications
├── docs/                        # Documentation
├── package.json                 # Workspace root
├── pnpm-workspace.yaml         # Workspace configuration
└── tsconfig.json               # Root TypeScript config
```

### Key Architecture Components

**Browser Extension Package (@utab/browser-extension):**
- `packages/browser-extension/src/pages/newtab/` - Main new tab replacement page
- `packages/browser-extension/src/pages/popup/` - Browser extension popup interface
- `packages/browser-extension/src/pages/options/` - Extension options/settings page
- `packages/browser-extension/src/pages/content/` - Content script for web pages
- `packages/browser-extension/src/pages/background/` - Background script for extension lifecycle
- `packages/browser-extension/src/pages/panel/` - DevTools panel
- `packages/browser-extension/src/pages/devtools/` - DevTools integration

**TLDraw Widgets Package (@utab/tldraw-widgets):**
- `packages/tldraw-widgets/src/shapes/CardShape/` - Custom card widgets with types (plain text, todo)
- `packages/tldraw-widgets/src/shapes/Sticker/` - Custom sticker functionality with binding
- Exports: `CardShapeUtil`, `CardShapeTool`, `StickerShapeUtil`, `StickerTool`, `StickerBindingUtil`
- Custom toolbar integration with TLDraw's UI system

**UI Components Package (@utab/ui-components):**
- `packages/ui-components/src/` - Shared React components, hooks, and styles
- Ready for future expansion of reusable UI elements

**Build System:**
- Vite-based build with separate configs for Chrome and Firefox in browser-extension package
- Uses `@crxjs/vite-plugin` for Chrome extension manifest v3 support
- Custom Vite plugins in `packages/browser-extension/custom-vite-plugins.ts`
- Nodemon configs for hot-reloading during development
- TypeScript project references for efficient builds across packages

**Widget System:**
The extension has an extensible widget system using the tldraw-widgets package:
- Base card shape with configurable types (plain text, todo list)
- Widget types are defined in `packages/tldraw-widgets/src/shapes/CardShape/CardType/`
- Migration system for shape data (`card-shape-migration.ts`)
- Sticker system with binding utilities for attaching to other shapes

**Focus Mode:**
The extension includes focus mode functionality accessible through the popup interface.

## Important Files

**Browser Extension:**
- `packages/browser-extension/manifest.json` - Chrome extension manifest (production)
- `packages/browser-extension/manifest.dev.json` - Development manifest overrides
- `packages/browser-extension/vite.config.base.ts` - Shared Vite configuration
- `packages/browser-extension/vite.config.chrome.ts` - Chrome-specific build config
- `packages/browser-extension/vite.config.firefox.ts` - Firefox-specific build config
- `packages/browser-extension/src/pages/newtab/Newtab.tsx` - Main TLDraw integration component

**Workspace:**
- `pnpm-workspace.yaml` - PNPM workspace configuration
- Root `package.json` - Workspace scripts and shared dependencies
- Root `tsconfig.json` - TypeScript project references and path mapping