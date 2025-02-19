import { useState } from "react";
import { PartialActor } from "../types";
import { Link, useNavigate } from "react-router";
import { baseUrl } from "../config";
import PartialActorCard from "../components/Actor/PartialActorCard";

export default function SearchActorPage(){
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState<string|"">("")

    const [actors, setActors] = useState<PartialActor[]>([])
    const[loading, setLoading] = useState(false)

    const [error, setError] = useState<string | null>(null);


    const navigate = useNavigate(); 

    function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        setLoading(true);
    
        if (id) {
            navigate(`/actor/${id}`);
        } else {
            let queryString = "/actors?";
            if (name) queryString += `name=${name}`;
            queryString = queryString.endsWith("?") ? queryString.slice(0, -1) : queryString;

            fetch(`${baseUrl}${queryString}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Actors not found, ERROR ${res.status}`);
                    }
                    return res.json();
                })
                .then(setActors)
                .catch(setError)
                .finally(()=> setLoading(false));
        }
    }


    return(
        <div>
            <h1>Actor Search</h1>
            <form onSubmit={handleSubmitSearch}>
            <label> ID: <input
                    type="number"
                    onChange={(e) => setId(Number(e.target.value))}
                    />
                </label>
                <br />
                
                <label> Name: <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Search</button>
                <Link to="/actors">Go back</Link>
            </form>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {actors.length === 0 && !loading && !error && <h1>No results found</h1>}

            {actors.length > 0 &&(
                <div className="cards-container-main">
                          <div className="cards-container">
                            <div><h1>List of Filtered Actors</h1></div>
                            {actors.map((actor) => (
                              <PartialActorCard key={actor.id} actor={actor} />
                            ))}
                          </div>
                        </div>
            )}
        
        </div>
    )
}