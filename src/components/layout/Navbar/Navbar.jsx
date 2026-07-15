import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import "./Navbar.css";


function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="logo">
                    <img src="../src/assets/logo.svg" alt="Tewnetlix-Logo" />
                </div>
                <ul className="nav-links">
                    <li>Home</li>
                    <li>Movie</li>
                    <li>Tv Shows</li>
                    <li>Genres</li>
                </ul>
                <div className="nav-icons">
                    <Search />
                    <User />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;