# Monorepo Refactor Plan

## Overview
This plan outlines the transformation of the current `utab` browser extension into a scalable monorepo architecture. The goal is to prepare for future scaling by separating concerns, improving code reusability, and enabling independent development and deployment of different components.

## Current State Analysis

### Project Structure
- Single package browser extension
- React + TypeScript + TailwindCSS stack
- TLDraw canvas integration with custom widgets
- Multi-browser support (Chrome/Firefox)
- Vite-based build system with CRXJS plugin

### Key Components
- **Extension Core**: Background scripts, content scripts, manifest management
- **UI Components**: Newtab, Popup, Options, DevTools panel
- **Widget System**: Custom TLDraw shapes (CardShape, Sticker)
- **Build System**: Multi-browser Vite configurations
- **Development Tools**: Nodemon configs, hot reloading

## Proposed Monorepo Structure

```
project-utab/
  ├── packages/
  │   ├── browser-extension/        # Main extension package
  │   │   ├── src/
  │   │   │   ├── pages/           # Extension pages
  │   │   │   ├── background/      # Background scripts
  │   │   │   ├── shared/          # Shared utilities, types, constants
  │   │   │   └── utils/           # Extension-specific utilities
  │   │   ├── public/              # Static assets (icons, etc.)
  │   │   ├── manifest.json        # Base extension manifest
  │   │   ├── manifest.dev.json    # Development manifest overrides
  │   │   ├── package.json
  │   │   ├── vite.config.chrome.ts   # Chrome-specific Vite config
  │   │   ├── vite.config.firefox.ts  # Firefox-specific Vite config
  │   │   ├── vite.config.base.ts     # Shared Vite configuration
  │   │   ├── nodemon.chrome.json     # Chrome development watcher
  │   │   ├── nodemon.firefox.json    # Firefox development watcher
  │   │   ├── custom-vite-plugins.ts  # Custom Vite plugins (dev icons, i18n)
  │   │   └── tsconfig.json
  │   │
  │   ├── ui-components/           # Shared UI components library
  │   │   ├── src/
  │   │   │   ├── components/      # Reusable React components
  │   │   │   ├── hooks/          # Shared React hooks
  │   │   │   └── styles/         # Shared styles and themes
  │   │   ├── package.json
  │   │   ├── tsconfig.json
  │   │   └── vite.config.ts
  │   │
  │   └── tldraw-widgets/         # Custom TLDraw widgets library
  │       ├── src/
  │       │   ├── shapes/         # Custom shape implementations
  │       │   ├── tools/          # Custom tools
  │       │   └── utils/          # Widget utilities
  │       ├── package.json
  │       ├── tsconfig.json
  │       └── vite.config.ts
  │
  ├── apps/                       # Future applications
  │   └── web-app/               # Potential web version
  │
  ├── docs/                       # Documentation
  ├── package.json               # Root package.json with workspace config
  ├── pnpm-workspace.yaml        # PNPM workspace configuration
  ├── .eslintrc.js              # Shared ESLint config
  ├── .prettierrc               # Prettier configuration
  ├── .gitignore
  └── tsconfig.json             # Root TypeScript config
```

## Development Commands

After migration, the following commands will be available:

### Root Level Commands
```bash
# Install all dependencies across workspace
pnpm install

# Build all packages
pnpm build

# Build specific packages
pnpm build --filter browser-extension
pnpm build --filter ui-components
pnpm build --filter tldraw-widgets

# Development mode for extension
pnpm dev
pnpm dev:chrome
pnpm dev:firefox

# Lint all packages
pnpm lint

# Type check all packages
pnpm type-check
```

### Package-Specific Commands
```bash
# Browser Extension (from packages/browser-extension/)
pnpm dev:chrome          # Start Chrome development
pnpm dev:firefox         # Start Firefox development
pnpm build:chrome        # Build Chrome extension
pnpm build:firefox       # Build Firefox extension

# UI Components (from packages/ui-components/)
pnpm build              # Build component library
pnpm dev                # Start Storybook (if configured)

# TLDraw Widgets (from packages/tldraw-widgets/)
pnpm build              # Build widget library
pnpm dev                # Start widget development
```

## Workspace Configuration Files

The monorepo will require several configuration files:

### Root package.json
```json
{
  "name": "utab-monorepo",
  "version": "1.4.0",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm --filter browser-extension dev:chrome",
    "dev:chrome": "pnpm --filter browser-extension dev:chrome",
    "dev:firefox": "pnpm --filter browser-extension dev:firefox",
    "lint": "pnpm -r lint",
    "type-check": "pnpm -r type-check"
  },
  "devDependencies": {
    "typescript": "^5.8.2",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.18.0",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1"
  }
}
```

