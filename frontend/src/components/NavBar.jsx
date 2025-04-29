import { Link } from "react-router-dom";
import "./css/NavBar.css";

function NavBar() {
    return <nav className="navbar">
        <div className="navbar-links">
            <Link to="/" className="nav-link"></Link>
        </div>
    </nav>
}