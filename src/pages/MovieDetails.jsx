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
    
    useEffect(()=>{
        get("/movie/"+movieId+ "?language="+language).then((data)=>{
            setMovie(data)
            setGeneros(data.genres[0].name)
        })
    },[movieId, language])
    const imageUrl = getMovieImg(movie.poster_path, 500)

    return(<div className="detailsContainer">
        <img src={imageUrl} alt={movie.title} className="col movieImg"/>
        <div className="col movieDetails">
            <p className="title">
                <strong>Título: </strong>
                {movie.title}
            </p>
            <p>
                <strong>Género: </strong>
                {generos}
            </p>
            <p>
                <strong>Descripción: </strong>
                {movie.overview}
            </p>
        </div>
    </div>)
}