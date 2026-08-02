import {useNavigate} from "react-router-dom";
import {
    ArrowLeft,
    Volume,
    VolumeOff,
    Play,
    HeartPlus,
} from "lucide-react";
import "./DetailHero.css";
function DetailHero ({movie, trailer, imageURL}){
    const navigate = useNavigate();
    const backdrop = `${imageURL}${movie.backdrop_path}`;
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    const year = movie.release_date.split("-")[0];
    const rating = movie.vote_average.toFixed(1);
    return(
        <section className="movie-hero"
            style={{backgroundImage: `url(${backdrop})`}}>
                <div className="movie-top-buttons">
                    <button className="back-button" onClick={() => navigate (-1)}>
                        <ArrowLeft />
                    </button>
                    <button className="volume-button" >
                        <VolumeOff />
                    </button>
                </div>
                <div className="movie-overlay"/>
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
                            onClick={()=> navigate(`/watch/movie/${movie.id}`)}>
                            <Play />
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