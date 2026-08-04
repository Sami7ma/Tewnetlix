import {useNavigate} from "react-router-dom";
import {ArrowLeft,Volume,VolumeOff,Play,HeartPlus,} from "lucide-react";
import { useState, useEffect} from "react";
import "./DetailHero.css";
function DetailHero ({movie, trailer, imageURL}){
    const navigate = useNavigate();

    const [muted, setMuted] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowTrailer(true);
        },7000);
        return () => clearTimeout(timer);
    }, []);
    // const [isPlaying, setIsPlaying] = useState();

    const backdrop = `${imageURL}${movie.backdrop_path}`;
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    const year = movie.release_date.split("-")[0];
    const rating = movie.vote_average.toFixed(1);
    const trailerParams = new URLSearchParams({
        autoplay: 1,
        mute: muted ? 1 : 0,
        controls: 0,
        loop: 1,
        playlist: trailer.key,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
        cc_load_policy: 0,
        disablekb: 1,
    });

const trailerURL = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?${trailerParams.toString()}`
    : null;

    return(
        <section className="movie-hero">
            <img className={`movie-backdrop ${showTrailer ? 'visible' : 'hidden'}`} src={backdrop} alt={movie.title} />
            {showTrailer && trailerURL && (
                <div className="movie-video-wrapper visible">
                    <iframe
                        className="movie-trailer"
                        src={trailerURL}
                        title={movie.title}
                        allow="autoplay; encrypted-media; fullscreen"
                        loading="eager"
                        allowFullScreen
                    />
                </div>
            )}
            <div className="movie-top-buttons">
                <button className="back-button" onClick={() => navigate (-1)}>
                    <ArrowLeft />
                </button>
                <button className="volume-button" onClick={() => setMuted(!muted)}>
                    {muted ? <VolumeOff /> : <Volume />}
                </button>
            </div>
            <div className="detailHero-movie-overlay"/>
            <div className="movie-content">
                <h1>{movie.title}</h1>
                <div className="movie-meta">
                    <span>★ {rating}</span>
                    <span>{runtime}</span>
                    <span>{year}</span>
                </div>
                <div className="movie-genres">
                    {movie.genres.map(genre => (
                        <span key={genre.id}>
                            {genre.name}
                        </span>
                    ))}
                </div>
                <p className="movie-description">
                    {movie.overview}
                </p>
                <div className="movie-actions">
                    <button className="play-button"
                        onClick={()=>navigate(`/watch/movie/${movie.id}`)}>
                            <Play fill="currentColor" />
                            Play Now
                    </button>
                    <button className="favorite-button">
                        <HeartPlus />
                        Add to Favorites
                    </button>
                </div>
            </div>
        </section>
    )
}
export default DetailHero;