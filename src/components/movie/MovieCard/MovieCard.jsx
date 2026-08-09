import { useNavigate } from "react-router-dom";
import { Play, Star } from "lucide-react";
import "./MovieCard.css";

function MovieCard({ movie }) {
    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;
    const navigate = useNavigate();

    const poster = movie.poster_path
        ? `${imageURL}${movie.poster_path}`
        : movie.poster;

    const title = movie.title || movie.name || "Unknown Title";

    const rating =
        movie.vote_average !== undefined && movie.vote_average !== null
            ? movie.vote_average.toFixed(1)
            : movie.rating || "N/A";

    const year =
        movie.release_date?.split("-")[0] ||
        movie.first_air_date?.split("-")[0] ||
        movie.year ||
        "N/A";

    const mediaType =
        movie.media_type ||
        (movie.title ? "movie" : "tv");

    const mediaLabel =
        mediaType === "tv" ? "TV Show" : "Movie";

    const genres =
        movie.genres?.map(genre => genre.name) ||
        movie.genre_names ||
        [];

    const visibleGenres = genres.slice(0, 2);

    function openDetails() {
        if (mediaType === "tv") {
            navigate(`/tv/${movie.id}`);
        } else {
            navigate(`/movie/${movie.id}`);
        }
    }

    return (
        <article
            className="movie-card"
            onClick={openDetails}
        >

            <div className="poster-container">

                <img
                    src={poster}
                    alt={title}
                    className="movie-poster"
                    loading="lazy"
                />

                <div className="movie-overlay">
                    <Play
                        size={42}
                        fill="currentColor"
                    />
                </div>

            </div>

            <div className="movie-info">

                <h3 className="movie-title">
                    {title}
                </h3>

                <div className="movie-meta-row">

                    <div className="movie-basic-meta">

                        <span className="rating">
                            <Star
                                size={14}
                                fill="currentColor"
                            />
                            {rating}
                        </span>

                        <span className="meta-dot">•</span>

                        <span>{year}</span>

                        <span className="meta-dot">•</span>

                        <span>{mediaLabel}</span>

                    </div>

                    {visibleGenres.length > 0 && (
                        <div className="movie-genres">
                            {visibleGenres.join(" | ")}
                        </div>
                    )}

                </div>

            </div>

        </article>
    );
}

export default MovieCard;