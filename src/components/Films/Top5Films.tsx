import { useEffect, useState } from "react"
import PartialMovieCard from "./PartialMovieCard"

interface Movie{
    id: number,
    title: string,
    description: string,
    releaseYear: number,
    language: {id: number, name: string},
    movieLength: number,
    rating: string,
    cast: [{id: number, fullName: string}],
    genre: [{id: number, fullName: string}],
    score: number,
    rentalRate: number,
    rentalDuration: number,
    rental: string
}

export default function Top5Films(){
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(()=>{
        fetch("http://localhost:8080/films?sortByScore=1").then(res => res.json()).then(setMovies)
    }, [])


    return <ul>
        {movies.map(movie => <PartialMovieCard title={movie.title} description={movie.description} releaseYear={movie.releaseYear} score={movie.score}/>)}
    </ul>

}