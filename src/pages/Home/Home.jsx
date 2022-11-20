import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ApiTrend } from '../../components/Api/Api';
import css from './Home.module.css';

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

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
          {topMovies.map(
            ({ title, poster_path, id, backdrop_path, release_date }) => (
              <li className={css.homeItem} key={id}>
                <NavLink to={`/movies/${id}`}>
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w300${poster_path}`
                        : `https://image.tmdb.org/t/p/w300${backdrop_path}`
                    }
                    alt={title}
                  />
                  <h3 className={css.homeItemTitle}>{title}</h3>
                  <p className={css.releaseDate}>{release_date}</p>
                </NavLink>
              </li>
            )
          )}
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default Home;
