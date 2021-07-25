import loading from '../../images/loading.jpg';
import { Component } from 'react';
import { Image } from './ImageGalleryItem.styles';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onImageSelect: PropTypes.func.isRequired,
  };

  state = {
    loaded: false,
  };

  onLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { webformatURL, tags, onImageSelect } = this.props;
    return (
      <li>
        <Image
          src={this.state.loaded ? webformatURL : loading}
          alt={tags}
          className="ImageGalleryItem-image"
          onLoad={this.onLoad}
          onClick={onImageSelect}
        />
      </li>
    );
  }
}
