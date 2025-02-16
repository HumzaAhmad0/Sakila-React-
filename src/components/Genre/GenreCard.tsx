interface GenreCardProps{
    name: string
}


export default function GenreCard(props: GenreCardProps){
    return(
        <article>
            <h1>{props.name}</h1>
        </article>
    )
}