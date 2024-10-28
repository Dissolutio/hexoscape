import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    },
},
build: {
  rollupOptions: {
    output: {
      manualChunks: {
      lodash: ['lodash'],
      three: ['three'],
    }
  }
  },
},
  plugins: [react()],
})
