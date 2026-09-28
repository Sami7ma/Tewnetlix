import { useEffect, useState } from "react";
import { Clapperboard, House, Search, Sparkles, Tv, User } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../../assets/DarkMode.svg";
import SearchOverlay from "../../search/SearchOverlay/SearchOverlay";
import GlassSurface from "../../ui/GlassSurface/GlassSurface";
import IconButton from "../../ui/IconButton/IconButton";
import "./Navbar.css";

const navigation = [
    { to: "/", label: "Home", icon: House, end: true },
    { to: "/movies", label: "Movies", icon: Clapperboard },
    { to: "/tvshows", label: "TV Shows", icon: Tv },
    { to: "/anime", label: "Anime", icon: Sparkles },
];

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const reducedMotion = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    };

    return (
        <>
            <GlassSurface
                as="header"
                className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
                strength="subtle"
            >
                <nav className="navbar-container" aria-label="Primary navigation">
                    <Link
                        to="/"
                        className="logo"
                        onClick={scrollToTop}
                        aria-label="TEWNETLIX home"
                    >
                        <img src={Logo} alt="TEWNETLIX" />
                    </Link>

                    <ul className="nav-links">
                        {navigation.map(({ to, label, icon: Icon, end }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={end}
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "nav-item-active" : ""}`
                                    }
                                    onClick={to === "/" ? scrollToTop : undefined}
                                >
                                    <Icon size={20} aria-hidden="true" />
                                    <span>{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="nav-actions">
                        <IconButton
                            label="Open search"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search size={21} aria-hidden="true" />
                        </IconButton>
                        <Link
                            to="/profile"
                            className="profile-link"
                            aria-label="Open profile"
                        >
                            <User size={21} aria-hidden="true" />
                        </Link>
                    </div>
                </nav>
            </GlassSurface>

            {searchOpen && (
                <SearchOverlay onClose={() => setSearchOpen(false)} />
            )}
        </>
    );
}

export default Navbar;
