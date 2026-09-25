import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/hero/HomeHero/Hero";
import MovieRow from "../../components/media/MediaRow/MediaRow";
import "./Home.css";

import { useEffect, useState } from "react";

import {
    getTrendingMovies,
    getTrendingTVShows,
    getTrendingAnime,
    getTopRatedMovies,
    getTopRatedTVShows,
    getTopRatedAnime,
    getPopularTVShows
} from "../../services/tmdb";


function Home() {

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [trendingAnime, setTrendingAnime] = useState([]);

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [topRatedAnime, setTopRatedAnime] = useState([]);

    const [tvshows, setTvshows] = useState([]);


    useEffect(() => {

        async function loadMovies() {

            try {

                const [
                    trendingMoviesData,
                    trendingTVData,
                    trendingAnimeData,

                    topRatedMoviesData,
                    topRatedTVData,
                    topRatedAnimeData,

                    popularTVData

                ] = await Promise.all([

                    getTrendingMovies(),
                    getTrendingTVShows(),
                    getTrendingAnime(),

                    getTopRatedMovies(),
                    getTopRatedTVShows(),
                    getTopRatedAnime(),

                    getPopularTVShows()

                ]);


                setTrendingMovies(trendingMoviesData);
                setTrendingTV(trendingTVData);
                setTrendingAnime(trendingAnimeData);

                setTopRatedMovies(topRatedMoviesData);
                setTopRatedTV(topRatedTVData);
                setTopRatedAnime(topRatedAnimeData);

                setTvshows(popularTVData);

            } catch (error) {

                console.error(
                    "Failed to load homepage:",
                    error
                );

            }

        }


        loadMovies();

    }, []);


    return (
        <main className="home">
            <Navbar />
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