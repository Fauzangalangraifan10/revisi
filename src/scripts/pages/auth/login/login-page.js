// src/scripts/pages/auth/login/login-page.js
import LoginPresenter from './login-presenter';
import * as Api from '../../../data/api'; // Pastikan Anda mengimpor api.js

const LoginPage = {
  async render() {
    return `
      <section class="auth-container">
        <h2>Login</h2>
        <form id="login-form" class="auth-form">
          <label for="email">Email</label>
          <input type="email" id="email" required autocomplete="username" />

          <label for="password">Password</label>
          <input type="password" id="password" required autocomplete="current-password" />

          <button type="submit" class="btn">Login</button>
        </form>
        <div id="auth-message"></div>
        <p>Belum punya akun? <a href="#/register">Daftar</a></p>
      </section>
    `;
  },

  async afterRender() {
    // Perbaikan: Meneruskan Model (API) ke Presenter
    const presenter = new LoginPresenter({
      view: this,
      model: Api,
    });
    const form = document.getElementById('login-form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      presenter.handleLogin({ email, password });
    });
  },

  showLoading() {
    document.getElementById('auth-message').innerHTML = 'Loading...';
  },
  hideLoading() {
    document.getElementById('auth-message').innerHTML = '';
  },
  showError(msg) {
    document.getElementById('auth-message').innerHTML = `<p style="color:red">${msg}</p>`;
  },

  // Metode baru untuk menampilkan sukses dan melakukan redirect
  showSuccessAndRedirect(msg) {
    this.showSuccess(msg);
    setTimeout(() => {
      location.hash = '/'; // Mengarahkan ke halaman utama setelah jeda
    }, 500); // Jeda 500ms agar pesan terlihat
  },

  showSuccess(msg) {
    document.getElementById('auth-message').innerHTML = `<p style="color:green">${msg}</p>`;
  },
};

export default LoginPage;