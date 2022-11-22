import { Box } from 'components';
export const Overlay = ({ children, closeModal }) => {
  const handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    closeModal();
  };

  return (
    <Box
      onClick={handleOverlayClick}
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      align-items="center"
      backgroundColor="rgba(0, 0, 0, 0.8)"
      z-index="1300"
      px="7px"
      py="7px"
    >
      {children}
    </Box>
  );
};
