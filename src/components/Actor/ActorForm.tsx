import { useState } from "react";
import { ActorData, ActorSubmission, PartialFilmForActor } from "../../types";


interface ActorFormProps{
    initialData?: ActorData
    onSubmit: (data: ActorSubmission) => void
}

export default function ActorForm(props: ActorFormProps){
    const [firstName, setFirstName] = useState(props.initialData?.firstName ?? "");
    const [lastName, setLastName] = useState(props.initialData?.lastName ?? "");
    const filmIds = props.initialData?.films.map((film:PartialFilmForActor) => film.id).join(", ")
    const [movies, setMovies] = useState(filmIds??"");

    function handleSubmitActor(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
    
        if (!firstName || !lastName || !movies) {
          alert("Please fill out all fields.");
          return;
        }

        const films = movies
        .split(",") 
        .map((movie) => parseInt(movie.trim())) 
        .filter((movie) => !isNaN(movie));

        props.onSubmit({firstName, lastName, films})
    }

    return(
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
    )
}