import Loader from 'react-loader-spinner';
import { LoaderContainer } from './Spiner.styles';

export const Spiner = () => {
  return (
    <LoaderContainer>
      <Loader
        type="Oval"
        color="#3f51b5"
        height={150}
        width={150}
        timeout={3000}
      />
    </LoaderContainer>
  );
};
