import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: '.', 
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'public/index.html'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css'
          }
          return assetInfo.name || 'asset'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
  },
  plugins: [
    {
      name: 'preserve-inline-markers',
      transformIndexHtml(html) {
        // Add data-inline="true" to CSS link
        html = html.replace(
          /<link[^>]*href=["']\/?styles\.css["'][^>]*>/i,
          '<link rel="stylesheet" href="styles.css" data-inline="true">'
        )

        // Add data-inline="true" to JS script
        html = html.replace(
          /<script[^>]*src=["']\/?main\.js["'][^>]*><\/script>/i,
          '<script src="main.js" data-inline="true"></script>'
        )

        return html
      },
    },
  ],
})
