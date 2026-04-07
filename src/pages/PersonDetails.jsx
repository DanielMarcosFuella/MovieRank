import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { get } from "../data/httpClient";
import { LanguageContext } from "../context/LanguageContext";
import { MovieCard } from "../components/MovieCard";
import "../pages/PersonDetails.css"

export function PersonDetails() {
  const { personId } = useParams();
  const { language } = useContext(LanguageContext);

  const [person, setPerson] = useState(null);
  const [directedMovies, setDirectedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("acting");

  useEffect(() => {
    get(`/person/${personId}?language=${language}`).then(data => {
      setPerson(data);
    });

    get(`/person/${personId}/movie_credits?language=${language}`).then(data => {
      setMovies(data.cast);
      const directed = data.crew.filter(
        (item) => item.job === "Director"
    );
      setDirectedMovies(directed);

    });

  }, [personId, language]);
  useEffect(() => {
  if (movies.length === 0 && directedMovies.length > 0) {
    setActiveTab("directing");
  }
  }, [movies, directedMovies]);

  if (!person) return <p>Cargando...</p>;

  const imageUrl = person.profile_path
    ? "https://image.tmdb.org/t/p/w300" + person.profile_path
    : null;

  return (
    <div className="personContainer">
    <div className="personHeader">
    {imageUrl && (
        <img
        src={imageUrl}
        alt={person.name}
        className="personImage"
        />
    )}

    <div className="personInfo">
        <h2>{person.name}</h2>
        <p>{person.biography || "Sin biografía disponible"}</p>
    </div>  
    </div>
    <div className="tabs">
      {movies.length > 0 && (
        <button
          className={activeTab === "acting" ? "active" : ""}
          onClick={() => setActiveTab("acting")}
        >
          🎭 Acting
        </button>
      )}

      {directedMovies.length > 0 && (
        <button
          className={activeTab === "directing" ? "active" : ""}
          onClick={() => setActiveTab("directing")}
        >
          🎬 Directing
        </button>
      )}
    </div>
      {activeTab === "acting" && movies.length > 0 && (
  <>
    <h3>Actuación</h3>
    <ul className="moviesGrid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  </>
)}

{activeTab === "directing" && directedMovies.length > 0 && (
  <>
    <h3>Dirección</h3>
    <ul className="moviesGrid">
      {directedMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  </>
)}
        </div>
    );
    }