import Select from "../../../ui/Select/Select";
import "../Selector.css";

const SeasonSelector = ({ seasons = [], selectedSeason, onChange }) => {

    return (
        <Select
            id="season-selector"
            label="Season"
            value={selectedSeason}
            onChange={event => onChange(Number(event.target.value))}
        >
            {seasons.map(season => (
                <option key={season.season_number} value={season.season_number}>
                    Season {season.season_number}
                </option>
            ))}
        </Select>
    );
};


export default SeasonSelector;