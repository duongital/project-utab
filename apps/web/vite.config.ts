import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
    react(),
  ],
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 3000,
    open: true
  }
})