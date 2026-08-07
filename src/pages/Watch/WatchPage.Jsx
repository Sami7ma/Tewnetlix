    import { useState, useEffect } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { ArrowLeft, Star } from "lucide-react";

    import Player from "../../components/watch/Player/Player";
    import ServerSelector from "../../components/watch/ServerSelector/ServerSelector";
    import PlayerNotice from "../../components/watch/PlayerNotice/PlayerNotice";
    import MovieRow from "../../components/movie/MovieRow";
    import NavBar from "../../components/layout/Navbar/Navbar";
    import SeasonSelector from "../../components/watch/Selector/SeasonSelector/SeasonSelector";
    import EpisodeSelector from "../../components/watch/Selector/EpisodeSelector/EpisodeSelector";
    import { getMovieEmbed } from "../../services/embed";
    import {
        getTVDetails,
        getTVRecommendations,
        getMovieDetails,
        getMovieRecommendations,
    } from "../../services/tmdb";

    import "./Watch.css";
    

    const WatchPage =() => {
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
        const [recommendations, setRecommendations] = useState([]);
        const [media, setMedia] = useState(null);
        const [season, setSeason] = useState(1);
        const [episode, setEpisode] = useState(1);
        const [seasonCount, setSeasonCount] = useState(1);
        const [episodeCount, setEpisodeCount] = useState(1);

        const playerURL = getMovieEmbed(id, selectedServer,type, season, episode);

        useEffect(() => {
            async function loadData() {
                try{
                    let details;
                    let recommendations;
                    if (type === "movie") {
                        [details, recommendations] = await 
                            Promise.all([
                                getMovieDetails(id),
                                getMovieRecommendations(id),
                            ]);
                    }else if (type === "tv") {
                        [details, recommendations] = await 
                            Promise.all([
                                getTVDetails(id),
                                getTVRecommendations(id),
                            ]);
                    }
                    setRecommendations(recommendations);
                    setMedia(details);
                    if (type === "tv") {
                        setSeasonCount(details.number_of_seasons);
                        const currentSeason = details.seasons.find(
                            seasonData => seasonData.season_number === season
                        );
                        setEpisodeCount(currentSeason ? currentSeason.episode_count : 1);
                    }
                }catch(error){
                    console.error("Error fetching media details:", error);
                }
            }

            loadData();
        }, [id, type]);

        const handleSeasonChange = (newSeason) => {
            setSeason(newSeason);
            setEpisode(1); // Reset episode to 1 when season changes
            const selectedSeason = 
                media?.seasons.find(
                    seasonData => seasonData.season_number === newSeason
                );
                setEpisodeCountF(selectedSeason ? selectedSeason.episode_count : 1);
        }
        return (
            <main className="movie-player">
                <NavBar className="navbar" />
                <div className="watch-container">
                    
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

                                {media && (
                                    <>
                                        <h2 className="selection-title">
                                            {media.title || media.name}
                                        </h2>

                                        {
                                            type === "movie" ? (
                                                <p className="movie-meta">
                                                    ★ {media.vote_average.toFixed(1)}
                                                    {" • "}
                                                    {media.release_date?.slice(0,4)}
                                                    {" • "}
                                                    {Math.floor(media.runtime / 60)}h {media.runtime % 60}m
                                                </p>
                                                
                                            ):(
                                                <div className="tv-meta">
                                                    <SeasonSelector
                                                        seasons={
                                                            media.seasons.filter(
                                                                season => season.season_number !== 0
                                                            )
                                                        }
                                                        selectedSeason={season}
                                                        onChange={handleSeasonChange}
                                                    />
                                                    <EpisodeSelector
                                                    episode={episode}
                                                    episodeCount={episodeCount}
                                                    onChange={setEpisode}
                                                    />
                                                </div>
                                            )
                                        }
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
                                    onChange={setSelectedServer}
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

    export default WatchPage;