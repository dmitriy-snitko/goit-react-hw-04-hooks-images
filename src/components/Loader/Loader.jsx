import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
      <ThreeDots
        height="180"
        width="180"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
      />
  );
};
