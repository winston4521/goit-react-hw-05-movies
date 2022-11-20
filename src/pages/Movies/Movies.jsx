import { ApiQuery } from '../../components/Api/Api';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { NavLink } from 'react-router-dom';
import css from './Movies.module.css';

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const onSubmitHandler = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.warn('Input value can not be empty');
    }

    ApiQuery(searchQuery).then(res => {
      const { data } = res;
      if (data.results.length === 0) {
        return toast.warn(`No Movies found with that name ${searchQuery}`);
      }
      setMovies(data.results);
    });
    e.target.reset();
  };

  return (
    <section className={css.formContainer}>
      <form className={css.form} onSubmit={onSubmitHandler}>
        <button className={css.formButton} type="submit"></button>

        <input
          className={css.formInput}
          onInput={e => setSearchQuery(e.currentTarget.value.toLowerCase())}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
      </form>

      <div className={css.moviesSection}>
        {movies.length > 0 && (
          <ul className={css.movieList}>
            {movies.map(({ id, title, poster_path, release_date }) => (
              <li className={css.movieItem} key={id}>
                <NavLink to={`/movies/${id}`}>
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

// (
//   toast.warn(
//     `Sorry we did not foujnd any movies with name ${searchQuery}`
//   )
