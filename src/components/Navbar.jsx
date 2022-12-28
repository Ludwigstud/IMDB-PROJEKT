import classes from "./Navbar.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchDropdown from "./SokLista";

const Navbar = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const closeDropdown = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    closeDropdown();
    searchRef.current.value = "";
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchRef.current.value) {
      navigate("/");
    } else {
      navigate(`/search/${searchRef.current.value.replace(/\s/g, "_")}`);
      searchRef.current.value = "";
    }
  };

  return (
    <header className={classes.header}>
      <div className={`container ${classes.container__nav}`}>
        <Link to="/">
          <h1 className={classes.logo}>Ludwig</h1>
        </Link>
        <nav className={classes.nav}>
          <form onSubmit={handleSubmit}>
            <div className={`${classes.searchInputGroup} searchbarContainer`}>
              <input
                type="text"
                ref={searchRef}
                className={classes.searchInput}
                placeholder="Search..."
                aria-label="Search for movies/shows"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
             
              {searchQuery && <SearchDropdown searchQuery={searchQuery} closeDropdown={closeDropdown} />}
            </div>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
