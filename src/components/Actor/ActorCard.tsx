import { Link, useNavigate } from "react-router"
import { baseUrl } from "../../config"
import { Actor } from "../../types";
import './ActorCard.css'

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
    // const {id, firstName, lastName, fullName, films} = props.actor;
    const {id, fullName, films} = props.actor;
    const navigate = useNavigate();
 
    const handleDelete = ()=>{
        DeleteActor(id).then( () =>{
            navigate("/actors")
        })
    }

    return(
        <div className="actor-card-container" data-testid="specific-actor-article">
            <div className="actor-card">
                <h1 className="actor-id" data-testid="specific-actor-id">ID: {id}</h1>
                {/* <p className="actor-first-name" data-testid="specific-actor-first-name">{firstName}</p>
                <p className="actor-last-name" data-testid="specific-actor-last-name">{lastName}</p> */}
                <h2 className="actor-full-name" data-testid="specific-actor-full-name">{fullName}</h2>
                <p className="actor-first-name"><strong> Films:</strong></p>
                <ul className="actor-film-list">
                    {films?.map(film => (
                    <li key={film.id} className="actor-film" data-testid="specific-actor-film-titles">
                        {film.title} {film.releaseYear}
                    </li>
                    ))}
                </ul>
            </div>
            <div className="button-container">
                <Link to="/actors" className="more-info" data-testid="actor-all-actors-link">List of All Actors</Link>
                <Link to={`/updateActor/${id}`} className="more-info" data-testid="specific-actor-update-link">Update Actor</Link>
                <button onClick={handleDelete} className="delete-btn" data-testid="specific-actor-delete-button">Delete Actor</button>
            </div>
        </div>

    )
}