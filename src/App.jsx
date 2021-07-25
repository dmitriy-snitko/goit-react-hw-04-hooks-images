import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Button } from './components/Button/Button';
import { Spiner } from './components/Spiner/Spiner';
import { Modal } from './components/Modal/Modal';
import getImages from './service/api';
import { ToastContainer } from 'react-toastify';
import { notFound } from './service/notifications';
import { Container } from './App.styles';

export class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    showModal: false,
    selectedImage: null,
    status: 'idel',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      try {
        const images = await getImages(searchQuery, page);

        if (!images.length) {
          this.setState({ status: 'idel' });
          notFound(searchQuery);
          throw new Error();
        }

        if (searchQuery === '') {
          this.setState({ status: 'idel' });
          throw new Error();
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolve',
        }));

        page > 1 &&
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
      } catch (error) {
        console.error();
      }
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }

    this.setState({ images: [], page: 1 });
    this.setState({ searchQuery });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageSelect = (src, alt) => {
    this.setState({
      selectedImage: { src, alt },
      showModal: true,
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, status, showModal } = this.state;

    if (status === 'idel') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
        </Container>
      );
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} />
          {images.length > 0 && <Button onLoadMore={this.onLoadMore} />}
          <Spiner />
        </Container>
      );
    }

    if (status === 'resolve') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onImageSelect={this.onImageSelect} />
          <Button onLoadMore={this.onLoadMore} />
          {showModal && (
            <Modal
              onModalClose={this.onModalClose}
              selectedImage={this.state.selectedImage}
            />
          )}
        </Container>
      );
    }
  }
}

export default App;
