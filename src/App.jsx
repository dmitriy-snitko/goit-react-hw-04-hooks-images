import { useState, useEffect } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Spiner } from './components/Spiner/Spiner';
import { Modal } from './components/Modal/Modal';
import getImages from './service/api';
import { ToastContainer } from 'react-toastify';
import { notFound } from './service/notifications';
import { Container } from './App.styles';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState('idel');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function onFetchImages() {
      try {
        setStatus('pending');
        const images = await getImages(searchQuery, page);

        if (!images.length) {
          setStatus('idel');
          notFound(searchQuery);
          throw new Error(`No results were found for ${searchQuery}`);
        }

        if (!searchQuery) {
          setStatus('idel');
          throw new Error('');
        }

        setImages(s => [...s, ...images]);
        setStatus('resolve');

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      } catch (error) {
        console.log(error.message);
      }
    }

    onFetchImages();
  }, [page, searchQuery]);

  const handleFormSubmit = searchQuery => {
    setImages([]);
    setPage(1);
    setSearchQuery(searchQuery);
  };

  const onLoadMore = () => setPage(s => s + 1);

  const onModalOpen = (src, alt) => {
    setSelectedImage({ src, alt });
    setShowModal(true);

    window.addEventListener('keydown', handleKeyDown);
  };

  const onModalClose = () => {
    setShowModal(false);

    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {(status === 'resolve' || status === 'pending') && (
        <ImageGallery images={images} onImageSelect={onModalOpen} />
      )}
      {images.length > 0 && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal onModalClose={onModalClose} selectedImage={selectedImage} />
      )}
      {status === 'pending' && <Spiner />}
      <ToastContainer />
    </Container>
  );
}
