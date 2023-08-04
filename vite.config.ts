import uni from '@dcloudio/vite-plugin-uni'
import { AutoImportType, AutoUpdatePages, HyhToolkitResolvers, PiniaAutoRefs } from 'hyh-toolkit/lib/vite'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    AutoImportType(),
    PiniaAutoRefs(),
    AutoUpdatePages(),
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/hooks', 'src/utils', 'src/network'],
      resolvers: [HyhToolkitResolvers()],
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
