import axios from 'axios';
const API_KEY = '21149088-9f5924478b20a01769fc809e0';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return data.hits;
};

export default getImages;
