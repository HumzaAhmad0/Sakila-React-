import { useEffect, useState } from "react"
import GenreCard from "./GenreCard"
import { baseUrl } from "../../config"
import { Genre } from "../../types"

export default function GenreList(){
    const [genres, setGenres] = useState<Genre[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${baseUrl}/genres`)
        .then(res => {
            if(!res.ok) throw new Error(`Genre not found, ERROR ${res.status}`)
            return res.json()
        })
        .then(setGenres)
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return (
        // <p>loading...</p>
        <div className="header">
                        <h1 className="titleMain">L o a d i n g  .  .  .</h1>
        </div>
        )
    if(error !== null) return <p>{error.message}</p>
    if(genres === null) return <p>failed to load actor</p>

    return(
        // <div className="cards-container-main">
            <div className="cards-container">
                <div className="header">
                    <h1 className="titleMain">List of All Genres</h1>
                </div>
                <div className="actors-list" data-testid="list-of-genres">
                    {genres.map((genre, index) => 
                        <GenreCard key={genre.name} name={genre.name} index={index+1} />
                    )}
                </div>
            </div>
        // </div>
)
}