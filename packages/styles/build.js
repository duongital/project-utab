import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWatch = process.argv.includes('--watch');

async function buildCSS() {
  try {
    console.log('Building TailwindCSS...');
    
    // Read input CSS
    const inputCSS = readFileSync(join(__dirname, 'src/input.css'), 'utf8');
    
    // Load Tailwind config with absolute paths
    const configPath = join(__dirname, 'tailwind.config.js');
    const { default: config } = await import(`${configPath}?v=${Date.now()}`);
    
    // Expand glob patterns to actual files
    const contentFiles = [];
    for (const pattern of config.content) {
      if (!pattern.startsWith('!')) {
        const fullPattern = join(__dirname, pattern);
        const matchedFiles = await glob(fullPattern, { 
          ignore: ['**/node_modules/**', '**/dist/**']
        });
        contentFiles.push(...matchedFiles);
      }
    }
    
    console.log(`🔍 Found ${contentFiles.length} files to scan`);
    
    // Use expanded file list for content
    const resolvedConfig = {
      ...config,
      content: contentFiles
    };
    
    // Process CSS with PostCSS and TailwindCSS
    const result = await postcss([tailwindcss(resolvedConfig)])
      .process(inputCSS, { from: 'src/input.css', to: 'dist/index.css' });
    
    // Ensure dist directory exists
    const distDir = join(__dirname, 'dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    
    // Write output
    writeFileSync(join(__dirname, 'dist/index.css'), result.css);
    console.log('✅ Built dist/index.css');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

async function watchAndBuild() {
  if (!isWatch) {
    await buildCSS();
    return;
  }
  
  // Dynamic import for chokidar only when watching
  const { default: chokidar } = await import('chokidar');
  
  console.log('Watching for changes...');
  
  // Watch for changes in source files and tsx/jsx files across monorepo
  const watcher = chokidar.watch([
    'src/**/*.css',
    'tailwind.config.js',
    '../../apps/*/src/**/*.{tsx,jsx,ts,js}',
    '../../packages/*/src/**/*.{tsx,jsx,ts,js}'
  ], {
    ignored: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**'
    ],
    persistent: true
  });

  watcher.on('change', async (path) => {
    console.log(`File changed: ${path}`);
    await buildCSS();
  });
  
  // Build once on start
  await buildCSS();
}

watchAndBuild();