import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.BASE_URL ?? undefined
if (typeof base !== 'undefined') console.debug('vite: using basename from BASE_URL', base)

export default defineConfig({
  base,
  plugins: [
    tailwindcss(),
  ],
})
