import { useRef } from "react";
import FilmItems from "./FilmItems";
import classes from "./FilmRow.module.css";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RxDividerVertical } from "react-icons/rx";

const FilmRow = ({ title, typeOfMedia, data, isPending, error }) => {
  const loadingCardAmount = 8;
  const FilmRow = useRef();
  let moviePlacement = 0;

  const getTargetElement = (movies, positionOfTargetElement) => {
    for (const movie of movies) {
      const movieClassName = movie.className.slice(10, 13);
      const moviePosition = Number(movieClassName.replace(/\D/g, ""));

      if (moviePosition === positionOfTargetElement) {
        return movie;
      }
    }
  };

  const handleClick = (direction) => {
    if (!data) {
      return;
    }
    const columnWidth = FilmRow.current.scrollWidth / data.results.length;
    const currentColumn = Math.round(FilmRow.current.scrollLeft / columnWidth);
    const amountOfVisibleMovies = Math.round(FilmRow.current.getBoundingClientRect().width / columnWidth);
    const movies = FilmRow.current.children;

    if (direction === "right") {
      const positionOfTargetElement = currentColumn + amountOfVisibleMovies + (amountOfVisibleMovies - 1);
      let targetMovie = getTargetElement(movies, positionOfTargetElement);

      if (!targetMovie) {
        targetMovie = FilmRow.current.lastChild;
      }
      targetMovie.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }

    if (direction === "left") {
      const positionOfTargetElement = currentColumn - amountOfVisibleMovies;
      let targetMovie = getTargetElement(movies, positionOfTargetElement);

      if (!targetMovie) {
        targetMovie = FilmRow.current.firstChild;
      }

      targetMovie.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  };

  const noMoviesFound = () => {
    if (!data) {
      return false;
    }

    if (data.results.length === 0) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div className={classes.headingContainer}>
        <RxDividerVertical className={classes.headingIcon} />
        <h2>{title}</h2>
      </div>
      {noMoviesFound() && (
        <div className={classes.errorContainer}>
          <h3>Your search gave no results</h3>
          <h4>Possible solutions:</h4>
          <ul>
            <li>Check if your spelling is correct</li>
            <li>Try other search words</li>
            <li>Maybe there is an alternative title to the movie/show</li>
          </ul>
        </div>
      )}
      {!error && !noMoviesFound() && (
        <div className={classes.movieButtonContainer}>
          <button onClick={() => handleClick("left")} className={`${classes.scroll} ${classes.scrollLeft}`}>
            <BiLeftArrow className={classes.icon} />
          </button>
          <button onClick={() => handleClick("right")} className={`${classes.scroll} ${classes.scrollRight}`}>
            <BiRightArrow className={classes.icon} />
          </button>
          <div className={classes.movies} ref={FilmRow}>
            {isPending && [...Array(loadingCardAmount)].map((e, i) => <FilmItems typeOfMedia={"loading"} key={i} />)}
            {data &&
              data.results.map((movie) => {
                return (
                  <FilmItems placement={moviePlacement++} key={movie.id} movie={movie} typeOfMedia={typeOfMedia} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmRow;
