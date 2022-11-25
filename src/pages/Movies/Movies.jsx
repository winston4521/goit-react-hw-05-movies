import { ApiQuery } from '../../components/Api/Api';
import { useState, useEffect } from 'react';

import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';
import { toast } from 'react-toastify';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchParam = searchParams.get('search') ?? '';
  const [queryEl, setQueryEl] = useState('');

  useEffect(() => {
    if (queryEl) {
      async function fetchMovies() {
        const { data } = await ApiQuery(queryEl);
        if (data.results.length > 0) {
          setMovies(data.results);
        }
        toast.warn(`Did not have any movies with name ${queryEl}`);
      }

      fetchMovies();
    }
  }, [queryEl]);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (searchParam === '') {
      return alert(' Input value can not be empty');
    }
    setQueryEl(searchParam);
  };

  const onInputChange = value => {
    setSearchParams(value !== '' ? { search: value } : {});
  };

  return (
    <section className={css.formContainer}>
      <form className={css.form} onSubmit={onSubmitHandler}>
        <button className={css.formButton} type="submit"></button>

        <input
          className={css.formInput}
          onInput={e => onInputChange(e.currentTarget.value.toLowerCase())}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          value={searchParam}
        />
      </form>

      <div className={css.moviesSection}>
        {movies.length > 0 && (
          <ul className={css.movieList}>
            {movies.map(({ id, title, poster_path, release_date }) => (
              <li className={css.movieItem} key={id}>
                <NavLink to={`/movies/${id}`} state={{ from: location }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={title}
                  />
                  <h3 className={css.movieItemTitle}>{title}</h3>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Movies;
