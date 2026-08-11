import { useEffect, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

import MovieCard from "../../media/MediaCard/MediaCard";
import {
    searchMulti
} from "../../../services/tmdb";

import "./SearchOverlay.css";


const SearchOverlay = ({ onClose }) => {

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("multi");
    const [results, setResults] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };

    }, [onClose]);


    useEffect(() => {

        if (!query.trim()) {
            setResults([]);
            return;
        }


        const timer = setTimeout(async () => {

            try {

                setLoading(true);

                const data = await searchMulti(query);

                let filteredResults = data;

                if (filter === "movie") {
                    filteredResults = data.filter(
                        item => item.media_type === "movie"
                    );
                }
                if (filter === "tv") {
                    filteredResults = data.filter(
                        item => item.media_type === "tv"
                    );
                }
                if (filter === "anime") {
                    filteredResults = data.filter( item =>{
                        const isAnimation = item.genre_ids?.includes(16);
                        const isJapanese = item.original_language === "ja";
                        return isAnimation && isJapanese;
                    }
                        
                    );
                }

                filteredResults = filteredResults.slice(0, 5);

                setResults(filteredResults);

            } catch (error) {

                console.error("Search failed:", error);
                setResults([]);

            } finally {

                setLoading(false);

            }

        }, 300);


        return () => clearTimeout(timer);

    }, [query, filter]);


    const filterLabels = {
        multi: "Movies & TV Shows",
        movie: "Movies",
        tv: "TV Shows",
        anime: "Anime"
    };


    return (
        <div className="search-overlay">

            <div
                className="search-backdrop"
                onClick={onClose}
            />


            <section className="search-panel">


                {/* Header */}
                <header className="search-header">

                    <h2>
                        Search
                    </h2>


                    <div className="search-header-actions">


                        {/* Filter */}
                        <div className="search-filter">

                            <button
                                className="filter-button"
                                onClick={() =>
                                    setOpenFilter(!openFilter)
                                }
                            >

                                <span>
                                    {filterLabels[filter]}
                                </span>

                                <ChevronDown
                                    size={17}
                                    className={
                                        openFilter
                                            ? "rotate"
                                            : ""
                                    }
                                />

                            </button>


                            {openFilter && (

                                <div className="filter-dropdown">

                                    <button
                                        className={
                                            filter === "multi"
                                                ? "filter-option active"
                                                : "filter-option"
                                        }
                                        onClick={() => {
                                            setFilter("multi");
                                            setOpenFilter(false);
                                        }}
                                    >
                                        Movies & TV Shows
                                    </button>


                                    <button
                                        className={
                                            filter === "movie"
                                                ? "filter-option active"
                                                : "filter-option"
                                        }
                                        onClick={() => {
                                            setFilter("movie");
                                            setOpenFilter(false);
                                        }}
                                    >
                                        Movies
                                    </button>


                                    <button
                                        className={
                                            filter === "tv"
                                                ? "filter-option active"
                                                : "filter-option"
                                        }
                                        onClick={() => {
                                            setFilter("tv");
                                            setOpenFilter(false);
                                        }}
                                    >
                                        TV Shows
                                    </button>


                                    <button
                                        className={
                                            filter === "anime"
                                                ? "filter-option active"
                                                : "filter-option"
                                        }
                                        onClick={() => {
                                            setFilter("anime");
                                            setOpenFilter(false);
                                        }}
                                    >
                                        Anime
                                    </button>                                            

                                </div>

                            )}

                        </div>


                        {/* Close */}
                        <button
                            className="search-close"
                            onClick={onClose}
                            aria-label="Close search"
                        >
                            <X size={23} />
                        </button>

                    </div>

                </header>


                {/* Search Input */}
                <div className="search-input-wrapper">

                    <Search size={21} />

                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(event) =>
                            setQuery(event.target.value)
                        }
                        placeholder="Type to search..."
                    />

                    {query && (
                        <button
                            className="clear-search"
                            onClick={() => setQuery("")}
                        >
                            <X size={17} />
                        </button>
                    )}

                </div>


                {/* Results */}
                <div className="search-results">

                    {!query.trim() && (
                        <div className="search-empty">

                            <Search size={35} />

                            <p>
                                Search for movies and TV shows
                            </p>

                        </div>
                    )}


                    {loading && (
                        <div className="search-empty">
                            <p>Searching...</p>
                        </div>
                    )}


                    {!loading &&
                        query.trim() &&
                        results.length === 0 && (

                            <div className="search-empty">

                                <p>
                                    No results found
                                </p>

                            </div>
                        )
                    }


                    {!loading &&
                        results.length > 0 && (

                            <div className="search-results-grid">

                                {results.map(movie => (

                                    <MovieCard
                                        key={`${movie.media_type}-${movie.id}`}
                                        media={movie}
                                    />

                                ))}

                            </div>

                        )
                    }

                </div>

            </section>

        </div>
    );
};


export default SearchOverlay;