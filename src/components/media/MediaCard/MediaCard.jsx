import { useNavigate } from "react-router-dom";
import { Play, Star } from "lucide-react";
import "./MediaCard.css";

const MediaCard = ({ media }) => {
    const navigate = useNavigate();

    if (!media) {
        return null;
    }

    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;

    const poster = media.poster_path
        ? `${imageURL}${media.poster_path}`
        : media.poster;

    const title =
        media.title ||
        media.name ||
        "Unknown Title";

    const rating =
        media.vote_average !== undefined &&
        media.vote_average !== null
            ? media.vote_average.toFixed(1)
            : media.rating || "N/A";

    const year =
        media.release_date?.split("-")[0] ||
        media.first_air_date?.split("-")[0] ||
        media.year ||
        "N/A";

    const mediaType =
        media.media_type ||
        (media.title ? "movie" : "tv");

    const mediaLabel =
        mediaType === "tv"
            ? "TV Show"
            : "Movie";

    const genres =
        media.genres?.map(genre => genre.name) ||
        media.genre_names ||
        [];

    const visibleGenres = genres.slice(0, 2);

    function openDetails() {
        if (mediaType === "tv") {
            navigate(`/tv/${media.id}`);
        } else {
            navigate(`/movie/${media.id}`);
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

                        <span className="meta-dot">
                            •
                        </span>

                        <span>
                            {year}
                        </span>

                        <span className="meta-dot">
                            •
                        </span>

                        <span>
                            {mediaLabel}
                        </span>

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

export default MediaCard;