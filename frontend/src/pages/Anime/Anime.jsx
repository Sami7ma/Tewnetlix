import { useState } from "react";

import TVFilter from "../../components/media/MeidaFilter/TVFilter";
import MediaList from "../../components/media/MediaList/MediaList";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";
import useInfiniteMedia from "../../hooks/useInfiniteMedia";
import { getDiscoverAnime } from "../../services/tmdb";

import "./Anime.css";

function Anime() {
    const [filters, setFilters] = useState({
        genres: [],
        year: "",
        rating: "",
        length: "",
        status: "",
        type: "",
        sort: "popularity.desc"
    });

    const {
        items: anime,
        loading,
        loadingMore,
        error,
        page,
        totalPages,
        retry,
        observerRef,
    } = useInfiniteMedia(getDiscoverAnime, filters);

    return (
        <main className="anime-page">
            <section className="anime-container">
                <header className="anime-header">

    <div className="anime-heading">

        

        <h2>
            Anime
        </h2>

    </div>

    <div className="anime-filter">

        <TVFilter
            filters={filters}
            onChange={setFilters}
        />

    </div>

</header>

                {loading ? (
                    <LoadingSpinner
                        size="medium"
                        text="Loading anime..."
                    />
                ) : error ? (
                    <ErrorState
                        message="Anime could not be loaded."
                        onAction={retry}
                    />
                ) : (
                    <>
                        <MediaList
                            movies={anime}
                            emptyTitle="No anime found"
                        />

                        {page < totalPages && (
                            <div
                                ref={observerRef}
                                className="media-load-more"
                            >
                                {loadingMore && (
                                    <LoadingSpinner
                                        size="small"
                                        text="Loading more..."
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default Anime;
