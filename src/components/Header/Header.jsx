import { Box } from 'components';

export const Header = ({ children }) => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="64px"
      px="24px"
      py="12px"
      bg="#3f51b5"
      boxShadow="0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    >
      {children}
    </Box>
  );
};
