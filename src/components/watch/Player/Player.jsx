import "./Player.css";

const Player = ({ playerURL }) => {
    return (
        <section className="player-wrapper">
            <iframe src={playerURL} title="Video Player" allowFullScreen />
        </section>
    )
};

export default Player;