// src/scripts/pages/auth/register/register-page.js
import * as Api from '../../../data/api';
import RegisterPresenter from './register-presenter';

const RegisterPage = {
  _presenter: null,

  async render() {
    return `
      <section class="auth-container">
        <h2>Daftar Akun</h2>
        <form id="register-form" class="auth-form">
          <label for="name">Nama Lengkap</label>
          <input type="text" id="name" required placeholder="Nama Anda" />

          <label for="email">Email</label>
          <input type="email" id="email" required placeholder="Contoh: nama@email.com" />

          <label for="password">Password</label>
          <input type="password" id="password" required placeholder="Minimal 6 karakter" autocomplete="new-password" />

          <div id="submit-button-container">
            <button type="submit" class="btn">Daftar</button>
          </div>
        </form>
        <div id="auth-message"></div>
        <p>Sudah punya akun? <a href="#/login">Login</a></p>
      </section>
    `;
  },

  async afterRender() {
    this._presenter = new RegisterPresenter({
      view: this,
      model: Api,
    });
    this._setupForm();
  },

  _setupForm() {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        password: document.getElementById('password')?.value || '',
      };
      await this._presenter.getRegistered(data);
    });
  },

  registeredSuccessfully(message) {
    const msgBox = document.getElementById('auth-message');
    if (msgBox) {
      msgBox.innerHTML = `<p style="color:green">${message}</p>`;
    }
  
    setTimeout(() => {
      location.hash = '/login'; // redirect otomatis ke login setelah 1.5 detik
    }, 1500);
  },
  
  registeredFailed(message) {
    const msgBox = document.getElementById('auth-message');
    if (msgBox) {
      msgBox.innerHTML = `<p style="color:red">${message}</p>`;
    }
  },

  showSubmitLoadingButton() {
    const container = document.getElementById('submit-button-container');
    if (container) {
      container.innerHTML = `
        <button class="btn" type="submit" disabled>
          <i class="fas fa-spinner loader-button"></i> Mendaftar...
        </button>
      `;
    }
  },

  hideSubmitLoadingButton() {
    const container = document.getElementById('submit-button-container');
    if (container) {
      container.innerHTML = `
        <button class="btn" type="submit">Daftar</button>
      `;
    }
  },
};

export default RegisterPage;
