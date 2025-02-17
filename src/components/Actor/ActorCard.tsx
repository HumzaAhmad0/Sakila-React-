import { Link } from "react-router"

interface ActorCardProps{
    id?: number,
    firstName: string,
    lastName: string,
    fullName: string,
    films: {id: number, title: string, releaseDate: number}[]
}


export default function ActorCard(props: ActorCardProps){
    
    console.log("ActorCard props:", props);
    
    return(
        <article>
            <h1>{props.id}</h1>
            <p>{props.firstName}</p>
            <p>{props.lastName}</p>
            <p>{props.fullName}</p>
            <p>Films: {props.films?.map(films=> <li>{films.title} {films.releaseDate}</li>)}</p>
            <Link to={`/replaceActor/${props.id}`}>Replace Actor</Link>
            <Link to={`/updateActor/${props.id}`}>Update Actor</Link>
        </article>
    )
}