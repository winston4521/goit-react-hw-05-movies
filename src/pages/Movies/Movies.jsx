import { ApiQuery } from '../../components/Api/Api';
import { useState, useEffect } from 'react';

import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';
import { toast } from 'react-toastify';
import SearchForm from 'components/SearchForm/SearchForm';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('search') ?? '';
  const location = useLocation();
  useEffect(() => {
    if (searchParam) {
      async function fetchMovies() {
        const { data } = await ApiQuery(searchParam);
        if (data.results.length === 0) {
          return toast.warn(`Did not have any movies with name ${searchParam}`);
        }
        setMovies(data.results);
      }

      fetchMovies();
    }
  }, [searchParam]);

  const onSubmitHandler = value => {
    if (value === '') {
      return alert(' Input value can not be empty');
    }

    setSearchParams(value !== '' ? { search: value } : {});
  };

  return (
    <section className={css.formContainer}>
      <SearchForm onSubmitItem={onSubmitHandler} />

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
