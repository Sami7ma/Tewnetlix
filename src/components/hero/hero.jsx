import "./Hero.css";

function Hero(){
    return(
    <section className="hero">
        <div className="hero-overlay">
        </div>
        <div className="hero-content">
            <h1>INTERSTELLAR</h1>
        
            <div className="hero-meta">
                ★ 8.8
                <span>2014</span>
                <span>2h 49m</span>
                <span> • Sci-Fi • AdventureSci-Fi</span>
            </div>
            <p>
                A team of explorers travel through a wormhole in space in an attempt to ensure humanity from extinction.
            </p>
            <div className="hero-buttons">
                <button> ▶ Watch Now</button>
                <button> ⓘ Info</button>
                <button>  ♥ Watchlist </button>
            </div>
        </div>
        
    </section>
    )
}
export default Hero;