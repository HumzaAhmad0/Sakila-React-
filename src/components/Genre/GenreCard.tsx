import { Link } from "react-router"

interface GenreCardProps{
    name: string
}


export default function GenreCard(props: GenreCardProps){
    return(
        <article>
            <h1>{props.name}</h1>
            <Link to={`/genre/${props.name}`}>Movies for this Genre</Link>
        </article>
    )
}