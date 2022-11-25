import css from './SearchForm.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

const SearchForm = ({ onSubmitItem }) => {
  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warn('input value can not be empty');
    }
    onSubmitItem(query);
    setQuery('');
  };

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <button className={css.formButton} type="submit"></button>

      <input
        className={css.formInput}
        onInput={e => setQuery(e.currentTarget.value.toLowerCase())}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={query}
      />
    </form>
  );
};

export default SearchForm;
