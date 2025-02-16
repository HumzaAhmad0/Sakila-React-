export default function CreateFilmPage(){
    return(
        <div>
            <h1>Film Creation</h1>
            <form>
                <label>
                    Title: <input type="text"/>
                </label>
                <br />
                <label>
                    Description <textarea/>
                </label>
                <br />
                <label>
                    Title: <input type="number"/>
                </label>
                <br />
                <label>
                    Language: <input type="number"/>
                </label>
            </form>
            <button>submit</button>
        </div>
        
    )
}