import css from './NotFount.module.css';

export const NotFound = () => {
  return (
    <div className={css.NotFoundWrap}>
      <h2 className={css.notFount}> Ooops 404 Not Found Page</h2>
    </div>
  );
};

export default NotFound;
