import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ApiTrend } from '../../components/Api/Api';
import css from './Home.module.css';

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const getTrandingMovies = async () => {
      const { data } = await ApiTrend();
      setTopMovies(data.results);
    };
    getTrandingMovies();
  }, []);

  return (
    <div className={css.homeSection}>
      <h2 className={css.homeTitle}>Trending Today</h2>
      {topMovies.length > 0 && (
        <ul className={css.homeList}>
          {topMovies.map(({ title, poster_path, id, backdrop_path, name }) => (
            <li className={css.homeItem} key={id}>
              <NavLink
                className={css.homeLink}
                to={`/movies/${id}`}
                state={{ movies: location }}
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path}`
                      : `https://image.tmdb.org/t/p/w300${backdrop_path}`
                  }
                  alt={title}
                />
                <div className={css.itemsWrapper}>
                  {' '}
                  {title ? (
                    <h3 className={css.homeItemTitle}>{title}</h3>
                  ) : (
                    <h3 className={css.homeItemTitle}>{name}</h3>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
