import { useEffect, useState } from "react"
import SpotLight from "./SpotLight"
import SubLight from "./SubLight"

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


    return (
        <div>
        {movies.length > 0 && (
          <SpotLight
            id={movies[0].id}
            title={movies[0].title}
            description={movies[0].description}
            releaseYear={movies[0].releaseYear}
            score={movies[0].score}
          />
        )}
  
        <div className="sublight-container">
          {movies.slice(1).map((movie) => (
            <SubLight
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseYear={movie.releaseYear}
              score={movie.score}
            />
          ))}
        </div>
      </div>
    )

}