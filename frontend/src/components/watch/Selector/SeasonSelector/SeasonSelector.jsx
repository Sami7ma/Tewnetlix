import { useState } from "react";
import "../Selector.css";

const SeasonSelector = ({ seasons = [], selectedSeason, onChange }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="custom-selector">

            <button 
                className="selector-button"
                onClick={() => setOpen(!open)}
                >
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
                            onClick={() =>{
                                onChange(season.season_number);
                                setOpen(false);
                            }}
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