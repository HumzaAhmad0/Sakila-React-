import { useState } from "react";
import { FilmData, FilmSubmission } from "../../types";
import { Link } from "react-router";

interface FilmFormProps {
    initialData?: FilmData;
    onSubmit: (data: FilmSubmission) => void;
}

export default function FilmForm(props: FilmFormProps) {
    const currentYear = new Date().getFullYear();
    const [title, setTitle] = useState(props.initialData?.title ?? "");
    const [description, setDescription] = useState(props.initialData?.description ?? "");
    const [releaseYear, setReleaseYear] = useState<number>(props.initialData?.releaseYear ?? currentYear);
    const [language, setLanguage] = useState<number>(props.initialData?.language.id ?? 1);
    const [movieLength, setMovieLength] = useState<number>(props.initialData?.movieLength ?? 1);
    const [rating, setRating] = useState(props.initialData?.rating ?? "G");
    const [actors, setActors] = useState<string>(props.initialData?.cast.map(actor => actor.id).join(", ") ?? "");
    const [genres, setGenres] = useState<string>(props.initialData?.genre.map(genre => genre.id).join(", ") ?? "");
    const [score, setScore] = useState<number>(props.initialData?.score ?? 0);
    const [rentalRate, setRentalRate] = useState<number>(props.initialData?.rentalRate ?? 0);
    const [rentalDuration, setRentalDuration] = useState<number>(props.initialData?.rentalDuration ?? 1);

    function handleSubmitFilm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (title === "" && description === "" && rating === "" && actors === "" && genres === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (title === "" && description === "" && actors === "" && genres === "") {
            alert("Please fill out all fields.");
            return;
        }

        if (title.length > 128) {
            alert("Title is limited to 128 characters.");
            return;
        }

        if (releaseYear < 1901 || releaseYear > 2155) {
            alert("Release Year has to be within the range of 1901-2155");
            return;
        }

        if (title === "") {
            alert("Please fill out the title field.");
            return;
        }

        if (description === "") {
            alert("Please fill out the description field.");
            return;
        }

        if (actors === "") {
            alert("Please fill out the actors field.");
            return;
        }

        
        if (genres === "") {
            alert("Please fill out the genres field.");
            return;
        }




        const actorIds = actors.split(",")
        .map(actor => parseInt(actor.trim()))
        .filter(id => !isNaN(id));
        const genreIds = genres.split(",")
        .map(genre => parseInt(genre.trim()))
        .filter(id => !isNaN(id));

        if (genreIds.some(id => id < 1 || id > 16)) {
            alert("Genre IDs must be between 1 and 16.");
            return;
        }

        props.onSubmit({
            title,
            description,
            releaseYear,
            language,
            movieLength,
            rating,
            actors: actorIds,
            genre: genreIds,
            score,
            rentalRate,
            rentalDuration,
        });
    }

    return (
        <form onSubmit={handleSubmitFilm}>
            <label>Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label>Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />
            <label>Release Year:
                <input
                    type="number"
                    min={0}
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(Number(e.target.value))}
                />
            </label>
            <br />
            <label>Language (number from 1-16):
                <input
                    type="number"
                    min={1}
                    max={16}
                    value={language}
                    onChange={(e) => setLanguage(Number(e.target.value))}
                />
            </label>
            <br />
            <label>Movie Duration in minutes (number from 1-32767):
                <input
                    type="number"
                    min={1}
                    max={32767}
                    value={movieLength}
                    onChange={(e) => setMovieLength(Number(e.target.value))}
                />
            </label>
            <br />
            <label>Rating:
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">--Select Rating--</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                </select>
            </label>
            <br />
            <label>Actors (comma-separated IDs):
                <input
                    type="text"
                    value={actors}
                    onChange={(e) => setActors(e.target.value)}
                />
            </label>
            <br />
            <label>Genres (comma-separated IDs[1-16]):
                <input
                    type="text"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                />
            </label>
            <br />
            <label>Score (from 0.00 to 100):
                <input
                    type="number"
                    min={0}
                    max={100}
                    step="0.01"
                    value={score}
                    onChange={(e) => setScore(parseFloat(e.target.value))}
                />
            </label>
            <br />
            <label>Rental Rate (from 0.00 to 99.99):
                <input
                    type="number"
                    min={0}
                    max={99.99}
                    step="0.01"
                    value={rentalRate}
                    onChange={(e) => setRentalRate(parseFloat(e.target.value))}
                />
            </label>
            <br />
            <label>Rental Duration (from 1-255):
                <input
                    type="number"
                    min={1}
                    max={255}
                    value={rentalDuration}
                    onChange={(e) => setRentalDuration(Number(e.target.value))}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
            <Link to="/films">Go back</Link>
        </form>
    );
}
