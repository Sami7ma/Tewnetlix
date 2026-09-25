import {
    useEffect,
    useRef,
    useState
} from "react";

import NavBar from "../../components/layout/Navbar/Navbar";
import MediaFilter from "../../components/media/MeidaFilter/MovieFilter";
import MediaList from "../../components/media/MediaList/MediaList";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import {
    getDiscoverMovies
} from "../../services/tmdb";

import "./Movies.css";


function Movies() {

    const [movies, setMovies] = useState([]);

    const [loading, setLoading] = useState(true);

    const [loadingMore, setLoadingMore] =
        useState(false);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [filters, setFilters] = useState({

        genre: [],

        year: "",

        sort: "popularity.desc"

    });

    const observerRef = useRef(null);


    /*
        =========================================
        LOAD MOVIES
        =========================================
    */

    useEffect(() => {

        async function loadMovies() {

            try {

                setLoading(true);

                setPage(1);

                const data =
                    await getDiscoverMovies({
                        ...filters,
                        page: 1
                    });

                setMovies(
                    data.results || []
                );

                setTotalPages(
                    data.total_pages || 1
                );

            } catch (error) {

                console.error(
                    "Failed to load movies:",
                    error
                );

                setMovies([]);

            } finally {

                setLoading(false);

            }

        }

        loadMovies();

    }, [filters]);


    /*
        =========================================
        LOAD NEXT PAGE
        =========================================
    */

    const loadMoreMovies = async () => {

        if (
            loading ||
            loadingMore ||
            page >= totalPages
        ) {
            return;
        }

        try {

            setLoadingMore(true);

            const nextPage = page + 1;

            const data =
                await getDiscoverMovies({

                    ...filters,

                    page: nextPage

                });

            setMovies(prev => [

                ...prev,

                ...(data.results || [])

            ]);

            setPage(nextPage);

        } catch (error) {

            console.error(
                "Failed to load more movies:",
                error
            );

        } finally {

            setLoadingMore(false);

        }

    };


    /*
        =========================================
        INFINITE SCROLL
        =========================================
    */

    useEffect(() => {

        const observer =
            new IntersectionObserver(

                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        loadMoreMovies();

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

        <main className="movies-page">

            <NavBar />

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
                        >Loading ,Please wait</LoadingSpinner>

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