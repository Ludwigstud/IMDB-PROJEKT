import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../api/useFetch";
import classes from "./FilmPage.module.css";
import { AiFillStar } from "react-icons/ai";
import { CircularProgress } from "@mui/material";

const FilmPage = () => {
  const { media, id } = useParams();
  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}?api_key=f7f5e53209dd58bafcd025bff2a1e966`
  );
  const {
    isPending: creditsIsPending,
    error: creditsError,
  } = useFetch(
    ` https://api.themoviedb.org/3/${media}/${id}/credits?api_key=f7f5e53209dd58bafcd025bff2a1e966&language=en-US`
  );
  const {
    data: trailers,
    isPending: trailerIsPending,
    error: trailerError,
  } = useFetch(
    `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=f7f5e53209dd58bafcd025bff2a1e966&language=en-US`
  );

  useEffect(() => {
    const addToLocalStorage = () => {
      if (isPending || !data) {
        return;
      }

      if (!localStorage.getItem("recentlyViewed")) {
        const movieArray = [{ ...data, typeOfMedia: media }];
        localStorage.setItem("recentlyViewed", JSON.stringify(movieArray));
      } else {
        const recentlyViewedArray = JSON.parse(localStorage.getItem("recentlyViewed"));
        const filteredArray = recentlyViewedArray.filter((movie) => movie.id !== data.id);

        filteredArray.unshift({ ...data, typeOfMedia: media });

        let shortenedArray = [];

        for (let i = 0; i < 20; i++) {
          if (filteredArray[i]) {
            shortenedArray.push(filteredArray[i]);
          }
        }

        localStorage.setItem("recentlyViewed", JSON.stringify(shortenedArray));
      }
    };

    addToLocalStorage();
  }, [isPending, data, media]);

  const getMovieName = () => {
    let name = "";

    if (data.name) {
      name = data.name;
    } else {
      name = data.title;
    }

    return name;
  };





 

  const getTrailerLink = () => {
    const youtubeTrailer = trailers.results.find((trailer) => trailer.site === "YouTube");

    if (!youtubeTrailer) {
      return null;
    }

    return `https://www.youtube.com/embed/${youtubeTrailer.key}`;
  };

  const convertToHoursAndMin = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const isLoading = () => {
    if (isPending || creditsIsPending || trailerIsPending) {
      return true;
    }
    return false;
  };

  const errorHasOccured = () => {
    if (error || creditsError || trailerError) {
      return true;
    }
    return false;
  };

  return (
    <section>
      <div className="container">
        
        {isLoading() && (
          <div className={classes.spinnerContainer}>
            <CircularProgress className={classes.spinner} color="inherit" size="10rem" />
          </div>
        )}
        {!isLoading() && !errorHasOccured() && (
          <div className={classes.header}>
            <h2>{getMovieName()}</h2>
            <div>
              <div className={classes.ratingContainer}>
                <AiFillStar className={classes.icon} />
                <div>
                  <h4 className={classes.ratingText}>{data.vote_average.toFixed(1)}/10</h4>
                  <p className={classes.voteCount}>{data.vote_count} Votes</p>
                </div>
              </div>
            </div>
            {(data.runtime || data.runtime === 0) && <h3>{convertToHoursAndMin(data.runtime)}</h3>}
          </div>
        )}
        {!isLoading() && !errorHasOccured() && (
          <div className={classes.content}>
            <div className={classes.posterAndTrailer}>
              {data.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
                  alt={"Poster for " + getMovieName()}
                />
              )}
              <div className={classes.iframeContainer}>
                <iframe
                  className={classes.trailer}
                  src={getTrailerLink()}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          
            <p className={classes.description}>{data.overview}</p>
            <div className={classes.castAndCrew}>
              {media === "movie" && (
                <div className={`${classes.directorRow} ${classes.row}`}>
                 
                </div>
              )}
             
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilmPage;
