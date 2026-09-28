import { useEffect, useRef, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    ChevronDown
} from "lucide-react";

import MovieCard from "../MediaCard/MediaCard";
import Button from "../../ui/Button/Button";
import IconButton from "../../ui/IconButton/IconButton";
import GlassSurface from "../../ui/GlassSurface/GlassSurface";
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
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);


    const categoryMovies = categories
        ? categories[activeCategory] || []
        : movies;


    const displayedMovies = limit
        ? categoryMovies.slice(0, limit)
        : categoryMovies;


    const scrollLeft = () => {

        rowRef.current?.scrollBy({
            left: -(rowRef.current?.clientWidth || 500) * 0.8,
            behavior: "smooth"
        });

    };


    const scrollRight = () => {

        rowRef.current?.scrollBy({
            left: (rowRef.current?.clientWidth || 500) * 0.8,
            behavior: "smooth"
        });

    };


    const categoryLabels = {
        movies: "Movies",
        tv: "TV Shows"
    };

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return undefined;
        const updateScrollState = () => {
            setCanScrollLeft(row.scrollLeft > 4);
            setCanScrollRight(
                row.scrollLeft + row.clientWidth < row.scrollWidth - 4,
            );
        };
        updateScrollState();
        row.addEventListener("scroll", updateScrollState, { passive: true });
        window.addEventListener("resize", updateScrollState);
        return () => {
            row.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [displayedMovies.length]);

    if (!displayedMovies.length) {
        return null;
    }

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

                            <Button
                                variant="secondary"
                                className="row-category-button"
                                onClick={() =>
                                    setIsCategoryOpen(
                                        !isCategoryOpen
                                    )
                                }
                                aria-expanded={isCategoryOpen}
                                aria-haspopup="menu"
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

                            </Button>


                            {isCategoryOpen && (

                                <GlassSurface
                                    as="div"
                                    className="row-category-dropdown"
                                    strength="subtle"
                                    role="menu"
                                >

                                    {Object.entries(
                                        categoryLabels
                                    ).map(
                                        ([key, label]) => (

                                            <Button
                                                type="button"
                                                variant="subtle"
                                                key={key}
                                                className={
                                                    activeCategory === key
                                                        ? "row-category-option active"
                                                        : "row-category-option"
                                                }
                                                role="menuitemradio"
                                                aria-checked={activeCategory === key}
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
                                            </Button>

                                        )
                                    )}

                                </GlassSurface>

                            )}

                        </div>

                    )}


                    {/* Scroll Buttons */}

                    <div className="row-buttons">

                        <IconButton
                            label={`Scroll ${title} left`}
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                        >
                            <ChevronLeft />
                        </IconButton>


                        <IconButton
                            label={`Scroll ${title} right`}
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                        >
                            <ChevronRight />
                        </IconButton>

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