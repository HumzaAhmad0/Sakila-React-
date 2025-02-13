import { useEffect, useState } from "react";
import PartialMovieCard from "./PartialMovieCard";

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


export default function MovieList(){
    const [movies, setMovies] = useState<Movie[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:8080/films")
        .then(res => {
            if(!res.ok) throw new Error(`Movies not found, ERROR ${res.status}`)
            return res.json()
        })
        .then(setMovies)
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>loading...</p>
    if(error !== null) return <p>{error.message}</p>
    if(movies === null) return <p>failed to load movies</p>

    return <ul>
        {movies.map(movie => <PartialMovieCard title={movie.title} description={movie.description} releaseYear={movie.releaseYear} id={movie.id}/>)}
    </ul>

}