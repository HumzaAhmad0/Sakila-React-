import { Link } from "react-router";

interface PartialActorCardProps{
    id: number,
    fullName: string,
}


export default function PartialActorCard(props: PartialActorCardProps){
    return(
        <article>
            <h1>{props.fullName}</h1>
            <Link to={`/actor/${props.id}`}>More Information</Link>
        </article>
    )
}