import { Play, Info, BookmarkPlus } from "lucide-react";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-overlay"></div>

            <div className="hero-content">

                <h1>INTERSTELLAR</h1>

                <div className="hero-meta">
                    <span>★ 8.8</span>
                    <span>2014</span>
                    <span>2h 49m</span>
                    <span>Sci-Fi • Adventure</span>
                </div>

                <p>
                    A team of explorers travel through a wormhole in space in an
                    attempt to ensure humanity's survival.
                </p>

                <div className="hero-buttons">

                    <button className="play-btn"><Play size={18} fill="currentColor"/> Play Now</button>

                    <button className="secondary-btn"><Info size={18} /> info</button>

                    <button className="secondary-btn"><BookmarkPlus size={18} /> Watchlist</button>

                </div>

            </div>

        </section>
    );
}

export default Hero;