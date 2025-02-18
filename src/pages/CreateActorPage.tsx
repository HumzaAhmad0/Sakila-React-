import { baseUrl } from "../config";
import ActorForm from "../components/ActorForm";

export default function CreateActorPage(){

    const handleSubmitActor = (actorData: {
            firstName: string
            lastName: string
            films: number[]
        }) => {
    

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
            .then((result) => {
              alert("Actor created successfully!");
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