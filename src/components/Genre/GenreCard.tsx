import { Link } from "react-router"

interface GenreCardProps{
    name: string
    index: number
}


export default function GenreCard(props: GenreCardProps){
    return(
        <article>
            <h1 data-testid={`genre-name-${props.index}`}>{props.name}</h1>
            <Link data-testid={`genre-movielist-${props.index}`} to={`/genre/${props.name}`}>Movies for this Genre</Link>
        </article>
    )
}