import { Link } from "react-router-dom";
import classes from "./SokLista.module.css";

const DropdownItem = ({ movie, placement }) => {
  const getMovieName = () => {
    let name = "";

    if (movie.name) {
      name = movie.name;
    } else {
      name = movie.title;
    }

    if (name.length > 25) {
      name = name.slice(0, 25) + "...";
    }

    return name;
  };

  const truncateDescription = (length) => {
    if (movie.overview.length > length) {
      return movie.overview.slice(0, length) + "...";
    }

    return movie.overview;
  };

  const isFirstChild = () => {
    if (placement === 0) {
      return true;
    }
    return false;
  };

  return (
    <Link to={`/media/movie/${movie.id}`}>
      <article className={`${classes.itemContainer} ${isFirstChild() ? classes.isFirstChild : ""}`}>
        <div className={classes.image}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={"Poster for " + getMovieName()}
            />
          )}
        </div>
        <div className={classes.content}>
          <h3>{getMovieName()}</h3>
          <p className={`${classes.descriptionSuperShort} ${classes.description}`}>{truncateDescription(15)}</p>
          <p className={`${classes.descriptionShort} ${classes.description}`}>{truncateDescription(30)}</p>
          <p className={`${classes.descriptionLong} ${classes.description}`}>{truncateDescription(200)}</p>
        </div>
      </article>
    </Link>
  );
};

export default DropdownItem;
