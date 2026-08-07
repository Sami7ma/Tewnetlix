import { useState } from "react";
import "../Selector.css";

const SeasonSelector = ({ seasons = [], selectedSeason, onChange }) => {

    const [open, setOpen] = useState(false);

    return (
        <div 
            className="custom-selector"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >

            <button className="selector-button">
                Season {selectedSeason}
                
            </button>


            <div className={`selector-dropdown ${open ? "open" : ""}`}>

                {
                    seasons.map(season => (

                        <button
                            key={season.season_number}
                            className={
                                selectedSeason === season.season_number
                                ? "option active"
                                : "option"
                            }
                            onClick={() =>
                                onChange(season.season_number)
                            }
                        >
                            Season {season.season_number}
                        </button>

                    ))
                }

            </div>

        </div>
    );
};


export default SeasonSelector;