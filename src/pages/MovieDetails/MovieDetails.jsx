import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ApiMovieInfo } from '../../components/Api/Api';
import { useEffect, useState } from 'react';
import { Link } from 'components/App/App.styled';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);

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
    <div>
      {movieInfo && (
        <div>
          <Link to="/">Home</Link>
          <h2>{movieInfo.title}</h2>
          <p>Rating {movieInfo.vote_average}</p>
          <h3>Overview</h3>
          <p>{movieInfo.overview}</p>
          <h3>Genres</h3>
          {movieInfo.genres.map(gen => (
            <p>{gen.name}</p>
          ))}
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
