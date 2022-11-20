import Home from 'pages/Home/Home';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import { Movies } from '../../pages/Movies/Movies';
import { Routes, Route } from 'react-router-dom';
import { Container, Header, Link } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cast } from 'pages/Cast/Cast';
import { Reviews } from '../../pages/Reviews/Reviews';
import { NotFound } from '../../pages/NotFound/NotFound';
import { css } from 'styled-components';
import s from './App.module.css';

export const App = () => {
  return (
    <section className={s.AppSection}>
      <Container>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </section>
  );
};
