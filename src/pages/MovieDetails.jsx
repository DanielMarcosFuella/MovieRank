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