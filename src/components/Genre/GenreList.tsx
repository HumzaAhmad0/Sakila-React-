import { useEffect, useState } from "react"
import GenreCard from "./GenreCard"

interface Genre{
    name: string
}

export default function GenreList(){
    const [genres, setGenres] = useState<Genre[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:8080/genres")
        .then(res => {
            if(!res.ok) throw new Error(`Genre not found, ERROR ${res.status}`)
            return res.json()
        })
        .then(setGenres)
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>loading...</p>
    if(error !== null) return <p>{error.message}</p>
    if(genres === null) return <p>failed to load actor</p>

    return <ul>
        {genres.map(genre => <GenreCard name={genre.name}/>)}
    </ul>
}