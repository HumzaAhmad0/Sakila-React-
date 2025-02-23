import { useState } from "react";
import { ActorData, ActorSubmission, PartialFilmForActor } from "../../types";
import { Link } from "react-router";


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

        if (firstName.length > 45 && lastName.length > 45) {
            alert("First and Last name fields are limited to 45 characters.");
            return;
        }
    
        if (firstName.length > 45) {
            alert("First name is limited to 45 characters.");
            return;
        }
    
        if (lastName.length > 45) {
            alert("Last name is limited to 45 characters.");
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
                data-testid="actor-form-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            </label>
            <br />
            <label>Last Name:<input
                data-testid="actor-form-last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <br />
            <label>Movies starred in (comma-separated IDs):<input
                data-testid="actor-form-film-list"
                type="text"
                value={movies}
                onChange={(e) => setMovies(e.target.value)}
                />
            </label>
            <br />
            <button data-testid="actor-form-submit-button" type="submit">Submit</button>
            <Link data-testid="actor-form-back-button" to="/actors">Go back</Link>
        </form>
    )
}