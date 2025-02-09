import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
            '@common': fileURLToPath(new URL('./src/common', import.meta.url)),
            '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
            '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
        },
    },
    // SCSS 전역 사용
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/common/styles/main.scss";`,
            },
        },
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    preview: {
        port: 3000,
        host: true
    }
})
