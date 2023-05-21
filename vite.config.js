import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// Bedanya Vite sama React yg diinstall manual
// Vite -> Plugin untuk mempermudah install
// Manual -> Lemot Loading 
