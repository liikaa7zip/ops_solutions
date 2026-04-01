import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true, // 👈 IMPORTANT
    allowedHosts: ['ops-solutions.onrender.com'], // 👈 ADD THIS
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        mobile: resolve(__dirname, 'mobile-app.html'),
        website: resolve(__dirname, 'website-development.html'),
        product: resolve(__dirname, 'product-design.html'),
        contact: resolve(__dirname, 'contact.html'),
        order: resolve(__dirname, 'order.html'),
      },
    },
  },
});
