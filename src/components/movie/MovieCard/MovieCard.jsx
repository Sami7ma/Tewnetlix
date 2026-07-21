import {Play, Star} from "lucide-react";
import "./MovieCard.css";

function MovieCard({movie}){
    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;
    const poster = movie.poster_path ? `${imageURL}${movie.poster_path}` : movie.poster;
    const rating = movie.vote_average ? `${movie.vote_average.toFixed(1)}` : movie.rating;
    const year = movie.release_date ? movie.release_date.split("-")[0] : movie.year;
    return(
        <div className="movie-card">
            <div className="poster-container">
                <img src={poster} alt={movie.title || movie.name} className="movie-poster" />
                <div className="movie-overlay">
                    <Play size={18} fill="currentColor" />
                </div>
            </div>

            <div className="movie-info">
                <h3>{movie.title || movie.name}</h3>
                <div className="movie-meta">
                    <span><Star size={16} fill="currentColor" /> {rating}</span>
                    <span>{year}</span>
                </div>
            </div>
        </div>
    )
}
export default MovieCard;