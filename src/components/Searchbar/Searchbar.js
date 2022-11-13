import PropTypes from 'prop-types';
import { Header, SearchForm, Input, Btn, Icon } from './Searchbar.styled';

export const SearchBar = ({ onSearch }) => {
  const searchImages = e => {
    const input = e.target.elements.input;
    e.preventDefault();

    if (input.value === '') {
      return;
    }

    onSearch(input.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={searchImages}>
        <Btn type="submit">
          <span>
            <Icon />
          </span>
        </Btn>
        <Input
          name="input"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};
