import { Formik } from 'formik';
import * as yup from 'yup';
import { SearchForm, Input, Button } from './Searchbar.styled.js';
import { toast } from 'react-toastify';

let schema = yup.object().shape({
  searchQuery: yup.string().required(),
});

export const Searchbar = ({ onSearch }) => {
  const handleSubmit = async ({ searchQuery }, { resetForm }) => {
    try {
      await schema.validate({ searchQuery });
      onSearch(searchQuery);
      resetForm();
    } catch (error) {
      toast.warning(error.message);
    }
  };

  return (
    <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
      <SearchForm autoComplete="off">
        <Button type="submit" />
        <Input
          type="text"
          name="searchQuery"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Formik>
  );
};
