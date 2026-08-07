import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    getTVDetails,
    getTVCredits,
    getTVRecommendations,
    getTVTrailer,
} from "../../services/tmdb";

import CastList from "../../components/cast/CastList/CastList";
import MovieRow from "../../components/movie/MovieRow";
import DetailHero from "../../components/hero/DetailHero/DetailHero";

import "./TVShow.css";

function TVShow() {

    const { id } = useParams();

    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;

    const [tvShow, setTVShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {

        async function loadTVShow() {

            try {

                const [
                    details,
                    credits,
                    recommendations,
                    trailer
                ] = await Promise.all([
                    getTVDetails(id),
                    getTVCredits(id),
                    getTVRecommendations(id),
                    getTVTrailer(id),
                ]);

                setTVShow(details);
                setCast(credits);
                setRecommendations(recommendations);
                setTrailer(trailer);

            } catch (error) {
                console.error(error);
            }

        }

        loadTVShow();

    }, [id]);

    if (!tvShow) {
        return <div>Loading...</div>;
    }

    return (
        <main className="tv-page">

            <DetailHero
                media={tvShow}
                trailer={trailer}
                imageURL={imageURL}
            />

            <section className="cast-section">
                <CastList
                    cast={cast}
                    imageURL={imageURL}
                />
            </section>

            <section className="recommendations-section">
                <MovieRow
                    title="Recommended TV Shows"
                    movies={recommendations}
                />
            </section>

        </main>
    );

}

export default TVShow;