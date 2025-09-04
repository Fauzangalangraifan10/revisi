// src/scripts/index.js

import 'regenerator-runtime';
import 'leaflet/dist/leaflet.css';
import '../styles/styles.css';
import App from './pages/app.js';

window.addEventListener('DOMContentLoaded', () => {
  const app = new App({
    header: document.getElementById('app-header'),
    content: document.getElementById('main-content'),
  });

  // Event listener ini akan memicu aplikasi untuk merender ulang 
  // setiap kali URL hash berubah.
  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  // Memuat halaman pertama kali saat aplikasi dimuat
  app.renderPage();
});