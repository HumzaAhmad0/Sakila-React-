import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../config";


export default function ReplaceActorPage(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [movies, setMovies] = useState("");


    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Actor ID:", id);
    }, [id]);

    const handleSubmitActor = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!firstName || !lastName || !movies) {
          alert("Please fill out all fields.");
          return;
        }
    
        const movieIds = movies
          .split(",") 
          .map((movie) => parseInt(movie.trim())) 
          .filter((movie) => !isNaN(movie));
    
        const actorData = {
          firstName,
          lastName,
          films: movieIds, 
        };
    
        console.log(actorData); 

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
            .then((result) => {
              console.log("Actor replaced:", result); 
      
              setFirstName("");
              setLastName("");
              setMovies("");
              alert("Actor replaced successfully!");
              navigate(`/actor/${id}`);
            })
            .catch((error) => {
              console.error("Error replacing actor:", error);
              alert("An error occurred while replacing the actor.");
            });
      };
    
    return(
        <div>
        <h1>Replace Actor</h1>
        <form onSubmit={handleSubmitActor}>
            <label> ID: <input
            //   type="number"
              value={id}
              disabled
              readOnly
            />
            </label>
            <br />
            <label> First Name: <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </label>
            <br />
            <label>Last Name:<input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <br />
            <label>Movies starred in (comma-separated IDs):<input
                type="text"
                value={movies}
                onChange={(e) => setMovies(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
      </div>
    )
}