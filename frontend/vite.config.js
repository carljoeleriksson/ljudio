import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [reactRefresh()],
   server: {
      proxy: {
         // must be same port as backend
         '/api/': 'http://localhost:8000',
      },
   },
});
