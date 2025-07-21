# Monorepo Migration Plan: Web App Development Mode

## Current Development Challenges

The current browser extension development workflow has several pain points:
- Requires manual extension installation/reloading in browser
- Limited debugging capabilities compared to web apps
- Slower iteration cycles due to extension reload process
- Difficulty testing cross-browser compatibility
- Complex manifest file management
- Hot module replacement (HMR) limitations in extension context

## Proposed Monorepo Structure

```
  utab/
  ├── packages/
  │   ├── core/                    # Shared TLDraw logic and widgets
  │   │   ├── src/
  │   │   │   ├── widgets/         # CardShape, Sticker widgets
  │   │   │   ├── utils/           # Shared utilities
  │   │   │   ├── types/           # TypeScript definitions
  │   │   │   └── components/      # Reusable React components
  │   │   └── package.json
  │   │
  │   ├── web-app/                 # Development web application
  │   │   ├── src/
  │   │   │   ├── pages/
  │   │   │   │   ├── index.tsx    # Main TLDraw interface
  │   │   │   │   └── demo/        # Demo/testing pages
  │   │   │   ├── dev-tools/       # Development utilities
  │   │   │   └── mock/            # Browser API mocks
  │   │   ├── vite.config.ts
  │   │   └── package.json
  │   │
  │   ├── browser-extension/       # Current extension code (refactored)
  │   │   ├── src/
  │   │   │   ├── pages/           # Extension-specific pages
  │   │   │   ├── background/      # Extension background script
  │   │   │   └── content/         # Content scripts
  │   │   ├── manifest.json
  │   │   ├── vite.config.chrome.ts
  │   │   ├── vite.config.firefox.ts
  │   │   └── package.json
  │   │
  │   └── shared-config/           # Shared tooling configuration
  │       ├── eslint.config.js
  │       ├── tsconfig.json
  │       ├── tailwind.config.js
  │       └── vite.config.base.ts
  │
  ├── apps/                        # Optional: Future applications
  │   └── docs/                    # Documentation site
  │
  ├── tools/                       # Build and development tools
  │   ├── build-scripts/
  │   └── dev-tools/
  │
  └── package.json                 # Root package.json with workspaces
```

## Implementation Plan

### Phase 1: Extract Core Logic
1. **Create `packages/core` package**
   - Extract TLDraw widgets (CardShape, Sticker) from current newtab implementation
   - Move shared utilities, types, and React components
   - Create abstraction layer for browser-specific APIs

2. **Establish shared configuration**
   - Move common Vite, TypeScript, ESLint configurations to `packages/shared-config`
   - Create base configurations that can be extended by specific packages

### Phase 2: Create Web App Development Environment
1. **Build `packages/web-app`**
   - Create standard React app with Vite
   - Import and use core TLDraw functionality
   - Implement browser API mocks for extension-specific features
   - Add development-only features:
     - Component playground
     - Widget testing interface
     - State debugging tools
     - Performance monitoring

2. **Development Features**
   - **Hot Module Replacement**: Full HMR support for rapid iteration
   - **Browser DevTools**: Complete access to React DevTools, debugging
   - **Mock APIs**: Simulate extension APIs (storage, tabs, etc.)
   - **Testing Environment**: Easy unit and integration testing setup
   - **State Persistence**: localStorage simulation of extension storage

### Phase 3: Refactor Browser Extension
1. **Migrate to `packages/browser-extension`**
   - Refactor current extension to use core package
   - Minimize extension-specific code
   - Maintain all current functionality
   - Ensure feature parity with web app development mode

2. **Extension-specific adaptations**
   - Manifest file management
   - Background script handling
   - Content script integration
   - Permission management

### Phase 4: Development Workflow Integration
1. **Unified Development Commands**
   ```bash
   # Web app development (primary development mode)
   pnpm dev:web
   
   # Extension development (testing in browser)
   pnpm dev:chrome
   pnpm dev:firefox
   
   # Build all packages
   pnpm build:all
   
   # Test across all packages
   pnpm test:all
   ```

2. **Cross-package Development**
   - Workspace linking for real-time core package changes
   - Shared dependency management
   - Coordinated versioning strategy

## Benefits of This Approach

### Development Experience
- **Faster Iteration**: Web app HMR vs extension reload cycles
- **Better Debugging**: Full browser DevTools access
- **Easier Testing**: Standard web testing frameworks and tools
- **Component Development**: Isolated widget development and testing

### Code Quality
- **Separation of Concerns**: Core logic separated from platform specifics
- **Reusability**: Core package can be used for future web apps
- **Maintainability**: Cleaner architecture with defined boundaries
- **Testing**: Easier to unit test core functionality

### Deployment Flexibility
- **Multiple Targets**: Same core code for extension and potential web app
- **Platform Independence**: Easier to support additional browsers
- **Future-proofing**: Foundation for web-based version of the tool

## Success Metrics

- Development cycle time reduction (target: 50% faster iteration)
- Easier onboarding for new developers
- Improved test coverage due to better testing capabilities
- Reduced bugs in production through better development tooling
- Foundation established for future platform expansion