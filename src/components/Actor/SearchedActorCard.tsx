import { Actor } from "../../types";

interface SearchedActorCardProps{
    actor: Actor
}

export default function SearchedActorCard(props: SearchedActorCardProps){
    const {id, firstName, lastName, fullName, films} = props.actor;

    return(
        <article data-testid="searched-actor-article">
            <h1 data-testid="searched-actor-id">{id}</h1>
            <p data-testid="searched-actor-first-name">{firstName}</p>
            <p data-testid="searched-actor-last-name">{lastName}</p>
            <p data-testid="searched-actor-full-name">{fullName}</p>
            <p>Films: {films?.map(film=> <li data-testid="searched-actor-film-titles" key={film.id}>{film.title} {film.releaseYear}</li>)}</p>
        </article>
    )
}