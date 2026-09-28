import { useState } from "react";

import MediaFilter from "../../components/media/MeidaFilter/MovieFilter";
import MediaList from "../../components/media/MediaList/MediaList";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";
import useInfiniteMedia from "../../hooks/useInfiniteMedia";
import { getDiscoverMovies } from "../../services/tmdb";

import "./Movies.css";


function Movies() {

    const [filters, setFilters] = useState({

        genres: [],

        year: "",

        sort: "popularity.desc"

    });

        const {
            items: movies,
            loading,
            loadingMore,
            error,
            page,
            totalPages,
            retry,
            observerRef,
        } = useInfiniteMedia(getDiscoverMovies, filters);


    return (

        <main className="movies-page">

            <section className="movies-container">

                <header className="movies-header">

                    <div className="movies-heading">

                        
                        <h1>
                            Movies
                        </h1>
                        
                    </div>
                    <div className="movies-filter">
                        <MediaFilter
                            filters={filters}
                            onChange={setFilters}
                        />
                    </div>

                </header>
                {loading ? (
                        <LoadingSpinner
                            size="medium"
                            text="Loading movies..."
                        />
                ) : error ? (
                    <ErrorState
                        message="Movies could not be loaded."
                        onAction={retry}
                    />
                ) : (

                    <>

                        <MediaList
                            movies={movies}
                        />


                        {/* Infinite scroll trigger */}

                        {page < totalPages && (

                            <div
                                ref={observerRef}
                                className="media-load-more"
                            >

                                {loadingMore && (

                                    <LoadingSpinner
                                        size="small"
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

export default Movies;