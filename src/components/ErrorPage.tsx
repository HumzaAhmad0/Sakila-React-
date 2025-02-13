interface ErrorPageProps{
    statusCode: number
}


export default function ErrorPage(props: ErrorPageProps){
    return(
        <article>
            <h1>ERROR {props.statusCode} HERE</h1>
            <img src="src\assets\error.svg"></img>
        </article>
    )
}