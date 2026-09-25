import CastCard from "../CastCard/CastCard";
import "./CastList.css";

function CastList({cast, imageURL}) {
    return(
        <section className="cast-section">
            <h2>Cast</h2>
            <div className="cast-list">
                {cast.map(actor=>(
                    <CastCard
                        key={actor.id}
                        actor={actor}
                        imageURL={imageURL}
                    />
                ))}
            </div>
        </section>
    )
}
export default CastList;