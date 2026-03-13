    import { useEffect, useState, useContext, useRef } from "react"
    import { get } from "../data/httpClient"
    import { MovieCard} from "../components/MovieCard"
    import "../components/ContextMovieCard.css"
    import { LanguageContext } from "../context/LanguageContext";
    import { useLocation } from "react-router-dom";


    export function ContextMovieCard(){
    const [movies, SetMovies] = useState([]);
    const { language } = useContext(LanguageContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("search");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    
    useEffect(() => {
        const endpoint = query
            ? `/search/movie?query=${query}&language=${language}&page=${page}`
            : `/discover/movie?language=${language}&page=${page}`;
            get(endpoint).then((data) => {
            if (page === 1) {
            SetMovies(data.results);
            } else {
            SetMovies(prev => [...prev, ...data.results]);
            }
            if (data.results.length === 0) {
            setHasMore(false);
            }
        });
        }, [language, query, page]);

        useEffect(() => {
            setPage(1);
            setHasMore(true);
        }, [query, language]);

        const lastMovieRef = (node) => {
            if (!hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                setPage(prev => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        };
        return(
            <div>
        <ul className="container">
            {movies.map((movie, index) => {
            if (movies.length === index + 1) {
                return (
                <div ref={lastMovieRef} key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
                );
            }
            return <MovieCard key={movie.id} movie={movie} />;
            })}
        </ul>
        </div>)
    }