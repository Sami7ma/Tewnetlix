import Navbar from "../../components/layout/Navbar/Navbar";
import Hero from "../../components/hero/HomeHero/Hero";
import MovieRow from "../../components/media/MediaRow/MediaRow";
import "./Home.css";
import {useEffect, useState} from "react";
import {
    getTrendingMovies,
    getTopRatedMovies,
    getPopularTVShows,
} from "../../services/tmdb";

function Home(){
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [tvshows, setTvshows] = useState([]);

    useEffect(()=>{
        async function loadMovies(){
            const trending = await getTrendingMovies();
            const topRated = await getTopRatedMovies();
            const tvshows = await getPopularTVShows();
            setTrendingMovies(trending);
            setTopRatedMovies(topRated);
            setTvshows(tvshows);
        }
        loadMovies();
    },[]);

    return(
        <main className="home">

            <Navbar />

            <Hero />

            <MovieRow title="Trending Today"movies={trendingMovies}/>
            {/* continue watching is not a version 1 feature */}
            {/* <MovieRow title="Continue Watching " movies={movies}/> */}
            <MovieRow title="Top Rated" movies={topRatedMovies} />
            {/* <MovieRow title="Newly Released" movies={newlyReleasedMovies}/> */}
            <MovieRow title ="Popular Tv Shows" movies={tvshows}/>
        </main>
    );
}


export default Home;