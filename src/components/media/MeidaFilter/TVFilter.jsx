import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    ChevronDown,
    Check
} from "lucide-react";

import "./MediaFilter.css";


/* =========================================
   TV GENRES
========================================= */

const TV_GENRES = [

    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }

];


/* =========================================
   SORT OPTIONS
========================================= */

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
        value: "first_air_date.desc",
        label: "Newest"
    },

    {
        value: "first_air_date.asc",
        label: "Oldest"
    },

    {
        value: "vote_count.desc",
        label: "Most Rated"
    },

    {
        value: "name.asc",
        label: "A → Z"
    },

    {
        value: "name.desc",
        label: "Z → A"
    }

];


/* =========================================
   RATING OPTIONS
========================================= */

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


/* =========================================
   EPISODE LENGTH
========================================= */

const LENGTH_OPTIONS = [

    {
        value: "",
        label: "Any Length"
    },

    {
        value: "short",
        label: "Under 30 min"
    },

    {
        value: "medium",
        label: "30 – 60 min"
    },

    {
        value: "long",
        label: "60 – 90 min"
    },

    {
        value: "epic",
        label: "90+ min"
    }

];


/* =========================================
   TV STATUS
========================================= */

const STATUS_OPTIONS = [

    {
        value: "",
        label: "Any Status"
    },

    {
        value: "0",
        label: "Returning Series"
    },

    {
        value: "1",
        label: "Planned"
    },

    {
        value: "2",
        label: "In Production"
    },

    {
        value: "3",
        label: "Ended"
    },

    {
        value: "4",
        label: "Cancelled"
    },

    {
        value: "5",
        label: "Pilot"
    }

];


/* =========================================
   TV TYPE
========================================= */

const TYPE_OPTIONS = [

    {
        value: "",
        label: "Any Type"
    },

    {
        value: "0",
        label: "Documentary"
    },

    {
        value: "1",
        label: "News"
    },

    {
        value: "2",
        label: "Miniseries"
    },

    {
        value: "3",
        label: "Reality"
    },

    {
        value: "4",
        label: "Scripted"
    },

    {
        value: "5",
        label: "Talk Show"
    },

    {
        value: "6",
        label: "Video"

    }

];


/* =========================================
   YEARS
========================================= */

const YEARS = [

    ...Array.from(
        {
            length: 2026 - 1900 + 1
        },
        (_, index) => 2026 - index
    )

];


const TVFilter = ({
    filters,
    onChange
}) => {

    const [
        openDropdown,
        setOpenDropdown
    ] = useState(null);

    const filterRef = useRef(null);


    /* =========================================
       OUTSIDE CLICK
    ========================================= */

    useEffect(() => {

        function handleOutsideClick(event) {

            if (
                filterRef.current &&
                !filterRef.current.contains(
                    event.target
                )
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


    /* =========================================
       DROPDOWN
    ========================================= */

    const toggleDropdown = (name) => {

        setOpenDropdown(
            openDropdown === name
                ? null
                : name
        );

    };


    /* =========================================
       GENRE
    ========================================= */

    const toggleGenre = (genreId) => {

        const currentGenres =
            filters.genres || [];

        const exists =
            currentGenres.includes(
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

            const genre =
                TV_GENRES.find(
                    item =>
                        item.id ===
                        filters.genres[0]
                );

            return genre?.name || "Genre";

        }

        return `${filters.genres.length} Genres`;

    };


    /* =========================================
       YEAR
    ========================================= */

    const getYearLabel = () => {

        return filters.year ||
            "All Years";

    };


    /* =========================================
       RATING
    ========================================= */

    const getRatingLabel = () => {

        const option =
            RATING_OPTIONS.find(
                item =>
                    item.value ===
                    filters.rating
            );

        return option?.label ||
            "Any Rating";

    };


    /* =========================================
       EPISODE LENGTH
    ========================================= */

    const getLengthLabel = () => {

        const option =
            LENGTH_OPTIONS.find(
                item =>
                    item.value ===
                    filters.length
            );

        return option?.label ||
            "Any Length";

    };


    /* =========================================
       STATUS
    ========================================= */

    const getStatusLabel = () => {

        const option =
            STATUS_OPTIONS.find(
                item =>
                    item.value ===
                    filters.status
            );

        return option?.label ||
            "Any Status";

    };


    /* =========================================
       TYPE
    ========================================= */

    const getTypeLabel = () => {

        const option =
            TYPE_OPTIONS.find(
                item =>
                    item.value ===
                    filters.type
            );

        return option?.label ||
            "Any Type";

    };


    /* =========================================
       SORT
    ========================================= */

    const getSortLabel = () => {

        const option =
            SORT_OPTIONS.find(
                item =>
                    item.value ===
                    filters.sort
            );

        return option?.label ||
            "Most Popular";

    };


    /* =========================================
       RENDER
    ========================================= */

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

                            {TV_GENRES.map(
                                genre => {

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

                                }
                            )}

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

                        {RATING_OPTIONS.map(
                            option => {

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

                            }
                        )}

                    </div>

                )}

            </div>


            {/* =================================
                EPISODE LENGTH
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

                        {LENGTH_OPTIONS.map(
                            option => {

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

                            }
                        )}

                    </div>

                )}

            </div>


            {/* =================================
                STATUS
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "status"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("status")
                    }
                >

                    <span>
                        {getStatusLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "status"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>


                {openDropdown === "status" && (

                    <div className="filter-dropdown">

                        {STATUS_OPTIONS.map(
                            option => {

                                const selected =
                                    filters.status ===
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
                                                status:
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

                            }
                        )}

                    </div>

                )}

            </div>


            {/* =================================
                TYPE
            ================================= */}

            <div className="filter-dropdown-wrapper">

                <button
                    className={`filter-button ${
                        openDropdown === "type"
                            ? "active"
                            : ""
                    }`}
                    onClick={() =>
                        toggleDropdown("type")
                    }
                >

                    <span>
                        {getTypeLabel()}
                    </span>

                    <ChevronDown
                        size={16}
                        className={
                            openDropdown === "type"
                                ? "rotate"
                                : ""
                        }
                    />

                </button>


                {openDropdown === "type" && (

                    <div className="filter-dropdown">

                        {TYPE_OPTIONS.map(
                            option => {

                                const selected =
                                    filters.type ===
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
                                                type:
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

                            }
                        )}

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

                        {SORT_OPTIONS.map(
                            option => {

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

                            }
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};

export default TVFilter;