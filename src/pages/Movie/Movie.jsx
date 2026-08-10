import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
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
const Movie = () => {
    
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;
    const {id} = useParams();

    useEffect(()=>{
        async function loadMovie(){
            try{
                const [movie,cast,recommendations,trailer] = 
                    await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                    getMovieRecommendations(id),
                    getMovieTrailer(id)
                ]);

                setMovie(movie);
                setCast(cast);
                setRecommendations(recommendations);
                setTrailer(trailer);

            }
            catch(error){
                console.error("Error fetching movie details:", error);
            }
        }
        loadMovie();
    },[id]);

    if(!movie){
        return(
            <LoadingSpinner text="Loading movie details..." />
        )

    }
    
    return(
        <main className="movie-page">
            <DetailHero media={movie} imageURL={imageURL} trailer={trailer} />
            <section className="cast-section">
                <div className="cast-list">
                    <CastList cast={cast} imageURL={imageURL} />
                </div>
            </section>
            <section className="recommendations-section">
                <MovieRow 
                    title="Recommended Movies" 
                    movies={recommendations} 
                />
            </section>
        </main>
    )
}

export default Movie;