// src/scripts/pages/app.js

import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import { getAccessToken } from '../utils/auth';

class App {
  constructor({ header, content }) {
    // Menyimpan elemen utama ke properti class
    this._header = header;
    this._content = content;
    this._currentPage = null; // DITAMBAHKAN: Untuk melacak halaman yang sedang aktif
    
    // Membuat dan mengatur link "skip to content"
    this._skipLink = document.createElement('a');
    this._skipLink.href = '#main-content'; 
    this._skipLink.className = 'skip-link';
    this._skipLink.textContent = 'Skip to Content';
    
    this._skipLink.addEventListener('click', (event) => {
        event.preventDefault(); 
        const mainContent = document.getElementById('main-content'); 
        if (mainContent) {
            mainContent.focus();
        }
    });

    document.body.insertBefore(this._skipLink, this._header);
  }

  // Fungsi untuk merender header berdasarkan status login
  async renderHeader() {
    const token = getAccessToken();
  
    if (token) {
      // Jika sudah login
      this._header.innerHTML = `
        <div class="main-header">
          <h1 class="brand-name"><a href="#/">Story App</a></h1>
          <nav class="desktop-nav" aria-label="Main Navigation">
            <ul>
              <li><a href="#/">Home</a></li>
              <li><a href="#/add">Add Story</a></li>
              <li><a href="#/logout">Logout</a></li>
            </ul>
          </nav>
        </div>
      `;
    } else {
      // Jika belum login
      this._header.innerHTML = `
        <div class="main-header">
          <h1 class="brand-name"><a href="#/">Story App</a></h1>
          <nav class="desktop-nav" aria-label="Main Navigation">
            <ul>
              <li><a href="#/login">Login</a></li>
              <li><a href="#/register">Register</a></li>
            </ul>
          </nav>
        </div>
      `;
    }
  }
  
  // Fungsi untuk merender halaman sesuai URL
  async renderPage() {
    // DITAMBAHKAN: Panggil unmount pada halaman LAMA sebelum merender halaman BARU
    if (this._currentPage && typeof this._currentPage.unmount === 'function') {
      this._currentPage.unmount();
    }

    const token = getAccessToken();
    const url = UrlParser.parseActiveUrlWithCombiner();

    let page;

    if (url === '/login' || url === '/register') {
      page = routes[url];
    } else if (token) {
      page = routes[url] || routes['/'];
    } else {
      page = routes['/login'];
    }

    if (page) {
      document.startViewTransition(async () => {
        this._content.innerHTML = await page.render();
        await page.afterRender();
      });
    } else {
      // Untuk halaman 404
      page = routes['/404'];
      document.startViewTransition(async () => {
        this._content.innerHTML = await page.render();
        await page.afterRender();
      });
    }
    
    // DITAMBAHKAN: Simpan halaman BARU sebagai halaman saat ini
    this._currentPage = page;
    
    await this.renderHeader();
  }
}

export default App;