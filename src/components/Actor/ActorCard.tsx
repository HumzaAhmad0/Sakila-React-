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
        <article>
            <h1>{id}</h1>
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{fullName}</p>
            <p>Films: {films?.map(film=> <li key={film.id}>{film.title} {film.releaseYear}</li>)}</p>
            <Link to={`/updateActor/${id}`}>Update Actor</Link>
            <button onClick={handleDelete}>Delete</button>
            <br />
            <Link to="/actors">List of All Actors</Link>
        </article>
    )
}