import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  // keep a single copy of React and friends
  resolve: { dedupe: ['react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend', 'dayjs'] },
  // the server build (pre-render) bundles everything, including the library
  ssr: { noExternal: true },
  server: { port: 5173 },
});
