import { baseUrl } from "../config";
import ActorForm from "../components/Actor/ActorForm";
import { useNavigate } from "react-router";
import { ActorSubmission } from "../types";

export default function CreateActorPage(){
    const navigate = useNavigate();
    const handleSubmitActor = (actorData: ActorSubmission) => {
        fetch(`${baseUrl}/actors`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify(actorData), 
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
              }
              return response.json(); 
            })
            .then(() => {
              alert("Actor created successfully!");
              navigate(`/actors`);

            })
            .catch((error) => {
              console.error("Error creating actor:", error);
              alert("An error occurred while creating the actor.");
            });
      };
    
    return(
        <div>
        <h1>Create Actor</h1>
        <ActorForm onSubmit={handleSubmitActor}/>
      </div>
    )
}