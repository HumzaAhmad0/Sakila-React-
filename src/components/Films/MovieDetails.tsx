import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { useParams } from "react-router"

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

export default function MovieDetails(){
       const [movie, setMovie] = useState<Movie|null>(null)
        const {id} = useParams()
    
        useEffect(()=>{
            fetch(`http://localhost:8080/films/${id}`).then(res => res.json()).then(setMovie)
        }, [id])
    
        console.log(movie)

        return <ul>
            {movie && <MovieCard 
            title={movie.title}
            description={movie.description}
            releaseYear={movie.releaseYear}
            language={movie.language}
            movieLength={movie.movieLength}
            rating={movie.rating}
            cast={movie.cast} 
            genre={movie.genre} 
            score={movie.score}
            rental={movie.rental}
            />}
        </ul>
    
}