import {
    useEffect,
    useRef,
    useState
} from "react";

import NavBar from "../../components/layout/Navbar/Navbar";

import TVFilter from "../../components/media/MeidaFilter/TVFilter";

import MediaList from "../../components/media/MediaList/MediaList";

import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";

import {
    getDiscoverTV
} from "../../services/tmdb";

import "./TVShows.css";


function TVShows() {

    const [tvShows, setTVShows] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [loadingMore, setLoadingMore] =
        useState(false);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);


    const [filters, setFilters] = useState({

        genres: [],

        year: "",

        rating: "",

        length: "",

        status: "",

        type: "",

        sort: "popularity.desc"

    });


    const observerRef =
        useRef(null);


    /* =========================================
       LOAD TV SHOWS
    ========================================= */

    useEffect(() => {

        async function loadTVShows() {

            try {

                setLoading(true);

                setPage(1);


                const data =
                    await getDiscoverTV({

                        ...filters,

                        page: 1

                    });


                setTVShows(
                    data.results || []
                );


                setTotalPages(
                    data.total_pages || 1
                );


            } catch (error) {

                console.error(
                    "Failed to load TV shows:",
                    error
                );

                setTVShows([]);

            } finally {

                setLoading(false);

            }

        }

        loadTVShows();

    }, [filters]);


    /* =========================================
       LOAD NEXT PAGE
    ========================================= */

    const loadMoreTVShows = async () => {

        if (
            loading ||
            loadingMore ||
            page >= totalPages
        ) {
            return;
        }


        try {

            setLoadingMore(true);


            const nextPage =
                page + 1;


            const data =
                await getDiscoverTV({

                    ...filters,

                    page: nextPage

                });


            setTVShows(prev => [

                ...prev,

                ...(data.results || [])

            ]);


            setPage(nextPage);


        } catch (error) {

            console.error(
                "Failed to load more TV shows:",
                error
            );

        } finally {

            setLoadingMore(false);

        }

    };


    /* =========================================
       INFINITE SCROLL
    ========================================= */

    useEffect(() => {

        const observer =
            new IntersectionObserver(

                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        loadMoreTVShows();

                    }

                },

                {
                    rootMargin: "500px"
                }

            );


        if (observerRef.current) {

            observer.observe(
                observerRef.current
            );

        }


        return () => {

            observer.disconnect();

        };

    }, [
        page,
        totalPages,
        loading,
        loadingMore,
        filters
    ]);


    return (

        <main className="tv-shows-page">

            <NavBar />


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