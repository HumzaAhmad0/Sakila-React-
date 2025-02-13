import { Link } from "react-router"

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
            <article>
            <h1>{props.title}</h1>
            <h2>{props.releaseYear}</h2>
            <p>{props.description}</p>
            <h2>{props.score} /100</h2>
        </article>
        )
    }
    
    return(
        <article>
            <h1>{props.title}</h1>
            <h2>{props.releaseYear}</h2>
            <p>{props.description}</p>
            <Link to={`/film/${props.id}`}>More Info</Link>
        </article>
    )
}