import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      //whenever we get /api set it to localhost
      '/api':{
        target: 'http://localhost:3000', 
        secure: false,

      },
    },
  },
  plugins: [react()],
})
