// src/scripts/pages/home/home-page.js

import StorySource from '../../data/story-model';
import HomePagePresenter from './home-presenter';
import L from 'leaflet';
import { getAccessToken } from '../../utils/auth';

// Perbaikan ikon Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const HomePage = {
  _map: null,

  async render() {
    return `
      <section class="map-container">
        <h2>Lokasi Cerita</h2>
        <div id="map" style="height: 450px; width: 100%;"></div>
      </section>
      <section id="mainContent" class="stories-container">
        <h2>Daftar Cerita</h2>
        <div id="stories-list" class="stories-list"></div>
      </section>
    `;
  },

  async afterRender() {
    const storiesListContainer = document.getElementById('stories-list');
    
    // PERBAIKAN: Pindahkan inisialisasi Presenter ke dalam blok if
    if (!getAccessToken()) {
        if (storiesListContainer) {
            storiesListContainer.innerHTML = '<p class="info-message">Anda harus <a href="#/login">login</a> untuk melihat cerita.</p>';
        }
        return; // Hentikan eksekusi lebih lanjut
    }

    // Jika token ada, baru inisialisasi Presenter dan ambil data
    const presenter = new HomePagePresenter({
      view: this,
      model: StorySource,
    });
    
    await presenter.showStoriesOnPage();
  },

  showLoading() {
    const container = document.getElementById('stories-list');
    if (container) {
      container.innerHTML = `<p>Loading...</p>`;
    }
  },

  hideLoading() {
    // Biarkan kosong atau tambahkan logika lain jika diperlukan
  },

  renderStories(stories) {
    const storiesListContainer = document.getElementById('stories-list');
    if (!storiesListContainer) return;

    storiesListContainer.innerHTML = '';
    if (stories.length === 0) {
      storiesListContainer.innerHTML = `<p>Belum ada cerita yang ditambahkan.</p>`;
      return;
    }

    stories.forEach((story) => {
      storiesListContainer.innerHTML += `
        <article class="story-item">
          <img class="story-item__image" src="${story.photoUrl}" alt="Foto cerita dari ${story.name}">
          <div class="story-item__content">
            <h3 class="story-item__name">${story.name}</h3>
            <p class="story-item__description">${story.description}</p>
            <p class="story-item__date">Dibuat pada: ${new Date(story.createdAt).toLocaleDateString()}</p>
          </div>
        </article>
      `;
    });

    this.initMap(stories);
  },

  renderError(message) {
    const container = document.getElementById('stories-list');
    if (container) {
      container.innerHTML = `<p class="error-message">Gagal memuat cerita: ${message}</p>`;
    }
  },

  initMap(stories) {
    if (this._map) {
      this._map.remove();
      this._map = null;
    }

    setTimeout(() => {
      const map = L.map('map').setView([-2.548926, 118.0148634], 5);
      this._map = map;

      const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });

      const googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: 'Map data &copy; Google Maps',
      });

      openStreetMap.addTo(map);

      const baseMaps = {
        "Street Map": openStreetMap,
        "Satellite": googleSatellite,
      };

      L.control.layers(baseMaps).addTo(map);

      stories.forEach((story) => {
        if (story.lat && story.lon) {
          const marker = L.marker([story.lat, story.lon]).addTo(map);
          marker.bindPopup(`<b>${story.name}</b><br>${story.description.substring(0, 30)}...`);
        }
      });
    }, 0);
  },
};

export default HomePage;
