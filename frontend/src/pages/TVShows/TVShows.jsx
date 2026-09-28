import { useState } from "react";
import TVFilter from "../../components/media/MeidaFilter/TVFilter";
import DiscoveryPage from "../../components/discovery/DiscoveryPage/DiscoveryPage";
import useInfiniteMedia from "../../hooks/useInfiniteMedia";
import { getDiscoverTV } from "../../services/tmdb";

const initialFilters = {
    genres: [], year: "", rating: "", length: "", status: "", type: "",
    sort: "popularity.desc",
};

function TVShows() {
    const [filters, setFilters] = useState(initialFilters);
    const data = useInfiniteMedia(getDiscoverTV, filters);
    return (
        <DiscoveryPage
            title="TV Shows"
            className="tv-shows"
            filters={<TVFilter filters={filters} onChange={setFilters} />}
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

export default TVShows;
