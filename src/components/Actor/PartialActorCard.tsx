import { Link } from "react-router";
import "./PartialActorCard.css"

interface PartialActorCardProps{
    id: number,
    fullName: string,
}


export default function PartialActorCard(props: PartialActorCardProps){
    return(
        <article className="card">
            <h1 className="actor-name">{props.fullName}</h1>
            <Link className="more-info" to={`/actor/${props.id}` }>More Information</Link>
        </article>
    )
}