import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

export default class GalleryApiService {
  #KEY;
  constructor({ key, page = 1, perPage = 12, imageType = 'photo' }) {
    this.#KEY = key;
    this.query = '';
    this.page = page;
    this.perPage = perPage;
    this.imageType = imageType;
  }

  async fetchImages() {
    const { data } = await axios.get(
      `/?key=${this.#KEY}` +
        `&q=${this.query}` +
        `&image_type=${this.imageType}` +
        `&page=${this.page}` +
        `&per_page=${this.perPage}`,
    );
    this.page += 1;
    return data.hits;
  }

  getKey() {
    return this.#KEY;
  }

  changeKey(newKey) {
    this.key = newKey;
  }
}
