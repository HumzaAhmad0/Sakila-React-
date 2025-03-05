import { Link, useNavigate } from "react-router"
import { Film } from "../../types"
import { baseUrl } from "../../config";
import './MovieCard.css'
interface MovieCardProps{
    film: Film
}

async function DeleteFilm(id: number){
    return fetch(`${baseUrl}/films/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
        } else {
        }
    })
    .catch(error => console.error("Error:", error));
}


export default function MovieCard(props: MovieCardProps){
    const {id, title, releaseYear, description, language, movieLength, rating, cast, genre, rental, score} = props.film
    const navigate = useNavigate();
 
    const handleDelete = ()=>{
        DeleteFilm(id).then( () =>{
            navigate("/films")
        })
    }
    
    return(
        <div className="movie-card-container">
            <div className="movie-card">
                <h1 data-testid="specific-film-title">{title}</h1>
                <h2 data-testid="specific-film-release-year">{releaseYear}</h2>
                <p data-testid="specific-film-description">{description}</p>
                <p data-testid="specific-film-language" ><strong>Language:</strong> {language.name}</p>
                <p data-testid="specific-film-duration"><strong>Run Time:</strong> {Math.floor(movieLength / 60)}h {movieLength % 60}m</p>
                <p data-testid="specific-film-rating"><strong>Rated:</strong> {rating}</p>
                <h3 className="cast-title"><strong>Cast</strong></h3>
                <div className="cast-container">
                    <ul className="cast-list">
                        {cast?.map((actor, index) => (
                            <li key={actor.id}>
                                <Link data-testid={`specific-film-cast-name-${index + 1}`} to={`/actor/${actor.id}`}>{actor.fullName.toLowerCase().replace(/\b(\s\w|^\w)/g, function (letter) { return letter.toUpperCase(); })}</Link>
                                {/* {actor.fullName} */}
                                </li>
                        ))}
                    </ul>
                </div>
                <h3 className="cast-title"><strong>Genre</strong></h3>
                <div className="cast-container">
                    <ul className="cast-list">
                        {genre?.map((g, index) => 
                        <li key={g.name}>
                            {/* {g.name} */}
                            <Link data-testid={`specific-film-genre-${index + 1}`} to={`/genre/${g.name}`}>{g.name}</Link>
                        </li>)}
                    </ul>
                </div>
                <p data-testid="specific-film-rental-rate"><strong>Rental Rate:</strong> {rental}</p>
                <h2 data-testid="specific-film-score" className="score">{score} / 100</h2>
            </div>
            <div className="button-container">
            <Link to="/films" className="more-info" data-testid="specific-film-all">List of All Films</Link>
                <Link to={`/updateFilm/${id}`} data-testid="specific-film-edit" className="more-info">Edit Film</Link>
                <button onClick={handleDelete} className="delete-btn" data-testid="specific-film-delete">Delete</button>
            </div>
        </div>
    )
}