import { useState, useEffect } from "react";
import {
    Search,
    User,
    House,
    Clapperboard,
    Tv,
    Sparkles
} from "lucide-react";

import { Link } from "react-router-dom";
import Logo from "../../../assets/DarkMode.svg";
import SearchOverlay from "../../search/SearchOverlay/SearchOverlay";

import "./Navbar.css";

function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);


    useEffect(() => {

        function handleScroll() {

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight =
                document.documentElement.scrollHeight;

            setScrolled(scrollTop > 20);

            /*
                Detect when the user reaches
                the bottom of the page.
            */
            const isBottom =
                scrollTop + windowHeight >=
                documentHeight - 10;

            setAtBottom(isBottom);

        }


        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

            window.removeEventListener(
                "resize",
                handleScroll
            );

        };

    }, []);


    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    return (
        <>

            {/* =========================================
                MOBILE TOP BAR
            ========================================= */}

            <div className="mobile-top-bar">

                <Link
                    to="/"
                    className="logo"
                    onClick={scrollToTop}
                >

                    <img
                        src={Logo}
                        alt="TEWNETLIX"
                    />

                </Link>


                <div className="nav-icons">

                    <Search
                        size={22}
                        className="hover-effect"
                        onClick={() =>
                            setSearchOpen(true)
                        }
                    />

                    <Link to="/profile">

                        <User
                            size={22}
                            className="hover-effect"
                        />

                    </Link>

                </div>

            </div>


            {/* =========================================
                MAIN NAVBAR
            ========================================= */}

            <header
                className={`
                    navbar
                    ${scrolled ? "navbar-scrolled" : ""}
                    ${atBottom ? "navbar-at-bottom" : ""}
                `}
            >

                <nav className="navbar-container">

                    {/* Logo */}

                    <Link
                        to="/"
                        className="logo desktop-only"
                        onClick={scrollToTop}
                    >

                        <img
                            src={Logo}
                            alt="TEWNETLIX"
                        />

                    </Link>


                    {/* Navigation */}

                    <ul className="nav-links">

                        <li>

                            <Link
                                to="/"
                                className="nav-item hover-effect"
                                onClick={scrollToTop}
                            >

                                <House size={20} />

                                <span>
                                    Home
                                </span>

                            </Link>

                        </li>


                        <li>

                            <Link
                                to="/movies"
                                className="nav-item hover-effect"
                            >

                                <Clapperboard size={20} />

                                <span>
                                    Movies
                                </span>

                            </Link>

                        </li>


                        <li>

                            <Link
                                to="/tvshows"
                                className="nav-item hover-effect"
                            >

                                <Tv size={20} />

                                <span>
                                    TV Shows
                                </span>

                            </Link>

                        </li>


                        <li>

                            <Link
                                to="/anime"
                                className="nav-item hover-effect"
                            >

                                <Sparkles size={20} />

                                <span>
                                    Anime
                                </span>

                            </Link>

                        </li>

                    </ul>


                    {/* Desktop Actions */}

                    <div className="nav-icons desktop-only">

                        <Search
                            size={22}
                            className="hover-effect"
                            onClick={() =>
                                setSearchOpen(true)
                            }
                        />

                        <Link to="/profile">

                            <User
                                size={22}
                                className="hover-effect"
                            />

                        </Link>

                    </div>

                </nav>

            </header>


            {/* SEARCH */}

            {searchOpen && (

                <SearchOverlay
                    onClose={() =>
                        setSearchOpen(false)
                    }
                />

            )}

        </>
    );
}

export default Navbar;