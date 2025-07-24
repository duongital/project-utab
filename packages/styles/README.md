# @utab/styles

Centralized TailwindCSS styles package for the utab monorepo.

## Overview

This package provides a centralized TailwindCSS build system that watches all `.tsx`, `.jsx`, `.ts`, and `.js` files across the monorepo and outputs a single `index.css` file for consumption by other packages.

## Usage

### In other packages

Add as a dependency:
```json
{
  "dependencies": {
    "@utab/styles": "workspace:*"
  }
}
```

Import in your CSS files:
```css
@import '@utab/styles';
```

### Development Commands

```bash
# Build styles once
pnpm run build:once

# Build and watch for changes  
pnpm run dev

# From workspace root
pnpm run build:styles     # Build once
pnpm run dev:styles       # Watch mode
```

## Configuration

- **Input**: `src/input.css` - Base TailwindCSS file with custom theme
- **Output**: `dist/index.css` - Generated CSS file
- **Config**: `tailwind.config.js` - TailwindCSS configuration

## Watched Files

The build system watches for changes in:
- `src/**/*.css` (source files)
- `tailwind.config.js` (config changes)
- `../../apps/*/src/**/*.{tsx,jsx,ts,js}` (all app components)
- `../../packages/*/src/**/*.{tsx,jsx,ts,js}` (all package components)

## Custom Theme

Includes custom animations and variables:
- `--animate-spin-slow`: 20s linear infinite spin animation
- Custom keyframes for animations

## Build System

Uses PostCSS with `@tailwindcss/postcss` plugin and a custom Node.js build script with file watching via `chokidar`.