import { useParams } from "react-router-dom";
import { useCallback } from "react";

import {
    getTVDetails,
    getTVCredits,
    getTVRecommendations,
    getTVTrailer,
} from "../../services/tmdb";

import CastList from "../../components/cast/CastList/CastList";
import MovieRow from "../../components/media/MediaRow/MediaRow";
import DetailHero from "../../components/hero/DetailHero/DetailHero";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";
import useMediaDetails from "../../hooks/useMediaDetails";

import "./TVShow.css";

function TVShow() {

    const { id } = useParams();

    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;

    const loadTVShow = useCallback(async signal => {
        const options = { signal };
        const [details, cast, recommendations, trailer] =
            await Promise.all([
                getTVDetails(id, options),
                getTVCredits(id, options),
                getTVRecommendations(id, options),
                getTVTrailer(id, options),
            ]);

        return { details, cast, recommendations, trailer };
    }, [id]);

    const { data, loading, error, retry } =
        useMediaDetails(loadTVShow, [id]);

    const tvShow = data?.details;

    if (loading) {
        return (
            <LoadingSpinner text="Loading TV show details..." />
        );
    }

    if (error || !tvShow) {
        return (
            <ErrorState
                title="TV show unavailable"
                message="This TV show could not be loaded."
                onAction={retry}
            />
        );
    }

    return (
        <main className="tv-page">

            <DetailHero
                media={tvShow}
                trailer={data.trailer}
                imageURL={imageURL}
            />

            <section className="cast-section">
                <CastList
                    cast={data.cast}
                    imageURL={imageURL}
                />
            </section>

            <section className="recommendations-section">
                <MovieRow
                    title="Recommended TV Shows"
                    movies={data.recommendations}
                />
            </section>

        </main>
    );

}

export default TVShow;