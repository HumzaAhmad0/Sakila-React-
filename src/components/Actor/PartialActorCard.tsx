import { Link } from "react-router";
import "./PartialActorCard.css"
import { PartialActor } from "../../types";
// import { baseUrl } from "../../config";

interface PartialActorCardProps{
    actor: PartialActor
    index: number
}
// async function DeleteActor(id: number){
//     return fetch(`${baseUrl}/actors/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (response.ok) {
//         } else {
//         }
//     })
//     .catch(error => console.error("Error:", error));
// }

export default function PartialActorCard(props: PartialActorCardProps){
        // const {id} = props.actor;

     
        // const handleDelete = ()=>{
        //     DeleteActor(id).then( () =>{

        //     })
        // }
    return(
        <article className="card">
            <h1 data-testid={`actorlist-name-${props.index}`} className="actor-name">{props.actor.fullName.toLowerCase().replace(/\b(\s\w|^\w)/g, function (letter) { return letter.toUpperCase(); })}</h1>
            <Link data-testid={`actorlist-moreinfo-${props.index}`} className="more-info" to={`/actor/${props.actor.id}` }>More Information</Link>
            {/* <button onClick={handleDelete} className="delete-btn" data-testid="specific-actor-delete-button">Delete Actor</button> */}
        </article>
    )
}