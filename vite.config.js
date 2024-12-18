import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
console.log('Resolved path for @:', path.resolve(__dirname, './src'));
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
        }
    },
    plugins: [vue()],
});
