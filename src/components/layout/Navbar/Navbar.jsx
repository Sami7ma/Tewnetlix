import { useState, useEffect } from "react";
import { Search, User, House, Clapperboard, Tv, BookImage } from "lucide-react";

import { Link } from "react-router-dom";
import Logo from "../../../assets/DarkMode.svg";
import "./Navbar.css";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Scroll to top when clicking on the logo
    const scrollToTop =() =>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="mobile-top-bar">
                <Link to="/" className="logo" onClick={scrollToTop}>
                    <img src={Logo} alt="TEWNETLIX" />
                </Link>
                <div className="nav-icons">
                    <Search size={22} className="hover-effect" />
                    <User size={22} className="hover-effect" />
                </div>
            </div>

            {/* Main Navbar */}
            <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
                <nav className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="logo desktop-only" onClick={scrollToTop}>
                        <img src={Logo} alt="TEWNETLIX" />
                    </Link>
                    {/* Navigation Links */}
                    <ul className="nav-links">
                        <li >
                            <Link to="/" className="nav-item hover-effect" onClick={scrollToTop}>
                                <House size={20} /> Home
                            </Link>
                        </li>
                        <li >
                            <Link to="/movies" className="nav-item hover-effect">
                                <Clapperboard size={20} /> Movies
                            </Link>
                        </li>
                        <li>
                            <Link to="/tvshows" className="nav-item hover-effect">
                                <Tv size={20} /> TV Shows
                            </Link>
                        </li>
                        <li >
                            <Link to="/genres" className="nav-item hover-effect">
                                <BookImage size={20} /> Genres
                            </Link>
                        </li>
                    </ul>
                    {/* Desktop Icons */}
                    <div className="nav-icons desktop-only">
                        <Search size={22} className="hover-effect" />
                        <Link to="/profile">
                            <User size={22} className="hover-effect" />
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;