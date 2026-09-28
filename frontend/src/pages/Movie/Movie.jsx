import {useParams} from "react-router-dom";
import { useCallback } from "react";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieRecommendations,
    getMovieTrailer,
} from "../../services/tmdb";
import CastList from "../../components/cast/CastList/CastList";
import MovieRow from "../../components/media/MediaRow/MediaRow";
import DetailHero from "../../components/hero/DetailHero/DetailHero";
import "./Movie.css";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";
import useMediaDetails from "../../hooks/useMediaDetails";
const Movie = () => {
    
    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;
    const {id} = useParams();

    const loadMovie = useCallback(async signal => {
        const options = { signal };
        const [movie, cast, recommendations, trailer] =
            await Promise.all([
                getMovieDetails(id, options),
                getMovieCredits(id, options),
                getMovieRecommendations(id, options),
                getMovieTrailer(id, options),
            ]);

        return { movie, cast, recommendations, trailer };
    }, [id]);

    const {
        data,
        loading,
        error,
        retry,
    } = useMediaDetails(loadMovie, [id]);

    const movie = data?.movie;

    if (loading) {
        return(
            <LoadingSpinner text="Loading movie details..." />
        )

    }

    if (error || !movie) {
        return (
            <ErrorState
                title="Movie unavailable"
                message="This movie could not be loaded."
                onAction={retry}
            />
        );
    }
    
    return(
        <main className="movie-page">
            <DetailHero key={id} media={movie} imageURL={imageURL} trailer={data.trailer} />
            <CastList cast={data.cast} imageURL={imageURL} />
            <section className="recommendations-section">
                <MovieRow 
                    title="Recommended Movies" 
                    movies={data.recommendations}
                />
            </section>
        </main>
    )
}

export default Movie;