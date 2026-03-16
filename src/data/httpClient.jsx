const API="https://api.themoviedb.org/3"

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export function get(path){
    return fetch(API+path,{
        headers:{
            Authorization:
            `Bearer ${TOKEN}`,
            "Content-Type": "application/json;charset=utf-8"
        }
    }).then((result)=> result.json());
}