import { useEffect, useState } from "react";
import PartialMovieCard from "./PartialMovieCard";
import { Link } from "react-router";
import { baseUrl } from "../../config"
import { Film } from "../../types";


export default function MovieList(){
    const [movies, setMovies] = useState<Film[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${baseUrl}/films`)
        .then(res => {
            if(!res.ok) throw new Error(`Movies not found, ERROR ${res.status}`)
            return res.json()
        })
        .then(setMovies)
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return (
        // <p>loading...</p>
        <div className="header">
                        <h1 className="titleMain">L o a d i n g  .  .  .</h1>
        </div>
        )
    if(error !== null) return <p>{error.message}</p>
    if(movies === null) return <p>failed to load movies</p>

    return (
    // <div className="cards-container-main">
        <div className="cards-container">
            <div className="header">
                <h1 className="titleMain">List of All Films</h1>
                <div className="links">
                    <Link data-testid="createfilm-link" className="more-info" to="/createFilm">Create Film</Link>
                    <Link data-testid="searchfilm-link" className="more-info" to="/searchFilms">Search Film</Link>
                </div>
            </div>
            <div className="films-list" data-testid="list-of-films">
                {movies.map((movie, index) => 
                    <PartialMovieCard key={movie.id} film={movie} index={index+1} />
                )}
            </div>
        </div>
    //  </div> 
    
    )
        


}