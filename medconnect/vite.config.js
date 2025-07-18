import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allow access from all networks
    port: 5173,       // Or change to a different port
    strictPort: true, // Prevents random port changes
  },
  
})
