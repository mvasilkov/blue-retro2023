import glsl from 'vite-plugin-glsl'
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'


let colors = [
  'background',
  'darkblue',
  'light',
  'lightblue',
  'red',
  'darkred',
  'green',
  'purple'
]

export default defineConfig({
  base: './',
  plugins: [glsl(), viteImagemin({
    optipng: { optimizationLevel: 7 }
  })],
  build: {
    minify: 'terser',
    terserOptions: {
      mangle: {
        module: true,
        properties: {
          //debug: true,
          keep_quoted: 'strict',
          reserved: [...['make', 'current_frame', '_current_frame', 'ticks_per_second', '__elapsed', 'hline', 'vline', 'seconds', 'hex', 'css', 'h', 'lerp', '_music_onoff'], ...colors]
        }
      }
    },
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].min.js',
      }
    }
  }
})
