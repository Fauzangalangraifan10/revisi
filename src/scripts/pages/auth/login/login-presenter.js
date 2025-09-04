// src/scripts/pages/auth/login/login-presenter.js

import StoryModel from '../../../data/story-model';

class LoginPresenter {
  constructor({ view }) {
    this._view = view;
  }

  async handleLogin({ email, password }) {
    try {
      this._view.showLoading();
      await StoryModel.login({ email, password });
      
      // PERBAIKAN: Panggil fungsi gabungan dari view
      this._view.showSuccessAndRedirect('Login berhasil!');

    } catch (error) {
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default LoginPresenter;