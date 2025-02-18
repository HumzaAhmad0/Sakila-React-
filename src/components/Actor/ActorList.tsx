import { useEffect, useState } from "react"
import PartialActorCard from "./PartialActorCard"
import { Link } from "react-router"
import { baseUrl } from "../../config"
import { PartialActor } from "../../types"

export default function ActorList(){
    const [actors, setActors] = useState<PartialActor[]>([])
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    useEffect(()=>{
        fetch(`${baseUrl}/actors`)
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
          <Link className="" to="/createActor">Click me</Link>
            {actors.map((actor) => (
              <PartialActorCard
                key={actor.id}
                actor={actor}
              />
            ))}
          </div>
        </div>
      )
}
