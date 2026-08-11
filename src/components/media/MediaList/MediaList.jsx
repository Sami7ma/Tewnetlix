import MediaCard from "../MediaCard/MediaCard";
import "./MediaList.css";

const MediaList = ({ movies = [] }) => {

    const uniqueMovies = movies.filter(
        (item, index, array) => {

            const mediaType =
                item.media_type || "movie";

            return (
                index ===
                array.findIndex(
                    other =>
                        (other.media_type || "movie") === mediaType &&
                        other.id === item.id
                )
            );

        }
    );

    if (!uniqueMovies.length) {
        return (
            <div className="media-empty">
                <p>No movies found</p>
                <span>
                    Try changing your filters.
                </span>
            </div>
        );
    }

    return (
        <div className="media-list">

            {uniqueMovies.map((item) => (

                <MediaCard
                    key={`${item.media_type || "movie"}-${item.id}`}
                    media={item}
                />

            ))}

        </div>
    );
};

export default MediaList;