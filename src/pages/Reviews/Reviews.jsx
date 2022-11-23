import { useEffect, useState } from 'react';
import { ApiReview } from '../../components/Api/Api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    ApiReview(movieId).then(res => {
      const { data } = res;
      if (!data) {
        return toast.warn('Did not have any reviews');
      }
      setReviews(data.results);
    });
  }, [movieId]);

  return (
    <div className={css.reviews__container}>
      {reviews.length > 0 ? (
        <ul className={css.Reviews__list}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={css.Reviews__item}>
              <h3 className={css.Reviews__author}>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        'Do not have any review'
      )}
    </div>
  );
};

export default Reviews;
