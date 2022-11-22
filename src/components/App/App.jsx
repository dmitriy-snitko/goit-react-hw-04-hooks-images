import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header, Searchbar, ImageGallery } from 'components';
import { StyledApp } from './App.styled.js';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <StyledApp>
      <Header>
        <Searchbar onSearch={setSearchQuery} />
      </Header>
      <ImageGallery query={searchQuery} />
      <ToastContainer />
    </StyledApp>
  );
};
