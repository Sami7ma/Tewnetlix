import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    Check
} from "lucide-react";

import "./MediaFilter.css";

const GENRES = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

const SORT_OPTIONS = [
    {
        value: "popularity.desc",
        label: "Most Popular"
    },
    {
        value: "vote_average.desc",
        label: "Top Rated"
    },
    {
        value: "primary_release_date.desc",
        label: "Newest"
    },
    {
        value: "primary_release_date.asc",
        label: "Oldest"
    },
    {
        value: "revenue.desc",
        label: "Highest Revenue"
    },
    {
        value: "vote_count.desc",
        label: "Most Rated"
    }
];

const RATING_OPTIONS = [
    {
        value: "",
        label: "Any Rating"
    },
    {
        value: "8",
        label: "8+"
    },
    {
        value: "7",
        label: "7+"
    },
    {
        value: "6",
        label: "6+"
    },
    {
        value: "5",
        label: "5+"
    }
];

const LENGTH_OPTIONS = [
    {
        value: "",
        label: "Any Length"
    },
    {
        value: "short",
        label: "Under 90 min"
    },
    {
        value: "medium",
        label: "90 – 120 min"
    },
    {
        value: "long",
        label: "120 – 180 min"
    },
    {
        value: "epic",
        label: "180+ min"
    }
];

const YEARS = [
    ...Array.from(
        { length: 2026 - 1900 + 1 },
        (_, index) => 2026 - index
    )
];

