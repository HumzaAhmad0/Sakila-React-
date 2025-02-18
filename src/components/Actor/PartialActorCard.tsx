import { Link } from "react-router";
import "./PartialActorCard.css"
import { PartialActor } from "../../types";

interface PartialActorCardProps{
    actor: PartialActor
}


export default function PartialActorCard(props: PartialActorCardProps){
    return(
        <article className="card">
            <h1 className="actor-name">{props.actor.fullName}</h1>
            <Link className="more-info" to={`/actor/${props.actor.id}` }>More Information</Link>
        </article>
    )
}