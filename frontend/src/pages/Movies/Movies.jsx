import { useState } from "react";
import MediaFilter from "../../components/media/MeidaFilter/MovieFilter";
import DiscoveryPage from "../../components/discovery/DiscoveryPage/DiscoveryPage";
import useInfiniteMedia from "../../hooks/useInfiniteMedia";
import { getDiscoverMovies } from "../../services/tmdb";

const initialFilters = { genres: [], year: "", sort: "popularity.desc" };

function Movies() {
    const [filters, setFilters] = useState(initialFilters);
    const data = useInfiniteMedia(getDiscoverMovies, filters);
    return (
        <DiscoveryPage
            title="Movies"
            className="movies"
            filters={<MediaFilter filters={filters} onChange={setFilters} />}
            results={data.items}
            loading={data.loading}
            loadingMore={data.loadingMore}
            error={data.error}
            retry={data.retry}
            page={data.page}
            totalPages={data.totalPages}
            observerRef={data.observerRef}
            onReset={() => setFilters(initialFilters)}
        />
    );
}

export default Movies;
