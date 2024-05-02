// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },

  server: {
    port: 3000,
    proxy: {
      '/send_auth_code': {
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/send_auth_code/, '/send_auth_code'),
      },
      '/profile': {
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/profile/, '/profile'),
      },
      '/verify_code': {
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/verify_code/, '/verify_code'),
      },
      '/courses': {
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/courses/, '/courses'),
      },
      '/set_name': {
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/set_name/, '/set_name'),
      },
      '/enroll':{
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/enroll/, '/enroll'),
      },
      '/enrolled_courses':{
        target: 'http://80.78.243.194:8000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/enrolled_courses/, '/enrolled_courses'),
      }
    }
  }
})
