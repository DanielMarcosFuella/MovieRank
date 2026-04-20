import { useState, useEffect } from "react";
import { get } from "../data/httpClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export function SearchBar() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const clearSearch = () => {
        setQuery("");
        setResults([]);
  };

  useEffect(() => {

    if (query.length < 3) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {

      get(`/search/multi?query=${encodeURIComponent(query)}`)
        .then((data) => {
          if (data && data.results) {
          const filteredResults = data.results
            .filter(item => item.media_type === "movie" || item.media_type === "person")
            .slice(0, 5);

          setResults(filteredResults);          }
        })
        .catch((error) => {
          console.error("Search error:", error);
        });

    }, 500);

    return () => clearTimeout(delayDebounce);

  }, [query]);

  return (
    <div className="searchContainer">

      <input
  className="searchInput"
  type="text"
  placeholder="Buscar película..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${query}`);
      clearSearch();
    }
  }}
/>

      {results.length > 0 && (
        <ul className="searchResults">

        {results.map(item => (
          <li key={item.id}>

            {item.media_type === "movie" && (
              <Link to={`/movies/${item.id}`} onClick={clearSearch}>
                🎬 {item.title}
              </Link>
            )}

            {item.media_type === "person" && (
              <Link to={`/person/${item.id}`} onClick={clearSearch}>
                👤 {item.name}
              </Link>
            )}

          </li>
        ))}
        </ul>
      )}

    </div>
  );
}