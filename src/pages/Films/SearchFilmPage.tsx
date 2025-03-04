import { useState } from "react";
import { Link } from "react-router";
import { Film } from "../../types";
import { baseUrl } from "../../config";
import PartialMovieCard from "../../components/Films/PartialMovieCard";
import SearchedMovieCard from "../../components/Films/SearchedMovieCard";
import './SearchFilm.css'

export default function SearchFilmPage() {
    const [id, setId] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);
    const [sortByScore, setSortByScore] = useState<number|null>(null);

    const [movies, setMovies] = useState<Film[]>([]); 
    const [movie, setMovie] = useState<Film|null>(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setMovie(null)
        setMovies([])
        setError(null)

        setLoading(true);

        if (id) {
            fetch(`${baseUrl}/films/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Film not found, ERROR ${res.status}`)
                return res.json()
                })
            .then(setMovie)
            .catch((error)=>{
                setError(error.message);
            })
            .finally(()=>setLoading(false))
        } else {
            let queryString = "/films?";
            if (title) queryString += `title=${title}&`;
            if (genre) queryString += `categoryName=${genre}&`;
            if (rating) queryString += `rating=${rating}&`;
            if (releaseYear) queryString += `year=${releaseYear}&`;
            if (sortByScore !== null) queryString += `sortByScore=${sortByScore}&`;

            queryString = queryString.endsWith("&") ? queryString.slice(0, -1) : queryString;

            fetch(`${baseUrl}${queryString}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Movies not found, ERROR ${res.status}`);
                    }
                    return res.json();
                })
                .then(setMovies)
                .catch(setError)
                .finally(()=>setLoading(false));
        }
    };

    return (
        <div>
            <div className="header">
                <h1 className="titleMain">Search Film</h1>
            </div>
            <form className="search-film-form" onSubmit={handleSubmitSearch}>
                <div className="search-film-card">
                    <div className="form-row">
                        <label className="form-label">
                            ID:
                            <input
                                className="form-input id-input"
                                data-testid="film-search-id"
                                type="number"
                                value={id || ""}
                                onChange={(e) => setId(e.target.value ? Number(e.target.value) : undefined)}
                                disabled={title !== "" || genre !== "" || rating !== "" || releaseYear !== undefined || sortByScore !== null}
                            />
                        </label>
                        <label className="form-label">
                            Title:
                            <input
                                className="form-input title-input"
                                data-testid="film-search-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={id !== undefined}
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label className="form-label">
                            Genre:
                            <select
                                className="form-input"
                                data-testid="film-search-genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                disabled={id !== undefined}
                            >
                                <option value="">--Select Genre--</option>
                                <option value="Action">Action</option>
                                <option value="Animation">Animation</option>
                                <option value="Children">Children</option>
                                <option value="Classics">Classics</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Documentary">Documentary</option>
                                <option value="Drama">Drama</option>
                                <option value="Family">Family</option>
                                <option value="Foreign">Foreign</option>
                                <option value="Games">Games</option>
                                <option value="Horror">Horror</option>
                                <option value="Music">Music</option>
                                <option value="New">New</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Sports">Sports</option>
                                <option value="Travel">Travel</option>
                            </select>
                        </label>
                        <label className="form-label">
                            Rating:
                            <select
                                className="form-input"
                                data-testid="film-search-rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                disabled={id !== undefined}
                            >
                                <option value="">--Select Rating--</option>
                                <option value="G">G</option>
                                <option value="PG">PG</option>
                                <option value="PG-13">PG-13</option>
                                <option value="R">R</option>
                                <option value="NC-17">NC-17</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-row">
                        <label className="form-label">
                            Release Year:
                            <input
                                className="form-input"
                                data-testid="film-search-release-year"
                                type="number"
                                value={releaseYear || ""}
                                onChange={(e) => setReleaseYear(e.target.value ? Number(e.target.value) : undefined)}
                                disabled={id !== undefined}
                            />
                        </label>
                        <label className="form-label">
                            Sort by Score:
                            <select
                                className="form-input"
                                data-testid="film-search-score"
                                value={sortByScore || ""}
                                onChange={(e) => setSortByScore(e.target.value === "" ? null : Number(e.target.value))}
                                disabled={id !== undefined}
                            >
                                <option value="">None</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-row">
                        <button className="submit-btn" data-testid="film-search-submit-button" type="submit">Search</button>
                        <Link className="back-link" data-testid="film-search-go-back" to="/films">Go back</Link>
                    </div>
                </div>
            </form>

            {loading && <h1 className="titleMain">Loading...</h1>}

            {error && <h1 className="titleMain" data-testid="film-search-error-message">{error}</h1>}

            {movies.length === 0 && movie === null && !loading && !error && <h1 className="titleMain" data-testid="film-search-no-results">No results found</h1>}

            {movie && <SearchedMovieCard data-testid="film-by-id-result" film={movie} />}

            {movies.length > 0 && (
                    <div className="cards-container-main">
                        <div className="cards-container">
                            <div className="header">
                                <h1 className="titleMain">List of Filtered Films</h1>
                            </div>
                            <div className="films-list" data-testid="list-of-films">
                                {movies.map((movie, index) => 
                                    <PartialMovieCard key={movie.id} film={movie} index={index+1} />
                                )}
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
}
