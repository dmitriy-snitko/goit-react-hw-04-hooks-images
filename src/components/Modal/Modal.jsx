import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay, Button } from './Modal.styles';
import { Spiner } from '../Spiner/Spiner';
import { IoClose } from 'react-icons/io5';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal-root');

export const Modal = ({ onModalClose, selectedImage }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    onModalClose();
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      {!isImageLoaded && <Spiner />}
      <ModalWindow>
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          onLoad={() => setIsImageLoaded(true)}
        />
        {isImageLoaded && (
          <Button onClick={onModalClose}>
            <IoClose size="30" />
          </Button>
        )}
      </ModalWindow>
    </Overlay>,
    ModalRoot,
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  selectedImage: PropTypes.objectOf(PropTypes.string),
};
