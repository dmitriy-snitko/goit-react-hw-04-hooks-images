import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from 'api/ImageGalleryService.js';
import { LoadMoreBtn, Loader, Overlay, Modal, Box } from 'components';
import { Gallery, Item, Image } from './ImageGallery.styled.js';

const api = new API({
  key: '21149088-9f5924478b20a01769fc809e0',
  perPage: 20,
});

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstNewImageId, setFirstNewImageId] = useState(null);

  useEffect(() => {
    if (query === '') return;
    if (query !== api.query) reset();
    api.query = query;
    fetchImages();
  }, [query]);

  useEffect(() => {
    if (api.page <= 2) return;
    document
      .getElementById(`${firstNewImageId}`)
      .scrollIntoView({ behavior: 'smooth' });
  }, [firstNewImageId]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const images = await api.fetchImages();
      if (images.length === 0) {
        return toast.info(`No results were found for ${api.query}`);
      }
      setImages(s => [...s, ...images]);
      setFirstNewImageId(images[0].id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = img => {
    setSelectedImage(img);
    document.addEventListener('keydown', handleKeyDown);
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const reset = () => {
    api.page = 1;
    setImages([]);
  };

  return (
    <Box
      display="grid"
      gridTemplateRows="1fr"
      gridGap="16px"
      height="calc(100vh - 106px)"
      overflowY="scroll"
    >
      <Gallery>
        {images.map(img => (
          <Item key={img.id} id={img.id}>
            <Image
              src={img.webformatURL}
              alt={img.tags}
              onClick={() => openModal(img)}
            />
          </Item>
        ))}
      </Gallery>
      {images.length !== 0 && (
        <LoadMoreBtn onClick={() => fetchImages()}>Load More</LoadMoreBtn>
      )}
      {selectedImage && (
        <Overlay closeModal={closeModal}>
          <Modal img={selectedImage} />
        </Overlay>
      )}
      {isLoading && <Loader />}
    </Box>
  );
};
