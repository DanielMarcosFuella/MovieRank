import noMovie from "../img/noMovie.png.png"
export function getMovieImg (path, width){
    return path? `https://image.tmdb.org/t/p/w${width}${path}`:noMovie
}

//     const imageUrl = "https://image.tmdb.org/t/p/w300"+movie.poster_path;
