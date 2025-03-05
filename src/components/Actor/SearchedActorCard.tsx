import { Link } from "react-router";
import { Actor } from "../../types";

interface SearchedActorCardProps{
    actor: Actor
}

export default function SearchedActorCard(props: SearchedActorCardProps){
    // const {id, firstName, lastName, fullName, films} = props.actor;
    const {id, fullName, films} = props.actor;

    return(
        <div className="actor-card-container" data-testid="searched-actor-article">
            <div className="actor-card">
            <h1 className="actor-id" data-testid="searched-actor-id">ID: {id}</h1>
            {/* <p data-testid="searched-actor-first-name">{firstName}</p>
            <p data-testid="searched-actor-last-name">{lastName}</p> */}
            <h2 className="actor-full-name"  data-testid="searched-actor-full-name">{fullName}</h2>
            <p className="actor-first-name"><strong> Films:</strong></p>
            <ul className="actor-film-list">
                    {films?.map((film, index) => (
                    <li key={film.id} className="actor-film">
                        {/* {film.title.toLowerCase().replace(/\b(\s\w|^\w)/g, function (letter) { return letter.toUpperCase(); })} {film.releaseYear} */}
                        <Link  data-testid={`searched-actor-film-titles-${index + 1}`} to={`/film/${film.id}`}>{film.title.toLowerCase().replace(/\b(\s\w|^\w)/g, function (letter) { return letter.toUpperCase(); })}</Link>
                    </li>
                    ))}
                </ul>
            </div>
            <Link data-testid="searched-actor-more-info" to={`/actor/${id}`} className="more-info">Specific Actor Page</Link>
        </div>
    )
}