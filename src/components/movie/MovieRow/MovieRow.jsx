import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MovieCard from "../MovieCard/MovieCard";
import "./MovieRow.css";

const MovieRow = ({
    title,
    movies = [],
    limit
}) => {

    const rowRef = useRef(null);

    const displayedMovies = limit
        ? movies.slice(0, limit)
        : movies;

    const scrollLeft = () => {
        rowRef.current?.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        rowRef.current?.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    };

    if (!displayedMovies.length) {
        return null;
    }

    return (
        <section className="movie-row">

            <div className="row-header">

                <h2 className="row-title">
                    {title}
                </h2>

                <div className="row-buttons">

                    <button
                        onClick={scrollLeft}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={scrollRight}
                        aria-label="Scroll right"
                    >
                        <ChevronRight />
                    </button>

                </div>

            </div>

            <div
                className="movie-list"
                ref={rowRef}
            >

                {displayedMovies.map(movie => (
                    <MovieCard
                        key={`${movie.media_type || "media"}-${movie.id}`}
                        movie={movie}
                    />
                ))}

            </div>

        </section>
    );
};

export default MovieRow;