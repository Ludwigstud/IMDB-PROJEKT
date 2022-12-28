import { useParams } from "react-router-dom";
import classes from "./Sok.module.css";
import MovieRow from "../components/MovieRow";
import useFetch from "../hooks/useFetch";

const Search = () => {
  let { query } = useParams();
  query = query.replace(/_/g, " ");
  const {
    data: movieSearchData,
    isPending: movieSearchPending,
    error: movieSearchError,
  } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${query}&page=1&include_adult=false`
  );

  

  return (
    <section>
      <div className="container">
        <div className={classes.searchHeader}>
        </div>
        <div className={classes.result}>
          <MovieRow
            title={"Filmer "}
            data={movieSearchData}
            isPending={movieSearchPending}
            error={movieSearchError}
            typeOfMedia={"movie"}
          />
        </div>
        <div className={classes.result}>
       
        </div>
      </div>
    </section>
  );
};

export default Search;
