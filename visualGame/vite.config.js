import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/Colour-FlipGame/', // Must match your GitHub repository name exactly
});