import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
  // the library is linked from a sibling checkout during local dev: keep a single React copy
  resolve: { dedupe: ['react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend', 'dayjs'] },
  server: { port: 5173 },
});
