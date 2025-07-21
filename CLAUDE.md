# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` or `pnpm dev:chrome` - Start development server for Chrome extension
- `pnpm dev:firefox` - Start development server for Firefox extension  
- `pnpm build` or `pnpm build:chrome` - Build production Chrome extension
- `pnpm build:firefox` - Build production Firefox extension

## Project Architecture

This is a browser extension called "utab" that replaces the new tab page with a TLDraw infinite canvas. Built with React, TypeScript, Vite, and TailwindCSS.

### Key Architecture Components

**Extension Structure:**
- `src/pages/newtab/` - Main new tab replacement page with TLDraw canvas
- `src/pages/popup/` - Browser extension popup interface
- `src/pages/options/` - Extension options/settings page
- `src/pages/content/` - Content script for web pages
- `src/pages/background/` - Background script for extension lifecycle
- `src/pages/panel/` - DevTools panel
- `src/pages/devtools/` - DevTools integration

**TLDraw Integration:**
- Custom shape utilities in `src/pages/newtab/widgets/`
- `CardShapeUtil` and `CardShapeTool` - Custom card widgets with types (plain text, todo)
- `StickerShapeUtil`, `StickerTool`, `StickerBindingUtil` - Custom sticker functionality
- Custom toolbar integration with TLDraw's UI system

**Build System:**
- Vite-based build with separate configs for Chrome (`vite.config.chrome.ts`) and Firefox (`vite.config.firefox.ts`)
- Uses `@crxjs/vite-plugin` for Chrome extension manifest v3 support
- Custom Vite plugins in `custom-vite-plugins.ts` for icon stripping and i18n
- Nodemon configs for hot-reloading during development

**Widget System:**
The extension has an extensible widget system for the TLDraw canvas:
- Base card shape with configurable types (plain text, todo list planned)
- Widget types are defined in `src/pages/newtab/widgets/CardShape/CardType/`
- Migration system for shape data (`card-shape-migration.ts`)

**Focus Mode:**
The extension includes focus mode functionality accessible through the popup interface.

## Important Files

- `manifest.json` - Chrome extension manifest (production)
- `manifest.dev.json` - Development manifest overrides
- `vite.config.base.ts` - Shared Vite configuration
- `src/pages/newtab/Newtab.tsx` - Main TLDraw integration component