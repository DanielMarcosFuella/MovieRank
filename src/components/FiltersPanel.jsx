import { useState, useEffect } from "react";
import { get } from "../data/httpClient";
import "./FiltersPanel.css";

export function FiltersPanel({ filters, setFilters }) {

const [open,setOpen]=useState(false);
const [genres,setGenres]=useState([]);

useEffect(()=>{
get("/genre/movie/list")
.then(data=>{
setGenres(data.genres)
})
},[])

const toggleGenre=(id)=>{

if(filters.genres.includes(id)){
setFilters({
...filters,
genres:filters.genres.filter(g=>g!==id)
})
}else{
setFilters({
...filters,
genres:[...filters.genres,id]
})
}
}

return(
<div className="filtersContainer">
<button
className="filtersToggle"
onClick={()=>setOpen(!open)}
>
⚙ Filters
</button>

{open && (

<div className="filtersPanel">

<section>

<h3>Genres</h3>

<div className="genresList">

{genres.map(g=>(
<label key={g.id}>

<input
type="checkbox"
checked={filters.genres.includes(g.id)}
onChange={()=>toggleGenre(g.id)}
/>

{g.name}

</label>
))}

</div>

</section>

<section>

<h3>Release year</h3>

<div className="yearInputs">

<input
type="number"
placeholder="From"
onChange={(e)=>setFilters({
...filters,
yearFrom:e.target.value
})}
/>

<input
type="number"
placeholder="To"
onChange={(e)=>setFilters({
...filters,
yearTo:e.target.value
})}
/>
</div>
</section>

<section>
<h3>Rating</h3>

<input
type="range"
min="0"
max="10"
step="0.5"
value={filters.rating}
onChange={(e)=>setFilters({
...filters,
rating:e.target.value
})}
/>

<span>{filters.rating} ⭐</span>
</section>
<section>
<h3>Sort by</h3>

<select
value={filters.sort}
onChange={(e)=>setFilters({
...filters,
sort:e.target.value
})}
>
<option value="popularity.desc">Popularity</option>
<option value="vote_average.desc">Rating</option>
<option value="release_date.desc">Newest</option>
<option value="release_date.asc">Oldest</option>
</select>
</section>

<button
className="clearFilters"
onClick={()=>setFilters({
genres:[],
rating:0,
yearFrom:"",
yearTo:"",
sort:"popularity.desc"
})}
>
Clear filters
</button>
</div>
)}
</div>
)
}