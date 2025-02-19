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
            <h1>{title}</h1>
            <h2>{releaseYear}</h2>
            <p>{description}</p>
            <p>Language: {language.name}</p>
            <p>Run Time: {Math.floor(movieLength/60)}h {movieLength%60}m</p>
            <p>Rated: {rating}</p>
            <ul>Cast: {cast?.map(actor=> <li key={actor.id}>{actor.fullName}</li>)}</ul>
            <p>{genre?.map(genre=> <li key={genre.name}>Genre: {genre.name}</li>)}</p>
            <p>Rental Rate: {rental}</p>
            <h2>{score} /100</h2>   
            <Link to={`/updateFilm/${props.film.id}`}>Edit Film</Link>
            <button onClick={handleDelete}>Delete</button>
            <br />
            <Link to="/films">List of All Films</Link>

        </article>
    )
}