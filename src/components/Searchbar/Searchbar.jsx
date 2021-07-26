import PropTypes from 'prop-types';
import { Header, Form, Input, Button, Label } from './Searchbar.styles.jsx';

export const Searchbar = ({ onSubmit }) => {
  const handleSearch = e => {
    e.preventDefault();
    let searchQuery = e.target.elements.imageName.value.trim();

    if (!searchQuery) {
      e.target.elements.imageName.value = '';
    }

    onSubmit(searchQuery);
  };

  return (
    <Header>
      <Form onSubmit={handleSearch}>
        <Button type="submit">
          <Label>Search</Label>
        </Button>

        <Input
          name="imageName"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired,
};
