import "./CastCard.css";

function CastCard({actor,imageURL}){

    return(
        <div className="cast-card">
            <img
                src={
                    actor.profile_path
                    ? `${imageURL}${actor.profile_path}`
                    : "/default-profile.png"
                }
                alt={actor.name}
            />
            <div className="cast-info">
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
            </div>
        </div>
    );
}

export default CastCard;