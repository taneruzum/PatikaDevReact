import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//You can create .env folder, SECRET_KEY = "VALUE"
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_WEATHER_API_KEY': JSON.stringify(env.REACT_APP_WEATHER_API_KEY)
    },
    plugins: [react()],
  }
})