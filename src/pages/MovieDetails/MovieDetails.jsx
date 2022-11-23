import { useLocation, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ApiMovieInfo } from '../../components/Api/Api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    ApiMovieInfo(movieId).then(res => {
      const { data } = res;
      if (!data) {
        return;
      }
      setMovieInfo(data);
    });
  }, [movieId]);

  return (
    <div className={css.detailsSection}>
      {movieInfo && (
        <div className={css.sectionWrapper}>
          <Link
            className={css.HomeButton}
            to={location.state?.from ?? '/movies'}
          >
            Back
          </Link>
          <img
            className={css.detailsImg}
            src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`}
            alt=""
          />

          <h2 className={css.detailsTitle}>{movieInfo.title}</h2>
          <p className={css.detailsRating}>Rating {movieInfo.vote_average}</p>
          <h3 className={css.detailsOverview}>Overview</h3>
          <p className={css.movieInfo}>{movieInfo.overview}</p>
          <h3 className={css.movieGenresTitle}>Genres</h3>
          <div className={css.movieGenresContainer}>
            {movieInfo.genres.map(gen => (
              <p className={css.movieGenres}>{gen.name}</p>
            ))}
          </div>

          <Link className={css.DetailsNavigation} to="cast">
            Cast
          </Link>
          <Link className={css.DetailsNavigation} to="reviews">
            Reviews
          </Link>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
