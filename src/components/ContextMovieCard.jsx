    import { useEffect, useState, useContext, useRef } from "react"
    import { get } from "../data/httpClient"
    import { MovieCard} from "../components/MovieCard"
    import "../components/ContextMovieCard.css"
    import { LanguageContext } from "../context/LanguageContext";
    import { useLocation } from "react-router-dom";
    import { FiltersPanel } from "./FiltersPanel";


    export function ContextMovieCard(){
    const [movies, SetMovies] = useState([]);
    const { language } = useContext(LanguageContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("search");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const [filters,setFilters]=useState({
        genres:[],
        rating:0,
        yearFrom:"",
        yearTo:"",
        sort:"popularity.desc"
    })
    
    useEffect(() => {
        let endpoint = `/discover/movie?language=${language}&page=${page}&sort_by=${filters.sort}`;

        if (filters.genres.length > 0) {
        endpoint += `&with_genres=${filters.genres.join(",")}`;
        }

        if (filters.rating > 0) {
        endpoint += `&vote_average.gte=${filters.rating}`;
        }

        if (filters.yearFrom) {
        endpoint += `&primary_release_date.gte=${filters.yearFrom}-01-01`;
        }

        if (filters.yearTo) {
        endpoint += `&primary_release_date.lte=${filters.yearTo}-12-31`;
        }

        if (query) {
        endpoint = `/search/movie?query=${query}&language=${language}&page=${page}`;
        }

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
        }, [language, query, page, filters]);

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
            <FiltersPanel filters={filters} setFilters={setFilters} />
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
            {movies.length === 0 && (
            <p className="noResults">No se encontraron películas</p>
        )}
        </div>)
    }