import { useNavigate } from "react-router";
import FilmForm from "../../components/Films/FilmForm";
import { baseUrl } from "../../config";
import { FilmSubmission } from "../../types";

export default function CreateFilmPage() {
    const navigate = useNavigate();
    const handleSubmitFilm = (filmData: FilmSubmission) => {
        fetch(`${baseUrl}/films`, {
            method: "POST",
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
            alert("Film created successfully!");
            navigate(`/films`);
        })
        .catch((error) => {
            console.error("Error creating film:", error);
            alert("An error occurred while creating the film." + error);
        });
    };

    return (
        <div className="cards-container">
            <div className="header">
                <h1 className="titleMain">Create Film</h1>
            </div>
            <div>
                <FilmForm onSubmit={handleSubmitFilm} />
            </div>
        </div>
    );
}
