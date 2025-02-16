import { Link } from "react-router"
import "./PartialMovieCard.css"

interface PartialMovieCardProps{
    id?: number,
    title: string,
    description: string,
    releaseYear: number,
    // language?: {id: number, name: string},
    // movieLength?: number,
    // rating?: string,
    // cast?: {id: number, fullName: string}[],
    // genre?: {id: number, name: string}[],
    score?: number,
    // rentalRate?: number,
    // rentalDuration?: number,
    // rental?: string
}


export default function PartialMovieCard(props: PartialMovieCardProps){
    if (props.score != null){
        return(
            <article className="card">
            <h1 className="title">{props.title}</h1>
            <h2 className="year">{props.releaseYear}</h2>
            <p className="desc">{props.description}</p>
            <h2 className="score">{props.score} /100</h2>
            <Link className="more-info" to={`/film/${props.id}`}>More Info</Link>
        </article>
        )
    }
    
    return(
        <article className="card">
            <h1 className="title">{props.title}</h1>
            <h2 className="year">{props.releaseYear}</h2>
            <p className="desc">{props.description}</p>
            <Link className="more-info" to={`/film/${props.id}`}>More Info</Link>
        </article>
    )
}