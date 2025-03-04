import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../../config";
import { Actor } from "../../types";
import ActorForm from "../../components/Actor/ActorForm";



export default function UpdateActorPage(){
    const[actor, setActor] = useState<Actor|null>(null)
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    const [initalFName, setInitialFName] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`${baseUrl}/actors/${id}`)
        .then(res => {
           if (!res.ok) throw new Error(`Actor not found, ERROR ${res.status}`)
           return res.json()
        })
        .then((data)=>{
            setActor(data);
            setInitialFName(data.fullName);
        })
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [id])

    if(loading) return (
      // <p>loading...</p>
      <div className="header">
                      <h1 className="titleMain">L o a d i n g  .  .  .</h1>
      </div>
      )
    if(error !== null) return <p data-testid="specific-actor-not-found">{error.message}</p>
    if(actor === null) return <p>failed to load actor</p>

    const handleReset = () => {
      window.location.reload();
  };

    const handleSubmitActor = (actorData: {
      firstName: string
      lastName: string
      films: number[]
    }) => {
      fetch(`${baseUrl}/actors/${id}`, {
        method: "PUT",
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
          alert("Actor updated successfully!");
          navigate(`/actor/${id}`);
        })
        .catch((error) => {
          console.error("Error updated actor:", error);
          alert("An error occurred while updating the actor.");
        });
    }
        
    return(
      <div className="cards-container">
        <div className="header">
            <h1 className="titleMain">Edit Actor: {initalFName} {id}</h1>
        </div>
        <div><ActorForm initialData={actor} onSubmit={handleSubmitActor}/></div>
        <button  className="more-info" data-testid="reset-update-actor-page-button" onClick={handleReset}>reset</button>
      </div>
    )
};
    
