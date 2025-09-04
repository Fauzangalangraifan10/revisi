// src/scripts/pages/home/home-presenter.js (Setelah Diperbaiki)

// 1. Hapus impor yang tidak perlu lagi
// import { getAllStories } from '../../data/api';
// import { getAccessToken } from '../../utils/auth';

class HomePagePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
  }
  
  async showStoriesOnPage() {
    this._view.showLoading();
    try {
      // 2. Cukup panggil satu metode dari model
      // Model yang akan mengurus token dan pemanggilan API
      const stories = await this._model.getStories(); 
      
      this._view.renderStories(stories);
    } catch (error) {
      this._view.renderError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default HomePagePresenter;