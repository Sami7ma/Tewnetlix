import Hero from "../../components/hero/HomeHero/Hero";
import MovieRow from "../../components/media/MediaRow/MediaRow";
import "./Home.css";

import { useEffect, useState } from "react";

import {
    getTrendingMovies,
    getTrendingTVShows,
    getTopRatedMovies,
    getTopRatedTVShows,
    getPopularTVShows
} from "../../services/tmdb";
import LoadingSpinner from "../../components/layout/LoadingSpinner/LoadingSpinner";
import ErrorState from "../../components/states/ErrorState/ErrorState";


function Home() {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [tvshows, setTvshows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);


    useEffect(() => {

        async function loadMovies() {

            try {

                const [
                    trendingMoviesData,
                    trendingTVData,
                    topRatedMoviesData,
                    topRatedTVData,

                    popularTVData

                ] = await Promise.all([

                    getTrendingMovies(),
                    getTrendingTVShows(),

                    getTopRatedMovies(),
                    getTopRatedTVShows(),

                    getPopularTVShows()

                ]);


                setTrendingMovies(trendingMoviesData);
                setTrendingTV(trendingTVData);
                setTopRatedMovies(topRatedMoviesData);
                setTopRatedTV(topRatedTVData);

                setTvshows(popularTVData);

            } catch (error) {
                console.error("Failed to load homepage:", error);
                setError(error);
            } finally {
                setLoading(false);
            }

        }


        loadMovies();

    }, [reloadKey]);

    if (loading) {
        return (
            <main className="home">
                <LoadingSpinner text="Loading your home..." />
            </main>
        );
    }

    if (error) {
        return (
            <main className="home">
                <ErrorState
                    message="The home page could not be loaded."
                    onAction={() => {
                        setError(null);
                        setLoading(true);
                        setReloadKey(key => key + 1);
                    }}
                />
            </main>
        );
    }


    return (
        <main className="home">
            <Hero items={trendingMovies}/>
            <MovieRow title="Trending Today"
                movies={trendingMovies}
                categories={{
                    movies: trendingMovies,
                    tv: trendingTV,
                }}
            />
            <MovieRow
                title="Top Rated"
                movies={topRatedMovies}
                categories={{
                    movies: topRatedMovies,
                    tv: topRatedTV,
                }}
            />
            <MovieRow
                title="Popular TV Shows"
                movies={tvshows}
            />
        </main>
    );
}


export default Home;