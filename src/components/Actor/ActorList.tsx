import { useEffect, useState } from "react"
import PartialActorCard from "./PartialActorCard"

interface Actor{
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    films: [{id: number, title: string, releaseYear: number}]
}



export default function ActorList(){
    const [actors, setActors] = useState<Actor[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch("http://localhost:8080/actors")
        .then(res => {
            if(!res.ok) throw new Error(`Actors not found, ERROR ${res.status}`)
            return res.json()
        })
        .then(setActors)
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [])

    if(loading) return <p>loading...</p>
    if(error !== null) return <p>{error.message}</p>
    if(actors === null) return <p>failed to load actor</p>

    return (
        <div className="cards-container-main">
          <div className="cards-container">
            {actors.map((actor) => (
              <PartialActorCard
                key={actor.id}
                id={actor.id}
                fullName={actor.fullName}
              />
            ))}
          </div>
        </div>
      )
}
