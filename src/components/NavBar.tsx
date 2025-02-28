import { Link, NavLink } from "react-router";
import "./NavBar.css";

export default function NavBar(){
    return(
        <nav>
            <Link data-testid="navbar-home" to="/" className="title">Sakila</Link>
            <ul>
                <li data-testid="navbar-films"><NavLink to="/films">Films</NavLink></li>
                <li data-testid="navbar-actors"><NavLink to="/actors">Actors</NavLink></li>
                <li data-testid="navbar-genres"><NavLink to="/genres">Genres</NavLink></li>
                {/* <input></input> */}
            </ul>
        </nav>
    )
}