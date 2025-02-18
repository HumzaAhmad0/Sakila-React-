import { Link } from "react-router"
import "./PartialMovieCard.css"
import { PartialFilm } from "../../types"

interface PartialMovieCardProps{
    film: PartialFilm
}

export default function PartialMovieCard(props: PartialMovieCardProps){
   const {id, title, description, releaseYear, score} = props.film
    
    if (score != undefined){
        return(
            <article className="card">
            <h1 className="title">{title}</h1>
            <h2 className="year">{releaseYear}</h2>
            <p className="desc">{description}</p>
            <h2 className="score">{score} /100</h2>
            <Link className="more-info" to={`/film/${id}`}>More Info</Link>
        </article>
        )
    }
    
    return(
        <article className="card">
            <h1 className="title">{title}</h1>
            <h2 className="year">{releaseYear}</h2>
            <p className="desc">{description}</p>
            <Link className="more-info" to={`/film/${id}`}>More Info</Link>
        </article>
    )
}