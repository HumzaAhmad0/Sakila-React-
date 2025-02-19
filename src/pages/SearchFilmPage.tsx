import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Film } from "../types";
import { baseUrl } from "../config";
import PartialMovieCard from "../components/Films/PartialMovieCard";

export default function SearchFilmPage() {
    const [id, setId] = useState<number | undefined>(undefined);
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [releaseYear, setReleaseYear] = useState<number | undefined>(undefined);
    const [sortByScore, setSortByScore] = useState<number|null>(null);

    const [movies, setMovies] = useState<Film[]>([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); 

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        setLoading(true);

        if (id) {
            navigate(`/film/${id}`);
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
            <h1>Film Search</h1>
            <form onSubmit={handleSubmitSearch}>
                <label>
                    ID: <input
                        type="number"
                        onChange={(e) => setId(Number(e.target.value))}
                    />
                </label>
                <br />
                
                <label>
                    Title: <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <br />
                
                <label>
                    Genre:
                    <select onChange={(e) => setGenre(e.target.value)}>
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
                <br />
                
                <label>
                    Rating:
                    <select onChange={(e) => setRating(e.target.value)}>
                        <option value="">--Select Rating--</option>
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                    </select>
                </label>
                <br />
                
                <label>
                    Release Year: <input
                        type="number"
                        onChange={(e) => setReleaseYear(Number(e.target.value))}
                    />
                </label>
                <br />
                
                <label>
                    Sort by Score:
                    <select
                        onChange={(e) => setSortByScore(e.target.value === "" ? null : Number(e.target.value))}
                    >
                        <option value="">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </label>
                <br />
                
                <button type="submit">Search</button>
                <Link to="/films">Go back</Link>
            </form>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {movies.length === 0 && !loading && !error && <h1>No results found</h1>}

            {movies.length > 0 && (
                <div className="cards-container-main">
                    <div className="cards-container">
                    <div><h1>List of Filtered Films</h1></div>
                        {movies.map((movie) => (
                            <PartialMovieCard key={movie.id} film={movie} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
