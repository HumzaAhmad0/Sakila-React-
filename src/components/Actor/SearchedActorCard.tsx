import { Link, useNavigate } from "react-router"
import { baseUrl } from "../../config"
import { Actor } from "../../types";

interface SearchedActorCardProps{
    actor: Actor
}

async function DeleteActor(id: number){
    return fetch(`${baseUrl}/actors/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
        } else {
        }
    })
    .catch(error => console.error("Error:", error));
}

export default function SearchedActorCard(props: SearchedActorCardProps){
    const {id, firstName, lastName, fullName, films} = props.actor;
    const navigate = useNavigate();
 
    const handleDelete = ()=>{
        DeleteActor(id).then( () =>{
            navigate("/actors")
        })
    }

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