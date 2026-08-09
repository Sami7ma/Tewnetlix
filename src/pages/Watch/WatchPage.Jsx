import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Player from "../../components/watch/Player/Player";
import ServerSelector from "../../components/watch/ServerSelector/ServerSelector";
import PlayerNotice from "../../components/watch/PlayerNotice/PlayerNotice";
import MovieRow from "../../components/movie/MovieRow/MovieRow";
import NavBar from "../../components/layout/Navbar/Navbar";
import SeasonSelector from "../../components/watch/Selector/SeasonSelector/SeasonSelector";
import EpisodeSelector from "../../components/watch/Selector/EpisodeSelector/EpisodeSelector";

import { getMovieEmbed } from "../../services/embed";

import {
    getTVDetails,
    getTVRecommendations,
    getSeasonDetails,
    getMovieDetails,
    getMovieRecommendations,
} from "../../services/tmdb";

import "./Watch.css";

const WatchPage = () => {
    const { type, id } = useParams();
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

    const [media, setMedia] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    const [episodes, setEpisodes] = useState([]);

    const playerURL = getMovieEmbed(
        id,
        selectedServer,
        type,
        season,
        episode
    );

    const filteredSeasons =
        media?.seasons?.filter(
            (season) => season.season_number !== 0
        ) || [];

    useEffect(() => {

        async function loadMedia() {

            try {

                if (type === "movie") {

                    const [details, recs] = await Promise.all([
                        getMovieDetails(id),
                        getMovieRecommendations(id),
                    ]);

                    setMedia(details);
                    setRecommendations(recs);

                } else {

                    const [details, recs] = await Promise.all([
                        getTVDetails(id),
                        getTVRecommendations(id),
                    ]);

                    setMedia(details);
                    setRecommendations(recs);

                    const firstSeason =
                        details.seasons.find(
                            s => s.season_number !== 0
                        );

                    if (firstSeason) {
                        setSeason(firstSeason.season_number);
                    }

                }

            } catch (err) {

                console.error(err);

            }

        }

        loadMedia();

    }, [id, type]);

    useEffect(() => {

        if (type !== "tv") return;

        async function loadEpisodes() {

            try {

                const data = await getSeasonDetails(id, season);

                setEpisodes(data.episodes || []);

                setEpisode(1);

            } catch (err) {

                console.error(err);

            }

        }

        loadEpisodes();

    }, [id, season, type]);

    const handleSeasonChange = (newSeason) => {

        setSeason(newSeason);

    };

    return (

        <main className="movie-player">

            <NavBar />

            <div className="watch-container">

                <div className="main-watch-grid">

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

                    <div className="grid-area-title">

                        <div className="selection-scroll-box">

                            <span className="now-playing-label">
                                Now Playing
                            </span>

                            {media && (

                                <>

                                    <h2 className="selection-title">

                                        {media.title || media.name}

                                    </h2>

                                    {type === "movie" ? (

                                        <p className="movie-meta">

                                            ★ {media.vote_average.toFixed(1)}
                                            {" • "}
                                            {media.release_date?.slice(0,4)}
                                            {" • "}
                                            {Math.floor(media.runtime / 60)}h{" "}
                                            {media.runtime % 60}m

                                        </p>

                                    ) : (

                                        <div className="tv-meta">

                                            <SeasonSelector
                                                seasons={filteredSeasons}
                                                selectedSeason={season}
                                                onChange={handleSeasonChange}
                                            />

                                            <EpisodeSelector
                                                episode={episode}
                                                episodes={episodes}
                                                onChange={setEpisode}
                                            />

                                        </div>

                                    )}

                                </>

                            )}

                        </div>

                    </div>

                    <div className="grid-area-servers">

                        <div className="server-container">

                            <ServerSelector
                                servers={SERVERS}
                                selectedServer={selectedServer}
                                onChange={setSelectedServer}
                            />

                        </div>

                    </div>

                    <div className="grid-area-notice">

                        <div className="player-notice-wrapper">

                            <PlayerNotice />

                        </div>

                    </div>

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
};

export default WatchPage;