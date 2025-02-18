import { useEffect, useState } from "react"
import { useParams } from "react-router"
import PartialMovieCard from "./PartialMovieCard"
import { baseUrl } from "../../config"

interface Movie{
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    language: {id: number, name: string},
    movieLength: number,
    rating: string,
    cast: {id: number, fullName: string}[],
    genre: {id: number, name: string}[],
    score: number,
    rentalRate: number,
    rentalDuration: number,
    rental: string
}

export default function MovieByGenreList(){
        const [movies, setMovies] = useState<Movie[]>([])
        const {name: genre} = useParams()
    
        useEffect(()=>{
            fetch(`${baseUrl}/films?categoryName=${genre}`).then(res => res.json()).then(setMovies)
        }, [genre])
    
        console.log(movies)

        return (
            <div>
                <h1>{genre} Movies</h1>
                <ul>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <PartialMovieCard
                        key={movie.id}
                        title={movie.title}
                        description={movie.description}
                        releaseYear={movie.releaseYear}
                        score={movie.score}
                        />
                    ))
                ) : (
                    <p>No movies found</p>
                )}
                </ul>
            </div>
            
          );
    
}