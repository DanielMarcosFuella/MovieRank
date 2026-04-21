import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { get } from "../data/httpClient";
import { MovieCard } from "../components/MovieCard";
import "./Profile.css";

export function Profile() {
  const { lists, user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("favorite");
  const filteredMovies = movies.filter(
  (movie) => movie.type === activeTab
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const enriched = await Promise.all(
        lists.map(async (item) => {
          const data = await get(`/movie/${item.movie_id}`);
          return {
            ...data,
            type: item.type,
          };
        })
      );

      setMovies(enriched);
    };

    if (lists.length > 0) {
      fetchMovies();
    }
  }, [lists]);
  const favoritesCount = lists.filter(l => l.type === "favorite").length;
  const watchedCount = lists.filter(l => l.type === "watched").length;
  const watchlistCount = lists.filter(l => l.type === "watchlist").length;

  return (
    <div className="profileContainer">
      <h1>{user.username} </h1>
    <div className="tabs">
      <button
        className={activeTab === "favorite" ? "active" : ""}
        onClick={() => setActiveTab("favorite")}
      >
        ❤️ Favoritos ({favoritesCount})
      </button>

      <button
        className={activeTab === "watched" ? "active" : ""}
        onClick={() => setActiveTab("watched")}
      >
        👀 Vistas ({watchedCount})
      </button>

      <button
        className={activeTab === "watchlist" ? "active" : ""}
        onClick={() => setActiveTab("watchlist")}
      >
        📌 Pendientes ({watchlistCount})
      </button>
    </div>      
      <div className="listsGrid">
        {filteredMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <span className="listTag">{movie.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}