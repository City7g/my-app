import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { bundleSizePlugin } from './src/config/bundleSize'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
    }),
    vueDevTools(),
    bundleSizePlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
