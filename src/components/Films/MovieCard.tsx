import { Link, useNavigate } from "react-router"
import { Film } from "../../types"
import { baseUrl } from "../../config";

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
        <article>
            <h1 data-testid="specific-film-title">{title}</h1>
            <h2 data-testid="specific-film-release-year">{releaseYear}</h2>
            <p data-testid="specific-film-description">{description}</p>
            <p data-testid="specific-film-language">Language: {language.name}</p>
            <p data-testid="specific-film-movie-length">Run Time: {Math.floor(movieLength/60)}h {movieLength%60}m</p>
            <p data-testid="specific-film-rating">Rated: {rating}</p>
            <ul>Cast: {cast?.map(actor=> <li data-testid="specific-film-cast-name" key={actor.id}>{actor.fullName}</li>)}</ul>
            <p>{genre?.map(genre=> <li data-testid="specific-film-genre" key={genre.name}>Genre: {genre.name}</li>)}</p>
            <p data-testid="specific-film-rental-rate">Rental Rate: {rental}</p>
            <h2 data-testid="specific-film-score">{score} /100</h2>   
            <Link data-testid="specific-film-update-link" to={`/updateFilm/${props.film.id}`}>Edit Film</Link>
            <button data-testid="specific-film-delete-button" onClick={handleDelete}>Delete</button>
            <br />
            <Link data-testid="specific-film-all-films-link" to="/films">List of All Films</Link>

        </article>
    )
}