### pnpm-workspace.yaml
```yaml
packages:
  - "packages/*"
  - "apps/*"
```

### Root tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@utab/ui-components": ["./packages/ui-components/src"],
      "@utab/tldraw-widgets": ["./packages/tldraw-widgets/src"]
    }
  },
  "references": [
    { "path": "./packages/browser-extension" },
    { "path": "./packages/ui-components" },
    { "path": "./packages/tldraw-widgets" }
  ]
}
```

## Migration Strategy

### Phase 1: Setup Monorepo Infrastructure
1. **Initialize workspace structure**
   - Create `packages/` directory
   - Setup `pnpm-workspace.yaml`
   - Configure root `package.json` for workspace management

2. **Configure shared tooling**
   - Move TypeScript configs to root level
   - Setup shared ESLint/Prettier configs
   - Configure workspace development scripts

### Phase 2: Extract Widget Library
1. **Create `tldraw-widgets` package**
   - Move custom TLDraw shape implementations from `src/pages/newtab/widgets/`
   - Extract widget utilities and migration logic
   - Setup proper TLDraw peer dependencies
   - Configure build system for library export

2. **Create `ui-components` package**
   - Extract reusable React components that could be shared
   - Move shared styles and themes
   - Configure TypeScript exports and build system

### Phase 3: Restructure Main Extension
1. **Create `browser-extension` package**
   - Move main extension code to `packages/browser-extension/`
   - Keep all existing build configuration files
   - Update imports to use new package dependencies
   - Maintain existing functionality while using shared packages

2. **Update package dependencies**
   - Configure `browser-extension` to depend on `ui-components` and `tldraw-widgets`
   - Ensure proper peer dependency management
   - Update import paths throughout the extension code

3. **Validate build configuration**
   - Ensure Chrome/Firefox builds still work
   - Test nodemon configurations for development
   - Verify extension loading and functionality

### Phase 4: Testing and Workspace Configuration
1. **Configure workspace commands**
   - Setup root-level scripts for building all packages
   - Configure development scripts that work across packages
   - Setup proper dependency management between packages

2. **Ensure feature parity**
   - All existing functionality works
   - Chrome and Firefox builds are successful
   - Development workflow remains smooth

3. **Performance validation**
   - Extension load time unchanged
   - Bundle sizes optimized through shared dependencies
   - Hot reloading still functions

## Benefits of Monorepo Structure

### Immediate Benefits
- **Code Reusability**: Shared components and utilities can be reused across different parts of the extension
- **Better Organization**: Clear separation of concerns with focused packages
- **Improved TypeScript Support**: Better type sharing and validation across packages
- **Centralized Tooling**: Shared build, lint, and test configurations

### Future Scaling Benefits
- **Web Application**: `tldraw-widgets` and `ui-components` can be reused for a web version
- **Mobile Application**: Shared business logic and types can be leveraged
- **API/Backend Services**: Shared types ensure consistency between frontend and backend
- **Multiple Extensions**: Easy to create specialized extensions using shared packages

### Development Benefits
- **Independent Package Development**: Teams can work on different packages independently
- **Selective Building**: Only build packages that have changed
- **Better Testing**: Isolated testing of individual packages
- **Version Management**: Independent versioning of packages when needed

## Implementation Considerations

### Technical Considerations
- **Dependency Management**: Careful management of peer dependencies, especially for TLDraw
- **Build Performance**: Ensure build times don't significantly increase
- **Bundle Size**: Monitor for any bundle size increases due to package overhead
- **Development Experience**: Maintain smooth hot reloading and development workflow

### Migration Risks
- **Breaking Changes**: Risk of introducing bugs during restructuring
- **Complex Dependencies**: Managing circular dependencies between packages
- **Build Complexity**: Increased build configuration complexity
- **Development Setup**: More complex initial setup for new developers

### Mitigation Strategies
- **Incremental Migration**: Move packages one at a time with thorough testing
- **Automated Testing**: Comprehensive test suite to catch regressions
- **Documentation**: Clear documentation for new structure and development workflow
- **Rollback Plan**: Ability to rollback to current structure if needed

## Success Metrics

### Technical Metrics
- Feature parity with current implementation
- No performance regression in extension load time
- Successful builds for both Chrome and Firefox
- Maintained development workflow efficiency

### Scalability Metrics
- Easy addition of new packages/features
- Successful code reuse across packages
- Clear package boundaries and minimal coupling
- Improved developer onboarding experience

## Timeline Estimate

- **Phase 1** (Setup): 1-2 weeks
- **Phase 2** (Extract Libraries): 2-3 weeks
- **Phase 3** (Restructure Main): 1-2 weeks
- **Phase 4** (Testing): 1 week
- **Total**: 5-8 weeks

This timeline assumes careful incremental migration with thorough testing at each phase.