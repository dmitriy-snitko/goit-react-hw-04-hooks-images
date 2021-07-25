import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styles';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onImageSelect }) => {
  return (
    <Gallery>
      {images.map(img => (
        <ImageGalleryItem
          key={img.webformatURL}
          webformatURL={img.webformatURL}
          tags={img.tags}
          onImageSelect={() => onImageSelect(img.largeImageURL, img.tags)}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.prototype = {
  images: PropTypes.array.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};
