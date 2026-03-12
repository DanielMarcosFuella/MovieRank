const API="https://api.themoviedb.org/3"
export function get(path){
    return fetch(API+path,{
        headers:{
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDU2MThjY2ZlYWI3ZTYyZDdlZGZkN2YyNTFhOTlmNyIsIm5iZiI6MTY1MDI3ODk4My40NDcsInN1YiI6IjYyNWQ0MjQ3ZGY4NmE4MmVhZWFjNDVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HaIELI20rnn6fccLcYKDXOphBD_2iMn523kUdsm42fQ",
            "Content-Type": "application/json;charset=utf-8"
        }
    }).then((result)=> result.json());
}