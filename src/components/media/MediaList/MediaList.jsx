import MediaCard from "../MediaCard/MediaCard";
import "./MediaList.css";

const MediaList = ({ movies = [] }) => {

    if (!movies.length) {
        return (
            <div className="media-empty">
                <p>No movies found</p>
                <span>Try changing your filters.</span>
            </div>
        );
    }

    return (
        <div className="media-list">
            {movies.map((item) => (
                <MediaCard
                    key={`${item.media_type || "movie"}-${item.id}`}
                    media={item}
                />
            ))}
        </div>
    );
};

export default MediaList;