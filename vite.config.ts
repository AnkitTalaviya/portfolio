import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/portfolio/',
  plugins: [react()],
  ssr: {
    // Bundled rather than externalised so the prerender step runs on plain Node
    // without depending on how these packages resolve their entry points.
    noExternal: ['lucide-react', 'react-router', 'react-router-dom'],
  },
}));
