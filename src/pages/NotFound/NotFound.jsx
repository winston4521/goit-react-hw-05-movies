import css from './NotFount.module.css';

export const NotFound = () => {
  return (
    <div className={css.NotFoundWrap}>
      <h2 className={css.notFount}>404 Not Found</h2>;
    </div>
  );
};

export default NotFound;
