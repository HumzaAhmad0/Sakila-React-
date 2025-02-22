import { useEffect, useState } from "react"
import ActorCard from "./ActorCard"
import { useParams } from "react-router"
import { baseUrl } from "../../config"
import { Actor } from "../../types"

export default function ActorDetails(){
    const {id} = useParams()

    const[actor, setActor] = useState<Actor|null>(null)
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)


    useEffect(()=>{
         fetch(`${baseUrl}/actors/${id}`)
         .then(res => {
            if (!res.ok) throw new Error(`Actor not found, ERROR ${res.status}`)
            return res.json()
         })
         .then(setActor)
         .catch(setError)
         .finally(()=>setLoading(false))
    }, [id])

    if(loading) return <p>loading...</p>
    if(error !== null) return <p>{error.message}</p>
    if(actor === null) return <p>failed to load actor</p>

    return <div>
        {actor && <ActorCard actor={actor} />}
    </div>

}