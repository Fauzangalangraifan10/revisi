// src/scripts/pages/add/add-presenter.js

class AddPagePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model; // model diteruskan lewat constructor
  }

  onMapClick(latlng) {
    this._view.updateLocationOnMap(latlng);
  }

  async submitStory(data) {
    if (!data.description || !data.photoIsSet) {
      this._view.showValidationError('Deskripsi dan foto tidak boleh kosong!');
      return;
    }

    try {
      this._view.showLoading();

      // Memanggil model melalui instance this._model
      await this._model.addStory({
        description: data.description,
        photoBlob: data.photoBlob,
        lat: data.lat,
        lon: data.lon,
      });

      // Setelah berhasil, panggil metode redirect tanpa argumen
      this._view.showSuccessAndRedirect();
    } catch (error) {
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }
}

export default AddPagePresenter;
