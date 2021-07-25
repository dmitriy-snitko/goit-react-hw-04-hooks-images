import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay, Button } from './Modal.styles';
import { IoClose } from 'react-icons/io5';
import { Spiner } from '../Spiner/Spiner';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
    selectedImage: PropTypes.objectOf(PropTypes.string),
  };

  state = {
    isImageLoaded: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = e => {
    const { onModalClose } = this.props;

    if (e.target !== e.currentTarget) {
      return;
    }

    onModalClose();
  };

  handleKeyDown = e => {
    const { onModalClose } = this.props;

    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  onImageLoadet = () => {
    this.setState({
      isImageLoaded: true,
    });
  };

  render() {
    const { onModalClose, selectedImage } = this.props;
    const isImageLoaded = this.state.isImageLoaded;

    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        {!isImageLoaded && <Spiner />}
        <ModalWindow>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onLoad={this.onImageLoadet}
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
  }
}
