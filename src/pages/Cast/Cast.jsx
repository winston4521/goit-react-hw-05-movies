import React from 'react';
import { useState, useEffect } from 'react';
import { ApiCast } from '../../components/Api/Api';
import { useParams } from 'react-router-dom';

import css from './Cast.module.css';

const Cast = () => {
  const [members, setMembers] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    ApiCast(movieId).then(res => {
      const { data } = res;

      if (data.cast.length === 0) {
        return;
      }
      setMembers(data.cast);
    });
  }, [movieId]);

  return (
    <div className={css.cast__container}>
      {members.length > 0 ? (
        <>
          <h2 className={css.cast__title}>Series Cast</h2>
          <ul className={css.cast__list}>
            {members.map(({ id, original_name, character, profile_path }) => (
              <li className={css.cast__item} key={id}>
                <h3 className={css.cast__itemTitle}>{original_name}</h3>
                <h4 className={css.cast__itemCharacter}>{character}</h4>

                <img
                  className={css.cast__img}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w300${profile_path}`
                      : `https://i.pinimg.com/originals/9a/91/34/9a91349d6ceeba868c03a23776e6420d.jpg`
                  }
                  alt={original_name}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        'Did not have any results'
      )}
    </div>
  );
};

export default Cast;
