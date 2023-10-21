import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import { resolve } from 'path';

const cssFileName = 'index.min.css';
// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), mkcert()],
  publicDir: './public',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
});
