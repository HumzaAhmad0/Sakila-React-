import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import PartialMovieCard from "./PartialMovieCard"
import { baseUrl } from "../../config"
import { Film } from "../../types"

export default function MovieByGenreList(){
        const [movies, setMovies] = useState<Film[]>([])
        const {name: genre} = useParams()
    
        useEffect(()=>{
            fetch(`${baseUrl}/films?categoryName=${genre}`).then(res => res.json()).then(setMovies)
        }, [genre])
    
        return (
            // <div className="cards-container-main">
                <div className="cards-container">
                    <div className="header">
                        <h1 className="titleMain">{genre} Movies</h1>
                        <div className="links">
                            <Link data-testid="back-to-genres-link" className="more-info" to="/genres">Go back</Link>
                        </div>
                    </div>
                    <div className="films-list" data-testid="list-of-movies-of-specific-genre">
                        {movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <PartialMovieCard key={movie.id} film={movie} index={index + 1} />
                            ))
                        ) : (
                            <p>No movies found</p>
                        )}
                    </div>
                </div>
            // </div>            
          );
    
}