import { useEffect, useState } from "react"
import SpotLight from "./SpotLight"
import SubLight from "./SubLight"
import { baseUrl } from "../../config"
import { Film } from "../../types"


export default function Top5Films(){
    const [movies, setMovies] = useState<Film[]>([])

    useEffect(()=>{
        fetch(`${baseUrl}/films?sortByScore=1`).then(res => res.json()).then(setMovies)
    }, [])

    return (
        <div>
        {movies.length > 0 && (
          <SpotLight film={movies[0] }
          />
        )}
  
        <div className="sublight-container">
          {movies.slice(1).map((movie) => (
            <SubLight key={movie.id} film={movie}
            />
          ))}
        </div>
      </div>
    )

}