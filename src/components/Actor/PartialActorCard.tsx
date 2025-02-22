import { Link } from "react-router";
import "./PartialActorCard.css"
import { PartialActor } from "../../types";

interface PartialActorCardProps{
    actor: PartialActor
    index: number
}


export default function PartialActorCard(props: PartialActorCardProps){
    return(
        <article className="card">
            <h1 data-testid={`actorlist-name-${props.index}`} className="actor-name">{props.actor.fullName}</h1>
            <Link data-testid={`actorlist-moreinfo-${props.index}`} className="more-info" to={`/actor/${props.actor.id}` }>More Information</Link>
        </article>
    )
}