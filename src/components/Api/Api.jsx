import axios from 'axios';
const KEY = '2c84da57b63e5566f246dbdad2c46707';
const URL = 'https://api.themoviedb.org/3/';

export const ApiTrend = () => {
  return axios.get(`${URL}trending/all/day?api_key=${KEY}`);
};

export const ApiQuery = queryEl => {
  return axios.get(
    `${URL}search/movie?api_key=${KEY}&language=en-US&query=${queryEl}&page=1&include_adult=false`
  );
};

export const ApiMovieInfo = movieId => {
  return axios.get(`${URL}movie/${movieId}?api_key=${KEY}&language=en-US`);
};

export const ApiCast = movieId => {
  return axios.get(
    `${URL}movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  );
};

export const ApiReview = movieId => {
  return axios.get(
    `${URL}movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
};
