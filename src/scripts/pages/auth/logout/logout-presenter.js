// src/scripts/pages/auth/logout/logout-presenter.js (Versi yang BENAR)

import StoryModel from '../../../data/story-model';

class LogoutPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }

  async handleLogout() {
    try {
      await this._model.logout();
      this._view.showMessage('Anda berhasil logout.');
      this._view.redirectToLogin();
    } catch (error) {
      this._view.showError(error.message);
    }
  }
}

export default LogoutPresenter;