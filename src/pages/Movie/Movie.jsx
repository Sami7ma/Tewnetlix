import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import { ArrowLeft, Volume, VolumeOff, Play, HeartPlus } from "lucide-react";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieRecommendations,
    getMovieVideos,
} from "../../services/tmdb";
function Movie(){
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        async function loadMovie(){
            try{
                const movie = await getMovieDetails(id);
                const cast = await getMovieCredits(id);
                const recommendations = await getMovieRecommendations(id);
                const trailer = await getMovieVideos(id);
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

    return(
        <main className="movie-page">
            
            <section className="movie-hero">
                <div className="button-container">
                    <button className="back-button" onClick={()=> navigater(-1)}>
                        <ArrowLeft />
                        </button>
                        <button className="volume-button">
                            <VolumeOff />
                        </button>
                </div>
                <div className="movie-info-container">
                    <h1>{movie?.title || movie?.name || "Movie Title"}</h1>
                </div>
                <button className="play-button">
                    <Play />
                </button>
                <div className="movie-meta">
                    <span> ★ {movie?.vote_average?.toFixed(1)} • {movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "Runtime"} </span>
                    
                </div>
                <p>{movie?.overview || "No overview available."}</p>
                <button className="favorite-button">
                    <HeartPlus /> Add to Favorites
                </button>
            </section>
            <section className="cast-section">
                <h2>Cast</h2>
                <div className="cast-list">
                    {/* Map through the cast array and display each actor */}
                    {cast.cast?.map(actor => (
                        <div key={actor.id} className="cast-card">
                            <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "default-profile-image.jpg"} alt={actor.name} />
                            <h3>{actor.name}</h3>
                            <p>{actor.character}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Movie;