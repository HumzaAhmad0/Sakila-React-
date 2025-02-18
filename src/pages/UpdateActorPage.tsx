import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../config";

interface Film {
    id: number;
    title: string;
    releaseDate: number;
}

interface Actor{
    id: number,
    firstName: string,
    lastName: string,
    fullName: string,
    films: {id: number, title: string, releaseDate: number}[]
}


export default function UpdateActorPage(){
    const[actor, setActor] = useState<Actor|null>(null)
    const[error, setError] = useState<Error|null>(null)
    const[loading, setLoading] = useState(true)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [movies, setMovies] = useState("");

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Actor ID:", id);
    }, [id]);

    useEffect(()=>{
        fetch(`${baseUrl}/actors/${id}`)
        .then(res => {
           if (!res.ok) throw new Error(`Actor not found, ERROR ${res.status}`)
           return res.json()
        })
        .then((data)=>{
            setActor(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMovies(data.films.map((film:Film) => film.id).join(", "));
        })
        .catch(setError)
        .finally(()=>setLoading(false))
    }, [id])

    if(loading) return <p>loading...</p>
    if(error !== null) return <p>{error.message}</p>
    if(actor === null) return <p>failed to load actor</p>

    const handleSubmitActor = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // if (!firstName || !lastName || !movies) {
        //   alert("Please fill out all fields.");
        //   return;
        // }
    
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
              console.log("Actor updated:", result); 
      
              setFirstName("");
              setLastName("");
              setMovies("");
              alert("Actor updated successfully!");
              navigate(`/actor/${id}`);
            })
            .catch((error) => {
              console.error("Error updated actor:", error);
              alert("An error occurred while updating the actor.");
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