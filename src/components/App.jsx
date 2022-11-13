import { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll/modules';
import { Button } from './Button/Button';
import { Message } from './Message/Message';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { ModalWindow } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchAPI } from './Api/fetchApi';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVE: 'resolve',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    images: [],
    inputValue: '',
    currentPage: 1,
    modalImage: '',
    showModal: false,
    status: Status.IDLE,
    totalHits: '',
  };

  getInputValue = inputValue => {
    this.setState({
      inputValue: inputValue,
      images: [],
      currentPage: 1,
    });
  };

   componentDidUpdate(prevProps, prevState) {
    const { inputValue, currentPage } = this.state;

    if (this.props.inputValue === '') {
      return;
    }

    if (
      prevState.inputValue !== inputValue ||
      prevState.currentPage !== currentPage
    ) {
      if (currentPage === 1) {
        this.setState({ status: Status.PENDING });
      }
      this.fetchImages();

      if (currentPage > 1) {
        scroll.scrollToBottom();
      }
    }
  }

  async fetchImages() {
    const { inputValue, currentPage } = this.state;
    this.setState({
      status: Status.PENDING,
    });
    try {
      let { hits, totalHits } = await fetchAPI(inputValue, currentPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits: totalHits,
        status: Status.RESOLVE,
      }));
    } catch (error) {
      this.setState({ status: Status.REJECTED });
    }
  }

  handleIncrementPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  getLargeImgUrl = url => {
    this.toggleModal();
    this.setState({ modalImg: url });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, status, images, modalImg, totalHits, currentPage } =
      this.state;
    const endOfHits = currentPage * 12 >= totalHits;

    return (
      <div>
        <SearchBar onSearch={this.getInputValue} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.getLargeImgUrl} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'resolve' && !endOfHits && (
          <Button text={'Load more'} onClick={this.handleIncrementPage} />
        )}
        {images.length === 0 && status === 'resolve' && (
          <Message text={'No images was found'} />
        )}
        {status === 'rejected' && <Message text={'Something went wrong'} />}
        {showModal && (
          <ModalWindow onClose={this.toggleModal} largeImage={modalImg} />
        )}
      </div>
    );
  }
}


//export const App = () => {
 // return (
    //<div
      //style={{
        //height: '100vh',
        //display: 'flex',
        //justifyContent: 'center',
        //alignItems: 'center',
        //fontSize: 40,
        //color: '#010101'
      //}}
    //>
      //React homework template
    //</div>
  //);
//};
