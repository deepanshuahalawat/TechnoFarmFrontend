import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'C:/Users/broya/OneDrive/Documents/technofarm/Backend/src/main/resources/static',
  },
})
