import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Copy public files to dist
import { cpSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'

function copyPublic() {
  const src = path.resolve(__dirname, 'public')
  const dest = path.resolve(__dirname, 'dist')
  
  const walk = (s: string, d: string) => {
    if (!existsSync(d)) mkdirSync(d, { recursive: true })
    for (const f of readdirSync(s)) {
      const ss = path.join(s, f)
      const dd = path.join(d, f)
      statSync(ss).isDirectory() ? walk(ss, dd) : cpSync(ss, dd)
    }
  }
  if (existsSync(src)) walk(src, dest)
}

export default defineConfig({
  plugins: [
    react(),
    { closeBundle() { copyPublic() } }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: { port: 3000 },
})