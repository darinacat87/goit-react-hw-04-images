import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Modal } from './Modal.styled';

export class ModalWindow extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackDr = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleClickBackDr}>
        <Modal>
          <img src={this.props.largeImage} alt="" />
        </Modal>
      </Overlay>
    );
  }
}
