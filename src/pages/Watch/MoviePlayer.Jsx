import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";
import {getMovieEmbed} from "../../services/embed";
import "./Watch.css";



const MoviePlayer = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const playerURL = getMovieEmbed(id);
    return (
        <main className="movie-player">
            <button className="back-button" onClick={() => navigate(-1)}>
                <ArrowLeft />
            </button>
            <iframe
                src={playerURL}
                title="Movie Player"
                allowFullScreen
            />

        </main>
    );
};

export default MoviePlayer;