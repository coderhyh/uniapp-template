import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import AutoImportTypes from './src/helper/autoImportType'
import PiniaAutoRefs from './src/helper/piniaAutoRefs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImportTypes({ dtsDir: 'src/types' }),
    PiniaAutoRefs(),
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/hooks', 'src/utils', 'src/network'],
      resolvers: [],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: 'readonly'
      }
    }),
    Components({
      dts: 'src/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue'],
      types: []
    }),
    Unocss(),
    uni()
  ],
  resolve: { alias: { '~': resolve(__dirname, 'src') } },
  server: {
    port: 3000,
    open: true,
    base: './ ',
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://echarts.apache.org/examples',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "~/assets/style/index.scss";'
      }
    }
  }
})
