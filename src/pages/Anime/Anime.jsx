import { useEffect, useRef, useState } from "react";

import NavBar from "../../components/layout/Navbar/Navbar";
import TVFilter from "../../components/media/MeidaFilter/TVFilter";
import MediaList from "../../components/media/MediaList/MediaList";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import { getDiscoverAnime } from "../../services/tmdb";

import "./Anime.css";

function Anime() {
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filters, setFilters] = useState({
        genres: [],
        year: "",
        rating: "",
        length: "",
        status: "",
        type: "",
        sort: "popularity.desc"
    });

    const observerRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function loadAnime() {
            try {
                setLoading(true);
                setPage(1);

                const data = await getDiscoverAnime({
                    ...filters,
                    page: 1
                });

                if (!cancelled) {
                    setAnime(data.results || []);
                    setTotalPages(data.total_pages || 1);
                }
            } catch (error) {
                console.error("Failed to load anime:", error);

                if (!cancelled) {
                    setAnime([]);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadAnime();

        return () => {
            cancelled = true;
        };
    }, [filters]);

    const loadMoreAnime = async () => {
        if (loading || loadingMore || page >= totalPages) {
            return;
        }

        try {
            setLoadingMore(true);

            const nextPage = page + 1;
            const data = await getDiscoverAnime({
                ...filters,
                page: nextPage
            });

            setAnime(prev => [
                ...prev,
                ...(data.results || [])
            ]);
            setPage(nextPage);
        } catch (error) {
            console.error("Failed to load more anime:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    loadMoreAnime();
                }
            },
            {
                rootMargin: "500px"
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
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
        <main className="anime-page">
            <NavBar />

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
