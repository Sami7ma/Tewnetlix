import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { ArrowLeft, Volume, VolumeOff, Play, HeartPlus } from "lucide-react";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieRecommendations,
    getMovieTrailer,
} from "../../services/tmdb";
import CastList from "../../components/cast/CastList/CastList";
import MovieRow from "../../components/movie/MovieRow";
import "./Movie.css";
function Movie(){
    
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadMovie(){
            try{
                const [
                    movie,
                    cast,
                    recommendations,
                    trailer
                ] = await Promise.all([
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
        return <div>Loading...</div>
    }
    
    const backdrop = `${imageURL}${movie.backdrop_path}`;
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    const year = movie.release_date.split("-")[0];
    const rating = movie.vote_average.toFixed(1);
    
    return(
        <main className="movie-page">
            
            <section className="movie-hero" style={{backgroundImage: `url(${backdrop})`,}}>
                <div className="movie-top-buttons">
                        <button className="back-button" onClick={() => navigate (-1)}>
                            <ArrowLeft />
                        </button>
                        <button className="volume-button" >
                            <VolumeOff />
                        </button>
                    </div>
                <div className="movie-overlay">
                        
                </div>
                <div className="movie-content">
                    
                    <div className="movie-info-container">
                        <h1>{movie.title}</h1>
                    </div>
                    <div className="movie-meta">
                        <span>
                            ★ {rating}
                        </span>
                        <span>
                            {runtime}
                        </span>
                        <span>
                            {year}
                        </span>
                    </div>
                    <div className="movie-genres">
                        {movie.genres.map(genre => (
                            <span key={genre.id}>
                                {genre.name}
                                </span>
                            ))}
                    </div>
                    <p className="movie-description">
                        {movie.overview}
                        </p>
                    <div className="movie-actions">
                        <button className="play-button"
                            onClick={()=> navigate(`/watch/movie/${movie.id}`)}>
                            <Play /> Play Now
                        </button>
                        <button className="favorite-button">
                            <HeartPlus /> Add to Favorites
                        </button>
                    </div>
                </div>                                        
            </section>
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