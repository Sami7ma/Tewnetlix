import { useState, useEffect } from "react";
import { Search, User, House, Clapperboard, Tv, BookImage } from "lucide-react";
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

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="mobile-top-bar">
                <div className="logo">
                    <img src={Logo} alt="TEWNETLIX" />
                </div>
                <div className="nav-icons">
                    <Search size={22} className="hover-effect" />
                    <User size={22} className="hover-effect" />
                </div>
            </div>

            {/* Main Navbar */}
            <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
                <nav className="navbar-container">
                    <div className="logo desktop-only">
                        <img src={Logo} alt="TEWNETLIX" />
                    </div>
                    <ul className="nav-links">
                        <li className="nav-item hover-effect">
                            <House size={20} /> Home
                        </li>
                        <li className="nav-item hover-effect">
                            <Clapperboard size={20} /> Movies
                        </li>
                        <li className="nav-item hover-effect">
                            <Tv size={20} /> TV Shows
                        </li>
                        <li className="nav-item hover-effect">
                            <BookImage size={20} /> Genres
                        </li>
                    </ul>
                    <div className="nav-icons desktop-only">
                        <Search size={22} className="hover-effect" />
                        <User size={22} className="hover-effect" />
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;