import { useState } from "react";

export default function CreateActorPage(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [movies, setMovies] = useState("");

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
    
        console.log(actorData); // Handle the data here (API call, etc.)

        fetch("http://localhost:8080/actors", {
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
              console.log("Actor created:", result); 
      
              setFirstName("");
              setLastName("");
              setMovies("");
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
        <form onSubmit={handleSubmitActor}>
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