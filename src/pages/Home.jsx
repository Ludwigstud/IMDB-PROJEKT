import MovieRow from "../components/MovieRow";
import useFetch from "../api/useFetch";

const Home = () => {

  const {
    data: topMovieData,
    isPending: topMoviePending,
    error: topMovieError,
  } = useFetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=5000&with_watch_monetization_types=flatrate"
  );



  const recentlyViewedData = {
    results: JSON.parse(localStorage.getItem("recentlyViewed")),
  };
  const RecentlyViewedPending = false;
  const recentlyViewedError = false;

  return (
    <section>
      <div className="container">
       
        <MovieRow
          title={"Filmer"}
          data={topMovieData}
          isPending={topMoviePending}
          error={topMovieError}
          typeOfMedia={"movie"}
        />
      
        {localStorage.getItem("recentlyViewed") && (
          <MovieRow
            title={"Nyligen visade"}
            data={recentlyViewedData}
            isPending={RecentlyViewedPending}
            error={recentlyViewedError}
            typeOfMedia={"movie"}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
