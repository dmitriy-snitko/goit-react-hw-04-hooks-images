import { Box } from 'components/index.js';
import { Button } from './LoadMoreBtn.styled.js';

export const LoadMoreBtn = ({ children, onClick }) => {
  return (
    <Box m="0 auto">
      <Button onClick={() => onClick()}>{children}</Button>
    </Box>
  );
};
