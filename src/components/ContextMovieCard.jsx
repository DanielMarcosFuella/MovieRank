    import { useEffect, useState } from "react"
    import { get } from "../data/httpClient"
    import { MovieCard} from "../components/MovieCard"
    import "../components/ContextMovieCard.css"
    import { LanguageSelector } from "./LanguageSelector"

    export function ContextMovieCard(){
    const [movies, SetMovies] = useState([]);
    const [language, setLanguage] = useState("es-ES");
    useEffect(()=>{
        get(`/discover/movie?language=${language}`).then((data)=>{
            SetMovies(data.results)
            console.log(data)

        })
    }, [language])
        return(
            <div>
            <LanguageSelector setLanguage={setLanguage} language={language} />
        <ul className="container">
            {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />

            ))}
        </ul>
        </div>)
    }