import { Link, NavLink } from "react-router";
import "./NavBar.css";

export default function NavBar(){
    return(
        <nav>
            <Link to="/" className="title">Sakila</Link>
            <ul>
                <li><NavLink to="/films">Films</NavLink></li>
                <li><NavLink to="/actors">Actors</NavLink></li>
                <li><NavLink to="/genres">Genres</NavLink></li>
                <input></input>
            </ul>
        </nav>
    )
}