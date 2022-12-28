import useFetch from "../hooks/useFetch";
import { useRef, useEffect } from "react";
import ItemDrop from "./ItemDrop";
import classes from "./SokFunktion.module.css";

const SokFunktion = ({ searchQuery, closeDropdown }) => {
  const { data, isPending, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f7f5e53209dd58bafcd025bff2a1e966&query=${searchQuery}&page=1&include_adult=false`
  );
  const dropdown = useRef();
  let placement = 0;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        closeDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown, closeDropdown]);

  if (!data || !data.results.length > 0 || error || isPending) {
    return;
  }

  let shortenedArray = [];
  for (let i = 0; i < 5; i++) {
    if (data.results[i]) {
      shortenedArray.push(data.results[i]);
    }
  }

  return (
    <div className={classes.dropdownContainer} aria-label="Autocomplete results" ref={dropdown}>
      {shortenedArray &&
        shortenedArray.map((movie) => {
          return <ItemDrop movie={movie} key={movie.id} placement={placement++}/>;
        })}
    </div>
  );
};

export default SokFunktion;
