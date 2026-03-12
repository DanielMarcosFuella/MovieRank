    import { useEffect, useState, useContext } from "react"
    import { get } from "../data/httpClient"
    import { MovieCard} from "../components/MovieCard"
    import "../components/ContextMovieCard.css"
    import { LanguageContext } from "../context/LanguageContext";


    export function ContextMovieCard(){
    const [movies, SetMovies] = useState([]);
    const { language } = useContext(LanguageContext);
    useEffect(()=>{
        get(`/discover/movie?language=${language}`).then((data)=>{
            SetMovies(data.results)

        })
    }, [language])
        return(
            <div>
        <ul className="container">
            {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />

            ))}
        </ul>
        </div>)
    }