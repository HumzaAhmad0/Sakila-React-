import { useEffect, useState } from "react"
import { useParams } from "react-router"
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
            <div>
                <h1>{genre} Movies</h1>
                <ul>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <PartialMovieCard key={movie.id} film={movie}
                        />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
                </ul>
            </div>
            
          );
    
}