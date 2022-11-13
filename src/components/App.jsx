import { useState, useEffect } from 'react';
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

export const App = () => {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState('');

  const getInputValue = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (inputValue === '') {
      return;
    }

    currentPage === 1 ? setStatus(Status.PENDING) : scroll.scrollToBottom();

    (async function fetchImages() {
      setStatus(Status.PENDING);
      try {
        let { hits, totalHits } = await fetchAPI(inputValue, currentPage);
        setImages(image => [...image, ...hits]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVE);
      } catch (error) {
        alert();
      }
    })();
  }, [currentPage, inputValue]);

  const handleIncrementCurrentPage = () => {
    setCurrentPage(page => page + 1);
  };

  const getLargeImgUrl = url => {
    toggleModal();
    setModalImg(url);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const endOfHits = currentPage * 12 >= totalHits;

  return (
    <div>
      <SearchBar onSearch={getInputValue} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={getLargeImgUrl} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolve' && !endOfHits && (
        <Button text={'Load more'} onClick={handleIncrementCurrentPage} />
      )}
      {images.length === 0 && status === 'resolve' && (
        <Message text={'No images was found'} />
      )}
      {status === 'rejected' && <Message text={'Something went wrong'} />}
      {showModal && <ModalWindow onClose={toggleModal} largeImage={modalImg} />}
    </div>
  );
};
