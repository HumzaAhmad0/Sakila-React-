import { Link } from "react-router"
import "./PartialMovieCard.css"
import { PartialFilm } from "../../types"

interface PartialMovieCardProps{
    film: PartialFilm
    index: number
}

export default function PartialMovieCard(props: PartialMovieCardProps){
   const {id, title, description, releaseYear, score} = props.film
    
    if (score != undefined){
        return(
            <article className="card">
            <h1 data-testid={`movielist-title-${props.index}`} className="title">{title}</h1>
            <h2 data-testid={`movielist-year-${props.index}`} className="year">{releaseYear}</h2>
            <p data-testid={`movielist-desc-${props.index}`} className="desc">{description}</p>
            <h2 data-testid={`movielist-score-${props.index}`} className="score">{score} /100</h2>
            <Link data-testid={`movielist-moreinfo-${props.index}`} className="more-info" to={`/film/${id}`}>More Info</Link>
        </article>
        )
    }
    
    return(
        <article className="card">
            <h1 data-testid={`movielist-title-${props.index}`} className="title">{title}</h1>
            <h2 data-testid={`movielist-year-${props.index}`} className="year">{releaseYear}</h2>
            <p data-testid={`movielist-desc-${props.index}`} className="desc">{description}</p>
            <Link data-testid={`movielist-moreinfo-${props.index}`} className="more-info" to={`/film/${id}`}>More Info</Link>
        </article>
    )
}