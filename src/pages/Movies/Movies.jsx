import { ApiQuery } from '../../components/Api/Api';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import css from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchParam = searchParams.get('search') ?? '';

  const onSubmitHandler = e => {
    e.preventDefault();
    if (searchParam.trim() === '') {
      return toast.warn('Input value can not be empty');
    }

    ApiQuery(searchParam).then(res => {
      const { data } = res;
      if (data.results.length === 0) {
        return toast.warn(`No Movies found with that name ${searchParam}`);
      }
      setMovies(data.results);
    });
    e.target.reset();
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
