import { useState, useEffect } from "react";
import { Search, User,House,Clapperboard,Tv,BookImage } from "lucide-react";
import Logo from "../../../assets/DarkMode.svg";
import "./Navbar.css";


function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    useEffect(()=>{
        function handleScroll(){
            if(window.scrollY > 20){
                setScrolled(true)
            }else{
                setScrolled(false)
            }
        }
        window.addEventListener("scroll",handleScroll);
        return ()=>{
            window.removeEventListener("scroll",handleScroll);
        }

    },[]);
    return (
        <header className={scrolled ?"navbar navbar-scrolled"  :"navbar "}>
            <nav className="navbar-container">
                <div className="logo">
                    <img src={Logo} alt="Tewnetlix-Logo" />
                </div>
                <ul className="nav-links">
                    <li className="hover-effect"><span className="nav-link-icon"><House /></span> Home</li>
                    <li className="hover-effect"><span className="nav-link-icon"><Clapperboard /></span> Movie</li>
                    <li className="hover-effect"><span className="nav-link-icon"><Tv /></span> Tv Shows</li>
                    <li className="hover-effect"><span className="nav-link-icon"><BookImage /></span> Genres</li>
                </ul>
                <div className="nav-icons">
                    <Search className="hover-effect" />
                    <User className="hover-effect" />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;