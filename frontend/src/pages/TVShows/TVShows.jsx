import { useState } from "react";

import TVFilter from "../../components/media/MeidaFilter/TVFilter";

import MediaList from "../../components/media/MediaList/MediaList";

import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";
import useInfiniteMedia from "../../hooks/useInfiniteMedia";

import {
    getDiscoverTV
} from "../../services/tmdb";

import "./TVShows.css";


function TVShows() {

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
        items: tvShows,
        loading,
        loadingMore,
        error,
        page,
        totalPages,
        retry,
        observerRef,
    } = useInfiniteMedia(getDiscoverTV, filters);


    return (

        <main className="tv-shows-page">

            <section className="tv-shows-container">
<header className="tv-shows-header">

    <div className="tv-shows-heading">

        <h1>
            TV Shows
        </h1>
    </div>

    <div className="tv-shows-filter">

        <TVFilter
            filters={filters}
            onChange={setFilters}
        />

    </div>

</header>
                {loading ? (

                    <LoadingSpinner
                        size="medium"
                        text="Loading TV shows..."
                    />

                ) : error ? (
                    <ErrorState
                        message="TV shows could not be loaded."
                        onAction={retry}
                    />
                ) : (

                    <>

                        <MediaList
                            movies={tvShows}
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

export default TVShows;