import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const FIGMA_ASSET_PREFIX = 'figma:asset/'
const FIGMA_VIRTUAL_PREFIX = '\0figma-asset:'

const PLACEHOLDER_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

function figmaAssetPlugin(): Plugin {
  let isBuild = false

  return {
    name: 'figma-asset',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    resolveId(id) {
      if (id.startsWith(FIGMA_ASSET_PREFIX)) {
        return FIGMA_VIRTUAL_PREFIX + id.slice(FIGMA_ASSET_PREFIX.length)
      }
      return undefined
    },
    load(id) {
      if (!id.startsWith(FIGMA_VIRTUAL_PREFIX)) return undefined
      const filename = id.slice(FIGMA_VIRTUAL_PREFIX.length)
      const filePath = path.join(rootDir, 'src', 'assets', filename)

      if (!fs.existsSync(filePath)) {
        return `export default ${JSON.stringify(PLACEHOLDER_PNG)}`
      }

      if (isBuild) {
        const source = fs.readFileSync(filePath)
        const refId = this.emitFile({ type: 'asset', name: filename, source })
        return `export default import.meta.ROLLUP_FILE_URL_${refId}`
      }

      const absolute = path.resolve(filePath).replace(/\\/g, '/')
      return `export default ${JSON.stringify('/@fs/' + absolute)}`
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    figmaAssetPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(rootDir, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})