const MediaFilter = ({ filters, onChange }) => {

    const [openDropdown, setOpenDropdown] = useState(null);

    const filterRef = useRef(null);

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                filterRef.current &&
                !filterRef.current.contains(event.target)
            ) {
                setOpenDropdown(null);
            }

        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    const toggleDropdown = (name) => {

        setOpenDropdown(
            openDropdown === name
                ? null
                : name
        );

    };

    /*
        =========================================
        GENRE
        =========================================
    */

    const toggleGenre = (genreId) => {

        const currentGenres = filters.genres || [];

        const exists = currentGenres.includes(
            genreId
        );

        const updatedGenres = exists
            ? currentGenres.filter(
                id => id !== genreId
            )
            : [
                ...currentGenres,
                genreId
            ];

        onChange({
            ...filters,
            genres: updatedGenres
        });

    };

    const clearGenres = () => {

        onChange({
            ...filters,
            genres: []
        });

    };

    const getGenreLabel = () => {

        if (!filters.genres?.length) {
            return "All Genres";
        }

        if (filters.genres.length === 1) {

            const genre = GENRES.find(
                item =>
                    item.id === filters.genres[0]
            );

            return genre?.name || "Genre";

        }

        return `${filters.genres.length} Genres`;

    };

    /*
        =========================================
        YEAR
        =========================================
    */

    const getYearLabel = () => {

        return filters.year || "All Years";

    };

    /*
        =========================================
        RATING
        =========================================
    */

    const getRatingLabel = () => {

        const option = RATING_OPTIONS.find(
            item =>
                item.value === filters.rating
        );

        return option?.label || "Any Rating";

    };

    /*
        =========================================
        LENGTH
        =========================================
    */

    const getLengthLabel = () => {

        const option = LENGTH_OPTIONS.find(
            item =>
                item.value === filters.length
        );

        return option?.label || "Any Length";

    };

    /*
        =========================================
        SORT
        =========================================
    */

    const getSortLabel = () => {

        const sort = SORT_OPTIONS.find(
            item =>
                item.value === filters.sort
        );

        return sort?.label || "Most Popular";

    };

    /*
        =========================================
        RENDER
        =========================================
    */

    return (

        <div
            className="media-filter"
            ref={filterRef}
        >

            {/* =================================
                GENRE
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "genre"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("genre")
                    }
                >

                    <span>
                        {getGenreLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "genre"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>

                {openDropdown === "genre" && (

                    <div className="filter-dropdown genre-dropdown">

                        <div className="filter-dropdown-header">

                            <span>
                                Genres
                            </span>

                            {filters.genres?.length > 0 && (

                                <button
                                    className="clear-filter"
                                    onClick={clearGenres}
                                >
                                    Clear
                                </button>

                            )}

                        </div>

                        <div className="genre-grid">

                            {GENRES.map(genre => {

                                const selected =
                                    filters.genres?.includes(
                                        genre.id
                                    );

                                return (

                                    <button
                                        key={genre.id}
                                        className={`genre-option ${
                                            selected
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            toggleGenre(
                                                genre.id
                                            )
                                        }
                                    >

                                        <span>
                                            {genre.name}
                                        </span>

                                        <span
                                            className={`filter-check ${
                                                selected
                                                    ? "visible"
                                                    : ""
                                            }`}
                                        >
                                            {selected && (
                                                <Check
                                                    size={13}
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </span>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                )}

            </div>


            {/* =================================
                YEAR
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "year"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("year")
                    }
                >

                    <span>
                        {getYearLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "year"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>

                {openDropdown === "year" && (

                    <div className="filter-dropdown year-dropdown">

                        <button
                            className={`filter-option ${
                                !filters.year
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => {

                                onChange({
                                    ...filters,
                                    year: ""
                                });

                                setOpenDropdown(null);

                            }}
                        >

                            <span>
                                All Years
                            </span>

                            <span className="filter-check">
                                {!filters.year && (
                                    <Check
                                        size={13}
                                        strokeWidth={3}
                                    />
                                )}
                            </span>

                        </button>

                        <div className="year-list">

                            {YEARS.map(year => {

                                const selected =
                                    filters.year ===
                                    String(year);

                                return (

                                    <button
                                        key={year}
                                        className={`filter-option ${
                                            selected
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => {

                                            onChange({
                                                ...filters,
                                                year:
                                                    String(year)
                                            });

                                            setOpenDropdown(
                                                null
                                            );

                                        }}
                                    >

                                        <span>
                                            {year}
                                        </span>

                                        <span className="filter-check">

                                            {selected && (
                                                <Check
                                                    size={13}
                                                    strokeWidth={3}
                                                />
                                            )}

                                        </span>

                                    </button>

                                );

                            })}

                        </div>

                    </div>

                )}

            </div>


            {/* =================================
                RATING
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "rating"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("rating")
                    }
                >

                    <span>
                        {getRatingLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "rating"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>

                {openDropdown === "rating" && (

                    <div className="filter-dropdown">

                        {RATING_OPTIONS.map(option => {

                            const selected =
                                filters.rating ===
                                option.value;

                            return (

                                <button
                                    key={option.value}
                                    className={`filter-option ${
                                        selected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {

                                        onChange({
                                            ...filters,
                                            rating:
                                                option.value
                                        });

                                        setOpenDropdown(
                                            null
                                        );

                                    }}
                                >

                                    <span>
                                        {option.label}
                                    </span>

                                    <span className="filter-check">

                                        {selected && (
                                            <Check
                                                size={13}
                                                strokeWidth={3}
                                            />
                                        )}

                                    </span>

                                </button>

                            );

                        })}

                    </div>

                )}

            </div>


            {/* =================================
                LENGTH
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "length"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("length")
                    }
                >

                    <span>
                        {getLengthLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "length"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>

                {openDropdown === "length" && (

                    <div className="filter-dropdown">

                        {LENGTH_OPTIONS.map(option => {

                            const selected =
                                filters.length ===
                                option.value;

                            return (

                                <button
                                    key={option.value}
                                    className={`filter-option ${
                                        selected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {

                                        onChange({
                                            ...filters,
                                            length:
                                                option.value
                                        });

                                        setOpenDropdown(
                                            null
                                        );

                                    }}
                                >

                                    <span>
                                        {option.label}
                                    </span>

                                    <span className="filter-check">

                                        {selected && (
                                            <Check
                                                size={13}
                                                strokeWidth={3}
                                            />
                                        )}

                                    </span>

                                </button>

                            );

                        })}

                    </div>

                )}

            </div>


            {/* =================================
                SORT
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "sort"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("sort")
                    }
                >

                    <span>
                        {getSortLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "sort"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>

                {openDropdown === "sort" && (

                    <div className="filter-dropdown">

                        {SORT_OPTIONS.map(option => {

                            const selected =
                                filters.sort ===
                                option.value;

                            return (

                                <button
                                    key={option.value}
                                    className={`filter-option ${
                                        selected
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {

                                        onChange({
                                            ...filters,
                                            sort:
                                                option.value
                                        });

                                        setOpenDropdown(
                                            null
                                        );

                                    }}
                                >

                                    <span>
                                        {option.label}
                                    </span>

                                    <span className="filter-check">

                                        {selected && (
                                            <Check
                                                size={13}
                                                strokeWidth={3}
                                            />
                                        )}

                                    </span>

                                </button>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MediaFilter;
