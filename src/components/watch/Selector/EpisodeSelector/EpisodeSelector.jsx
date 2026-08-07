import { useState } from "react";
import "../Selector.css";

const EpisodeSelector = ({
    episode,
    episodes = [],
    onChange,
}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="custom-selector">

            <button
                className="selector-button"
                onClick={() => setOpen(!open)}
            >
                Episode {episode}
            </button>

            <div className={`selector-dropdown ${open ? "open" : ""}`}>

                {episodes.map((ep) => (
                    <button
                        key={ep.episode_number}
                        className={
                            episode === ep.episode_number
                                ? "option active"
                                : "option"
                        }
                        onClick={() => {
                            onChange(ep.episode_number);
                            setOpen(false);
                        }}
                    >
                        <strong>Episode {ep.episode_number}</strong>

                        {ep.name && (
                            <>
                                <br />
                                <small>{ep.name}</small>
                            </>
                        )}
                    </button>
                ))}

            </div>

        </div>
    );
};

export default EpisodeSelector;