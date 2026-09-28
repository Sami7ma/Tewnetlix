import MediaCard from "../MediaCard/MediaCard";
import EmptyState from "../../states/EmptyState/EmptyState";
import "./MediaList.css";

const MediaList = ({
    movies = [],
    emptyTitle = "No titles found",
    emptyMessage = "Try changing your filters.",
}) => {

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
            <EmptyState title={emptyTitle} message={emptyMessage} />
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