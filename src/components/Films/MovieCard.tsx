interface MovieCardProps{
    id?: number,
    title: string,
    description: string,
    releaseYear: number,
    language: {id: number, name: string},
    movieLength: number,
    rating: string,
    cast: {id: number, fullName: string}[],
    genre: {id: number, name: string}[],
    score: number,
    rental: string
}


export default function MovieCard(props: MovieCardProps){
    return(
        <article>
            <h1>{props.title}</h1>
            <h2>{props.releaseYear}</h2>
            <p>{props.description}</p>
            <p>Language: {props.language.name}</p>
            <p>Run Time: {Math.floor(props.movieLength/60)}h {props.movieLength%60}m</p>
            <p>Rated: {props.rating}</p>
            <ul>Cast: {props.cast?.map(actor=> <li>{actor.fullName}</li>)}</ul>
            <p>{props.genre?.map(genre=> <li>Genre: {genre.name}</li>)}</p>
            <p>Rental Rate: {props.rental}</p>
            <h2>{props.score} /100</h2>
        </article>
    )
}