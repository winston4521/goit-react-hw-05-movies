import { lazy, Suspense } from 'react';
// import Home from 'pages/Home/Home';
// import MovieDetails from 'pages/MovieDetails/MovieDetails';
// import { Movies } from '../../pages/Movies/Movies';
import { Routes, Route } from 'react-router-dom';
import { Container, Header, Link } from './App.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Cast } from 'pages/Cast/Cast';
// import { Reviews } from '../../pages/Reviews/Reviews';
// import { NotFound } from '../../pages/NotFound/NotFound';

const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const MovieDetails = lazy(() =>
  import('../../pages/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('../../pages/Cast/Cast'));
const Reviews = lazy(() => import('../../pages/Reviews/Reviews'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

export const App = () => {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </Container>
  );
};
