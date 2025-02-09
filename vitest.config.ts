import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      // '@components': path.resolve(__dirname, './src/components'),
      // '@assets': path.resolve(__dirname, './src/assets'),
      // '@store': path.resolve(__dirname, './src/store'),
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@common': path.resolve(__dirname, './src/common'),
      '@config': path.resolve(__dirname, './src/config'),
      '@app': path.resolve(__dirname, './src/app'),
    },
  },
})
