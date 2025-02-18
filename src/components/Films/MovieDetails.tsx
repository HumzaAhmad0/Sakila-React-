import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { useParams } from "react-router"
import { baseUrl } from "../../config"
import { Film } from "../../types"


export default function MovieDetails(){
        const [movie, setMovie] = useState<Film|null>(null)
        const {id} = useParams()
    
        useEffect(()=>{
            fetch(`${baseUrl}/films/${id}`).then(res => res.json()).then(setMovie)
        }, [id])
    
        return <ul>
            {movie && <MovieCard film={movie}
            />}
        </ul>
    
}