import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // LÄGG TILL DENNA
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/TengnerDev/', 
  plugins: [
    react(), // LÄGG TILL DENNA
    tailwindcss(),
    
  ],
})