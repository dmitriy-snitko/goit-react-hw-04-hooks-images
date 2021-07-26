import blankImage from '../../images/loading.jpg';
import { useState } from 'react';
import { Image } from './ImageGalleryItem.styles';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, onImageSelect }) => {
  const [src, setSrc] = useState(blankImage);

  return (
    <li>
      <Image
        src={src}
        alt={tags}
        onLoad={() => {
          setSrc(webformatURL);
        }}
        onClick={onImageSelect}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func.isRequired,
};
