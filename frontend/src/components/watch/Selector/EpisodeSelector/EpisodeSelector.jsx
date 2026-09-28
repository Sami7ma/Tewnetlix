import Select from "../../../ui/Select/Select";
import "../Selector.css";

const EpisodeSelector = ({
    episode,
    episodes = [],
    onChange,
}) => {

    return (
        <Select
            id="episode-selector"
            label="Episode"
            value={episode}
            onChange={event => onChange(Number(event.target.value))}
        >
            {episodes.map(ep => (
                <option key={ep.episode_number} value={ep.episode_number}>
                    Episode {ep.episode_number}{ep.name ? `: ${ep.name}` : ""}
                </option>
            ))}
        </Select>
    );
};

export default EpisodeSelector;