import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import classes from "./Item.module.css";
import { Skeleton } from "@mui/material";

const Item = ({ movie, placement, typeOfMedia, width }) => {
  const getMovieName = () => {
    let name;

    if (movie.name) {
      name = movie.name;
    } else {
      name = movie.title;
    }

    if (name.length > 30) {
      name = name.slice(0, 30) + "...";
    }

    return name;
  };

  if (typeOfMedia === "loading") {
    return (
      <Skeleton
        className={classes.loadingCard}
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width={"100%"}
        height={447}
      ></Skeleton>
    );
  }

  const getMediaType = () => {
    let returnType = typeOfMedia;
    if (movie.typeOfMedia) {
      returnType = movie.typeOfMedia;
    }
    return "/media/" + returnType + "/" + movie.id;
  };

  return (
    <Link to={getMediaType()} className={`placement-${placement} ${classes.movieCard}`}>
      <article>
        <div className={classes.image}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              alt={"Poster for " + getMovieName()}
            />
          )}
        </div>
        <div className={classes.content}>
          <div className={classes.ratingContainer}>
            <AiFillStar className={classes.icon} />
            <h4 className={classes.ratingText}>{movie.vote_average.toFixed(1)}</h4>
          </div>
          <h3>{getMovieName()}</h3>
        </div>
      </article>
    </Link>
  );
};

export default Item;
