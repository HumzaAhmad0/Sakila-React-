import { Link } from "react-router"
import { Film } from "../../types"
import './MovieCard.css'

interface SearchedMovieCardProps{
    film: Film
}

export default function SearchedMovieCard(props: SearchedMovieCardProps){
    const {id, title, releaseYear, description, language, movieLength, rating, cast, genre, rental, score} = props.film

    return(
        <div className="movie-card-container">
            <div className="movie-card">
            <h1 data-testid="searched-film-id">ID: {id}</h1>
            <h1 data-testid="searched-film-title">{title}</h1>
            <h2 data-testid="searched-film-release-year">{releaseYear}</h2>
            <p data-testid="searched-film-description">{description}</p>
            <p data-testid="searched-film-language">Language: {language.name}</p>
            <p data-testid="searched-film-movie-length">Run Time: {Math.floor(movieLength/60)}h {movieLength%60}m</p>
            <p data-testid="searched-film-rating">Rated: {rating}</p>
            <ul>Cast: {cast?.map(actor=> <li data-testid="searched-film-cast-name" key={actor.id}>{actor.fullName}</li>)}</ul>
            <ul>Genre:{genre?.map(genre=> <li data-testid="searched-film-genre" key={genre.name}>{genre.name}</li>)}</ul>
            <p data-testid="searched-film-rental-rate">Rental Rate: {rental}</p>
            <h2 className="score" data-testid="searched-film-score">{score} /100</h2>
            
            </div>
            <Link data-testid="searched-film-more-info" to={`/film/${id}`} className="more-info">Specific Film Page</Link>
        </div>
    )
}