import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://tegemenozyurek.github.io/deutschMitVildan/
const pagesBase = '/deutschMitVildan/'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? pagesBase : '/',
  plugins: [react(), tailwindcss()],
}))
