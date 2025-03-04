import { Link } from "react-router"
import "./PartialMovieCard.css"
import { PartialFilm } from "../../types"
// import { baseUrl } from "../../config"

interface PartialMovieCardProps{
    film: PartialFilm
    index: number
}

// async function DeleteFilm(id: number){
//     return fetch(`${baseUrl}/films/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (response.ok) {
//         } else {
//         }
//     })
//     .catch(error => console.error("Error:", error));
// }

export default function PartialMovieCard(props: PartialMovieCardProps){
   const {id, title, description, releaseYear, score} = props.film

//    const handleDelete = ()=>{
//         DeleteFilm(id).then( () =>{
//         })
//     }
    
    if (score != undefined){
        return(
            <article className="card">
            <h1 data-testid={`movielist-title-${props.index}`} className="title">{title}</h1>
            <h2 data-testid={`movielist-year-${props.index}`} className="year">{releaseYear}</h2>
            <p data-testid={`movielist-desc-${props.index}`} className="desc">{description}</p>
            <h2 data-testid={`movielist-score-${props.index}`} className="score">{score} /100</h2>
            <Link data-testid={`movielist-moreinfo-${props.index}`} className="more-info" to={`/film/${id}`}>More Info</Link>
            {/* <button onClick={handleDelete} className="delete-btn">Delete</button> */}
    
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