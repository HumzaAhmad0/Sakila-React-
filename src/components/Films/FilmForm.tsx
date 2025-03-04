import { useState } from "react";
import { FilmData, FilmSubmission } from "../../types";
import { Link } from "react-router";
import './FilmForm.css'

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



        if (title.length > 128) {
            alert("Title is limited to 128 characters.");
            return;
        }

        if (releaseYear < 1901 || releaseYear > 2155) {
            alert("Release Year has to be within the range of 1901-2155");
            return;
        }

        if (language < 1 || language > 16) {
            alert("Language ID must be between 1 and 16.");
            return;
        }

        if (movieLength < 1 || movieLength > 32767 ) {
            alert("Movie Duration must be between 1 and 32767 minutes.");
            return;
        }

        if (rating === "") {
            alert("Please select a rating.");
            return;
        }

        if (title === "" && description === "" && actors === "" && genres === "") {
            alert("Please fill out all fields.");
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
        <form onSubmit={handleSubmitFilm} className="form-card">
            <label>Title:
                <input
                    className="form-input"
                    data-testid="film-form-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>Description:
                <textarea
                    className="form-input"
                    data-testid="film-form-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>Release Year:
                <input
                    className="form-input"
                    data-testid="film-form-release_year"
                    type="number"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(Number(e.target.value))}
                />
            </label>
            <label>Language ID (number from 1-16):
                <input
                    className="form-input"
                    data-testid="film-form-language"
                    type="number"
                    value={language}
                    onChange={(e) => setLanguage(Number(e.target.value))}
                />
            </label>
            <label>Movie Duration in minutes (number from 1-32767):
                <input
                    className="form-input"
                    data-testid="film-form-duration"
                    type="number"
                    value={movieLength}
                    onChange={(e) => setMovieLength(Number(e.target.value))}
                />
            </label>
            <label>Rating:
                <select
                    className="form-input"
                    data-testid="film-form-rating"
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
            <label>Actor IDs (comma-separated IDs):
                <input
                    className="form-input"
                    data-testid="film-form-cast"
                    type="text"
                    value={actors}
                    onChange={(e) => setActors(e.target.value)}
                />
            </label>
            <label>Genre IDs (comma-separated IDs[1-16]):
                <input
                    className="form-input"
                    data-testid="film-form-genres"
                    type="text"
                    value={genres}
                    onChange={(e) => setGenres(e.target.value)}
                />
            </label>
            <label>Score (from 0.00 to 100):
                <input
                    className="form-input"
                    data-testid="film-form-score"
                    type="number"
                    step="0.01"
                    value={score}
                    onChange={(e) => setScore(parseFloat(e.target.value))}
                />
            </label>
            <label>Rental Rate (from 0.00 to 99.99):
                <input
                    className="form-input"
                    data-testid="film-form-rental_rate"
                    type="number"
                    step="0.01"
                    value={rentalRate}
                    onChange={(e) => setRentalRate(parseFloat(e.target.value))}
                />
            </label>
            <label>Rental Duration (from 1-255):
                <input
                    className="form-input"
                    data-testid="film-form-rental_duration"
                    type="number"
                    value={rentalDuration}
                    onChange={(e) => setRentalDuration(Number(e.target.value))}
                />
            </label>
            <br />
            <button className="submit-btn" data-testid="film-form-submit-button" type="submit">Submit</button>
            <Link className="back-link" data-testid="film-form-back-button" to="/films">Go back</Link>
        </form>

    );
}
