// src/scripts/pages/auth/register/register-presenter.js
import { registerUser } from '../../../data/api';

export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async getRegistered({ name, email, password }) {
    this.#view.showSubmitLoadingButton();
    try {
      const response = await registerUser({ name, email, password });

      if (response.success) {
        this.#view.registeredSuccessfully(response.message || 'Registrasi berhasil!');
      } else {
        this.#view.registeredFailed(response.message || 'Registrasi gagal.');
      }
    } catch (error) {
      this.#view.registeredFailed(error.message || 'Terjadi kesalahan.');
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
}
