import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Player from "../../components/watch/Player/Player";
import ServerSelector from "../../components/watch/ServerSelector/ServerSelector";
import PlayerNotice from "../../components/watch/PlayerNotice/PlayerNotice";
import MovieRow from "../../components/movie/MovieRow";

import { getMovieEmbed } from "../../services/embed";

import "./Watch.css";

function MoviePlayer(){

    const { id } = useParams();

    const navigate = useNavigate();

    const SERVERS=[
        {id:1,name:"Server 1"},
        {id:2,name:"Server 2"},
        {id:3,name:"Server 3"},
        {id:4,name:"Server 4"},
    ];

    const [selectedServer,setSelectedServer]=useState(1);

    const playerURL=getMovieEmbed(id,selectedServer);

    return(

        <main className="movie-player">

            <div className="watch-container">

                <button
                    className="player-back"
                    onClick={()=>navigate(-1)}
                >
                    <ArrowLeft/>
                </button>

                <Player playerURL={playerURL}/>

                <ServerSelector
                    servers={SERVERS}
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                />

                <PlayerNotice/>

                <MovieRow
                    title="More Like This"
                    movies={[]}
                />

            </div>

        </main>

    );

}

export default MoviePlayer;