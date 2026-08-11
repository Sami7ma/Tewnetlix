import { useRef, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown
} from "lucide-react";

import MovieCard from "../MediaCard/MediaCard";
import "./MediaRow.css";


const MovieRow = ({
    title,
    movies = [],
    limit,
    categories
}) => {

    const rowRef = useRef(null);

    const [activeCategory, setActiveCategory] =
        useState("movies");

    const [isCategoryOpen, setIsCategoryOpen] =
        useState(false);


    const categoryMovies = categories
        ? categories[activeCategory] || []
        : movies;


    const displayedMovies = limit
        ? categoryMovies.slice(0, limit)
        : categoryMovies;


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


    const categoryLabels = {
        movies: "Movies",
        tv: "TV Shows"
    };


    return (
        <section className="movie-row">

            <div className="row-header">

                {/* =================================
                    TITLE
                ================================= */}

                <h2 className="row-title">
                    {title}
                </h2>


                {/* =================================
                    RIGHT SIDE CONTROLS
                ================================= */}

                <div className="row-controls">

                    {/* Category Filter */}

                    {categories && (

                        <div className="row-category">

                            <button
                                className="row-category-button"
                                onClick={() =>
                                    setIsCategoryOpen(
                                        !isCategoryOpen
                                    )
                                }
                                aria-expanded={isCategoryOpen}
                            >

                                <span>
                                    {
                                        categoryLabels[
                                            activeCategory
                                        ]
                                    }
                                </span>

                                <ChevronDown
                                    size={16}
                                    className={
                                        isCategoryOpen
                                            ? "rotate"
                                            : ""
                                    }
                                />

                            </button>


                            {isCategoryOpen && (

                                <div className="row-category-dropdown">

                                    {Object.entries(
                                        categoryLabels
                                    ).map(
                                        ([key, label]) => (

                                            <button
                                                key={key}
                                                className={
                                                    activeCategory === key
                                                        ? "row-category-option active"
                                                        : "row-category-option"
                                                }
                                                onClick={() => {

                                                    setActiveCategory(
                                                        key
                                                    );

                                                    setIsCategoryOpen(
                                                        false
                                                    );

                                                    if (
                                                        rowRef.current
                                                    ) {

                                                        rowRef.current.scrollTo({
                                                            left: 0,
                                                            behavior: "smooth"
                                                        });

                                                    }

                                                }}
                                            >
                                                {label}
                                            </button>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    )}


                    {/* Scroll Buttons */}

                    <div className="row-buttons">

                        <button
                            onClick={scrollLeft}
                            aria-label={`Scroll ${title} left`}
                        >
                            <ChevronLeft />
                        </button>


                        <button
                            onClick={scrollRight}
                            aria-label={`Scroll ${title} right`}
                        >
                            <ChevronRight />
                        </button>

                    </div>

                </div>

            </div>


            {/* =================================
                MOVIE LIST
            ================================= */}

            <div
                className="movie-list"
                ref={rowRef}
            >

                {displayedMovies.map(movie => (

                    <MovieCard
                        key={`${movie.media_type || "media"}-${movie.id}`}
                        media={movie}
                    />

                ))}

            </div>

        </section>
    );
};


export default MovieRow;