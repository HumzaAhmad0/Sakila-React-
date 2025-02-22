import { Link, useNavigate } from "react-router"
import { baseUrl } from "../../config"
import { Actor } from "../../types";

interface ActorCardProps{
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

export default function ActorCard(props: ActorCardProps){
    const {id, firstName, lastName, fullName, films} = props.actor;
    const navigate = useNavigate();
 
    const handleDelete = ()=>{
        DeleteActor(id).then( () =>{
            navigate("/actors")
        })
    }

    return(
        <article data-testid="specific-actor-article">
            <h1 data-testid="specific-actor-id">{id}</h1>
            <p data-testid="specific-actor-first-name">{firstName}</p>
            <p data-testid="specific-actor-last-name">{lastName}</p>
            <p data-testid="specific-actor-full-name">{fullName}</p>
            <p>Films: {films?.map(film=> <li data-testid="specific-actor-film-titles" key={film.id}>{film.title} {film.releaseYear}</li>)}</p>
            <Link data-testid="specific-actor-update-link" to={`/updateActor/${id}`}>Update Actor</Link>
            <button data-testid="specific-actor-delete-button" onClick={handleDelete}>Delete</button>
            <br />
            <Link data-testid="specific-actor-all-actors-link" to="/actors">List of All Actors</Link>
        </article>
    )
}