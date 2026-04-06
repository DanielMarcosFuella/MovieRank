import { useParams} from "react-router-dom"
import { get } from "../data/httpClient"
import {getMovieImg} from "../utils/getMovieImg"
import { useState } from "react"
import { useEffect, useContext } from "react"
import { LanguageContext } from "../context/LanguageContext";
import "../pages/MovieDetails.css"

export function MovieDetails() {
    const {movieId} = useParams();
    const { language } = useContext(LanguageContext);
    const [movie, setMovie] = useState ([]);
    const [generos, setGeneros] = useState ([]);
    const [cast, setCast] = useState([]);
    const [director, setDirector] = useState(null);
    
    useEffect(() => {
        get("/movie/" + movieId + "?language=" + language).then((data) => {
            setMovie(data);

            if (data.genres && data.genres.length > 0) {
                const nombresGeneros = data.genres.map(g => g.name).join(", ");
                setGeneros(nombresGeneros);
            } else {
                setGeneros("No especificado");
            }
        });
        get(`/movie/${movieId}/credits?language=${language}`).then((data) => {
            setCast(data.cast.slice(0, 5));

            const directorData = data.crew.find(
                (person) => person.job === "Director"
            );

            setDirector(directorData);
        });
    }, [movieId, language]);
    const imageUrl = getMovieImg(movie.poster_path, 500)
    const translations = {
        title: {
            "es-ES": "Título",
            "en-US": "Title",
            "fr-FR": "Titre",
            "de-DE": "Titel",
            "it-IT": "Titolo"
        },
        genre: {
            "es-ES": "Género",
            "en-US": "Genre",
            "fr-FR": "Genre",
            "de-DE": "Genre",
            "it-IT": "Genere"
        },
        description: {
            "es-ES": "Descripción",
            "en-US": "Description",
            "fr-FR": "Description",
            "de-DE": "Beschreibung",
            "it-IT": "Descrizione"
        },
        year: {
            "es-ES": "Año",
            "en-US": "Year",
            "fr-FR": "Année",
            "de-DE": "Jahr",
            "it-IT": "Anno"
        },
        duration: {
            "es-ES": "Duración",
            "en-US": "Duration",
            "fr-FR": "Durée",
            "de-DE": "Dauer",
            "it-IT": "Durata"
        },
        director: {
            "es-ES": "Director",
            "en-US": "Director",
            "fr-FR": "Réalisateur",
            "de-DE": "Regisseur",
            "it-IT": "Regista"
        },
        actors: {
            "es-ES": "Actores",
            "en-US": "Cast",
            "fr-FR": "Acteurs",
            "de-DE": "Schauspieler",
            "it-IT": "Attori"
        }
    };

    return(<div className="detailsContainer">
        <img src={imageUrl} alt={movie.title} className="col movieImg"/>
        <div className="col movieDetails">
            <div>
            <span>⭐ {Math.round(movie.vote_average*100)/100}</span>
            </div>
            <p className="titleDetail">
            <strong>{translations.title[language]}: </strong>
            {movie.title}
            </p>
            <p>
                <strong>{translations.year[language]}: </strong>
                {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
            <p>
                <strong>{translations.duration[language]}: </strong>
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
            </p>
            <p>
                <strong>{translations.director[language]}: </strong>
                {director ? director.name : "No disponible"}
            </p>
            <div className="castSection">
            <strong>{translations.actors[language]}: </strong>

            <div className="castList">
                {cast.map(actor => {
                const imageUrl = actor.profile_path
                    ? "https://image.tmdb.org/t/p/w185" + actor.profile_path
                    : null;

                return (
                    <div key={actor.id} className="actorCard">
                    {imageUrl ? (
                        <img
                        src={imageUrl}
                        alt={actor.name}
                        className="actorImage"
                        />
                    ) : (
                        <div className="actorPlaceholder">No Img</div>
                    )}

                    <span className="actorName">{actor.name}</span>
                    <span className="actorCharacter">{actor.character}</span>
                    </div>
                );
                })}
            </div>
            </div>
            <p>
            <strong>{translations.genre[language]}: </strong>
            {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((g) => (
                <span key={g.id} className="genreChip">{g.name}</span>
                ))
            ) : (
                "No especificado"
            )}
            </p>
            <p>
            <strong>{translations.description[language]}: </strong>
            {movie.overview}
            </p>
        </div>
    </div>)
}