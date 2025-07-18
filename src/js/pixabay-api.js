import axios from 'axios';
import { createGallery, hideLoader } from './render-functions';
import iziToast from 'izitoast';
import iconError from '../public/error-icon.svg';

const apiKey = '51363683-2e56118fc156594c4f1ee220a';
axios.defaults.baseURL = `https://pixabay.com`;

export function getImageByQuery(query) {
  const formattedQuery = query.split(' ').join('+');
  axios
    .get('/api/', {
      params: {
        key: apiKey,
        q: formattedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(res => {
      return res.data.hits;
    })
    .then(hits => {
      if (!hits || hits.length === 0) {
        throw new Error('No images found');
      }

      createGallery(hits);
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#ffffff',
        iconUrl: iconError,
        iconColor: '#ffffff',
      });
    });
}
