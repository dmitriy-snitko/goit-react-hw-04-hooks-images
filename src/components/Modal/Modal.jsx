import { Box } from 'components';
import { Img } from './Modal.styled.js';
export const Modal = ({ img }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Img src={img.largeImageURL} alt={img.tags} />
    </Box>
  );
};
