import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';

export function ModalWindow({ onClose, largeImage }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickBackDr = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickBackDr}>
      <Modal>
        <img src={largeImage} alt="" />
      </Modal>
    </Overlay>
  );
}

ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};



