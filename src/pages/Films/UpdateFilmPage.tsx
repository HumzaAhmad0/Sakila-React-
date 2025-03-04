import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { baseUrl } from "../../config";
import { Film, FilmSubmission } from "../../types";
import FilmForm from "../../components/Films/FilmForm";

export default function UpdateFilmPage() {
    const [film, setFilm] = useState<Film | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);
    const [initalTitle, setInitalTitle] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/films/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Film not found, ERROR ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setFilm(data);
                setInitalTitle(data.title)
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);
    

    if (loading) return (
        // <p>loading...</p>
        <div className="header">
                        <h1 className="titleMain">L o a d i n g  .  .  .</h1>
        </div>
        );
    if (error !== null) return <p>{error.message}</p>;
    if (film === null) return <p>failed to load film</p>;

    const handleReset = () => {
        window.location.reload();
    };

    const handleSubmitFilm = (filmData: FilmSubmission) =>{
            fetch(`${baseUrl}/films/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(filmData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(() => {
                    alert("Film updated successfully!");
                    navigate(`/film/${id}`);
                })
                .catch((error) => {
                    console.error("Error updating film:", error);
                    alert("An error occurred while updating the film.");
            });

        }

        return (
            <div className="cards-container">
                <div className="header">
                    <h1 className="titleMain">Edit Film: {initalTitle} (ID: {id})</h1>
                </div>
                <div>
                    <FilmForm initialData={film} onSubmit={handleSubmitFilm}/>
                </div>
                <button  className="more-info" data-testid="reset-update-film-page-button" onClick={handleReset}>reset</button>

            </div>
        );
    };