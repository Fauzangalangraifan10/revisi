// src/scripts/pages/auth/logout/logout-page.js

import LogoutPresenter from './logout-presenter';
import StoryModel from '../../../data/story-model'; // DITAMBAHKAN: Impor StoryModel

const LogoutPage = {
  _presenter: null,

  async render() {
    return `
      <div class="logout-container">
        <p id="logout-message">Logging out...</p>
      </div>
    `;
  },

  async afterRender() {
    // DIPERBAIKI: Berikan 'model: StoryModel' saat membuat presenter
    this._presenter = new LogoutPresenter({ 
      view: this,
      model: StoryModel, 
    });
    this._presenter.handleLogout();
  },

  showMessage(message) {
    const msgBox = document.getElementById('logout-message');
    if (msgBox) msgBox.innerText = message;
  },

  showError(error) {
    const msgBox = document.getElementById('logout-message');
    if (msgBox) msgBox.innerText = `Logout gagal: ${error}`;
  },

  redirectToLogin() {
    // Menggunakan window.location.hash untuk konsistensi
    window.location.hash = '#/login';
  },
};

export default LogoutPage;