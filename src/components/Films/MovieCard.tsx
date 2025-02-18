import { Film } from "../../types"

interface MovieCardProps{
    film: Film
}

export default function MovieCard(props: MovieCardProps){
    const {title, releaseYear, description, language, movieLength, rating, cast, genre, rental, score} = props.film
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
        </article>
    )
}