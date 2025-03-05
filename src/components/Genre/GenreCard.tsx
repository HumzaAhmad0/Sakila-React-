import { Link } from "react-router"

interface GenreCardProps{
    name: string
    index: number
}


export default function GenreCard(props: GenreCardProps){
    return(
        <article className="card">
            <h1 data-testid={`genre-name-${props.index}`} className="actor-name">{props.name}</h1>
            <Link data-testid={`genre-movie-list-${props.index}`} to={`/genre/${props.name}`} className="more-info">Movies for this Genre</Link>
        </article>
    )
}