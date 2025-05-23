    import { useState } from "react";
    import { Actor, PartialActor } from "../../types";
    import { Link } from "react-router";
    import { baseUrl } from "../../config";
    import PartialActorCard from "../../components/Actor/PartialActorCard";
    import SearchedActorCard from "../../components/Actor/SearchedActorCard";

    export default function SearchActorPage(){
        const [id, setId] = useState<number | undefined>(undefined);
        const [name, setName] = useState<string|"">("")

        const [actors, setActors] = useState<PartialActor[]>([])
        const [actor, setActor] = useState<Actor|null>(null)
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState<string | null>(null);

        function handleSubmitSearch(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
            setActor(null);
            setActors([]);
            setError(null);
            setLoading(true);
        
            if (id) {
                fetch(`${baseUrl}/actors/${id}`)
                .then(res => {
                if (!res.ok) throw new Error(`Actor not found, ERROR ${res.status}`)
                return res.json()
                })
                .then(setActor)
                .catch((error)=>{
                    setError(error.message);
                })
                .finally(()=>setLoading(false))
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
                    .catch((error)=>{
                        setError(error.message);
                    })
                    .finally(()=> setLoading(false));
            }
        }

        return(
            <div>
                <div className="header">
                <h1 className="titleMain">Search Actor</h1>
                </div>
                <div>
                <div className="form-container">
                <form onSubmit={handleSubmitSearch} className="form-card">
                <label> ID: <input
                        data-testid="actor-search-id"
                        type="number"
                        onChange={(e) => setId(e.target.value ? Number(e.target.value) : undefined)}
                        disabled={name !== ""}
                        />
                    </label>
                    <br />
                    
                    <label> Name: <input
                        data-testid="actor-search-name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        disabled={id !== undefined}
                        />
                    </label>
                    <br />
                    
                    <button className="submit-btn" type="submit" data-testid="actor-search-submit-button">Search</button>
                    <Link className="back-link" data-testid="actor-search-go-back" to="/actors">Go back</Link>
                </form>
                </div>
                </div>
                

                {loading && <h1  className="titleMain" data-testid="actor-search-loading">Loading...</h1>}

                {error && <h1  className="titleMain" data-testid="actor-search-error-message">{error}</h1>}

                {actors.length === 0 && actor === null && !loading && !error && <h1 className="titleMain" data-testid="actor-search-no-results">No results found</h1>}

                {actor && <SearchedActorCard data-testid="actor-by-id-result" actor={actor} />}

                {actors.length > 0 &&(
                    // <div className="cards-container-main">
                            <div className="cards-container">
                                <div className="header">
                                <h1 className="titleMain">List of Filtered Actors</h1>
                                </div>
                                <div className="actors-list" data-testid="list-of-filtered-actors">
                                {actors.map((actor, index) => (
                                <PartialActorCard key={actor.id} actor={actor} index={index+1} />
                                ))}
                                </div>
                            </div>
                    // </div>
                )}
            </div>
        )
    }