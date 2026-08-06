import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Player from "../../components/watch/Player/Player";
import ServerSelector from "../../components/watch/ServerSelector/ServerSelector";
import PlayerNotice from "../../components/watch/PlayerNotice/PlayerNotice";
import MovieRow from "../../components/movie/MovieRow";

import { getMovieEmbed } from "../../services/embed";
import {
    getMovieDetails,
    getMovieRecommendations,
} from "../../services/tmdb";

import "./Watch.css";

function MoviePlayer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const SERVERS = [
        { id: 1, name: "Server 1" },
        { id: 2, name: "Server 2" },
        { id: 3, name: "Server 3" },
        { id: 4, name: "Server 4" },
        { id: 5, name: "Server 5" },
        { id: 6, name: "Server 6" },
        { id: 7, name: "Server 7" },
        { id: 8, name: "Server 8" },
    ];

    const [selectedServer, setSelectedServer] = useState(1);
    const [recommendations, setRecommendations] = useState([]);
    const [movie, setMovie] = useState(null);

    const playerURL = getMovieEmbed(id, selectedServer);

    useEffect(() => {
        async function loadData() {
            const [movieData, recommendationData] = await Promise.all([
                getMovieDetails(id),
                getMovieRecommendations(id),
            ]);

            setMovie(movieData);
            setRecommendations(recommendationData);
        }

        loadData();
    }, [id]);

    return (
        <main className="movie-player">
            <div className="watch-container">
                {/* The main grid wrapper for ALL sections */}
                <div className="main-watch-grid">

                    {/* Player */}
                    <div className="grid-area-player">
                        <div className="player-wrapper">
                            <button
                                className="player-back"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft />
                            </button>

                            <Player playerURL={playerURL} />
                        </div>
                    </div>

                    {/* Movie Info */}
                    <div className="grid-area-title">
                        <div className="selection-scroll-box">
                            <span className="now-playing-label">
                                Now Playing
                            </span>

                            {movie && (
                                <>
                                    <h2 className="selection-title">
                                        {movie.title}
                                    </h2>

                                    <p className="movie-meta">
                                        ★ {movie.vote_average.toFixed(1)}
                                        {" • "}
                                        {movie.release_date.slice(0, 4)}
                                        {" • "}
                                        {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Servers */}
                    <div className="grid-area-servers">
                        <div className="server-container">
                            <ServerSelector
                                servers={SERVERS}
                                selectedServer={selectedServer}
                                setSelectedServer={setSelectedServer}
                            />
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="grid-area-notice">
                        <div className="player-notice-wrapper">
                            <PlayerNotice />
                        </div>
                    </div>

                    {/* Recommendations (Now inside the grid!) */}
                    <div className="grid-area-recommendation">
                        <MovieRow
                            title="More Like This"
                            movies={recommendations}
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}

export default MoviePlayer;