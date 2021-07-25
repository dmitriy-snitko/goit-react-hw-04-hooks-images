import PropTypes from 'prop-types';
import { LoadMore } from './Button.styles';

export const Button = ({ onLoadMore }) => {
  return (
    <LoadMore onClick={onLoadMore} type="button" className="Button">
      Load More
    </LoadMore>
  );
};

Button.prototype = {
  onLoadMore: PropTypes.func.isRequired,
};
