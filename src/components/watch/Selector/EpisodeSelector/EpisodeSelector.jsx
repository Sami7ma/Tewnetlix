import { useState } from "react";
import "../Selector.css";

const EpisodeSelector = ({
    episode,
    episodeCount,
    onChange
}) => {

    const [open, setOpen] = useState(false);

    const episodes = Array.from(
        { length: episodeCount },
        (_, index) => index + 1
    );


    return (

        <div
            className="custom-selector"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >

            <button className="selector-button">
                Episode {episode}
                
            </button>


            <div className={`selector-dropdown ${open ? "open" : ""}`}>

                {
                    episodes.map(ep => (

                        <button
                            key={ep}
                            className={
                                episode === ep
                                ? "option active"
                                : "option"
                            }
                            onClick={() => onChange(ep)}
                        >
                            Episode {ep}
                        </button>

                    ))
                }

            </div>

        </div>

    );

};


export default EpisodeSelector;