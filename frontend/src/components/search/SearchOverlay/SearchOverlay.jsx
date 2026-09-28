import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import MovieCard from "../../media/MediaCard/MediaCard";
import Dialog from "../../ui/Dialog/Dialog";
import ErrorState from "../../states/ErrorState/ErrorState";
import LoadingState from "../../ui/LoadingState/LoadingState";
import Select from "../../ui/Select/Select";
import { searchMulti } from "../../../services/tmdb";
import "./SearchOverlay.css";

const FILTERS = [
    ["multi", "Movies & TV Shows"],
    ["movie", "Movies"],
    ["tv", "TV Shows"],
    ["anime", "Anime"],
];

function SearchOverlay({ onClose }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("multi");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            return undefined;
        }

        const controller = new AbortController();
        const timer = window.setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await searchMulti(trimmedQuery, {
                    signal: controller.signal,
                });
                const filtered = filter === "anime"
                    ? data.filter(item =>
                        item.genre_ids?.includes(16) &&
                        item.original_language === "ja")
                    : filter === "multi"
                        ? data
                        : data.filter(item => item.media_type === filter);
                setResults(filtered.slice(0, 8));
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError("Search could not be completed.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 300);

        return () => {
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [filter, query, retryKey]);

    return (
        <Dialog open title="Search" onClose={onClose}>
            <div className="search-overlay">
                <div className="search-input-wrapper">
                    <Search size={21} aria-hidden="true" />
                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                        placeholder="Search movies and TV shows"
                        aria-label="Search movies and TV shows"
                    />
                    {query && (
                        <button
                            className="clear-search"
                            type="button"
                            onClick={() => {
                                setQuery("");
                                inputRef.current?.focus();
                            }}
                            aria-label="Clear search"
                        >
                            <X size={17} aria-hidden="true" />
                        </button>
                    )}
                </div>

                <Select
                    id="search-filter"
                    label="Search category"
                    value={filter}
                    onChange={event => setFilter(event.target.value)}
                >
                    {FILTERS.map(([value, label]) => (
                        <option value={value} key={value}>{label}</option>
                    ))}
                </Select>

                <div className="search-results" aria-live="polite">
                    {!query.trim() && (
                        <div className="search-empty">
                            <Search size={35} aria-hidden="true" />
                            <p>Search for movies and TV shows</p>
                        </div>
                    )}
                    {loading && <LoadingState label="Searching..." />}
                    {error && (
                        <ErrorState
                            message={error}
                            onAction={() => setRetryKey(value => value + 1)}
                        />
                    )}
                    {!loading && !error && query.trim() && !results.length && (
                        <div className="search-empty"><p>No results found</p></div>
                    )}
                    {!loading && !error && results.length > 0 && (
                        <div className="search-results-grid">
                            {results.map(movie => (
                                <MovieCard
                                    key={`${movie.media_type}-${movie.id}`}
                                    media={movie}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Dialog>
    );
}

export default SearchOverlay;
