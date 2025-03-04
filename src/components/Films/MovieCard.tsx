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
                <h1>{title}</h1>
                <h2>{releaseYear}</h2>
                <p>{description}</p>
                <p><strong>Language:</strong> {language.name}</p>
                <p><strong>Run Time:</strong> {Math.floor(movieLength / 60)}h {movieLength % 60}m</p>
                <p><strong>Rated:</strong> {rating}</p>
                <div className="cast-container">
                    <h3 className="cast-title"><strong>Cast</strong></h3>
                    <ul className="cast-list">
                        {cast?.map(actor => (
                            <li key={actor.id}>
                                <Link to={`/actor/${actor.id}`}>{actor.fullName}</Link>
                                {/* {actor.fullName} */}
                                </li>
                        ))}
                    </ul>
                </div>
                <p><strong>Genre:</strong> {genre?.map(g => <span key={g.name}>
                    {/* {g.name} */}
                    <Link to={`/genre/${g.name}`}>{g.name}</Link>
                    
                    </span>)}</p>
                <p><strong>Rental Rate:</strong> {rental}</p>
                <h2 className="score">{score} / 100</h2>
            </div>
            <div className="button-container">
            <Link to="/films" className="more-info">List of All Films</Link>
                <Link to={`/updateFilm/${id}`} className="more-info">Edit Film</Link>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
        </div>
    )
}