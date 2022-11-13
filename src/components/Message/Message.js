import PropTypes from 'prop-types';
import { Text, Container } from './Message.styled';

export const Message = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
};
