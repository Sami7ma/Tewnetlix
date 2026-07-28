import {useParams} from "react-router-dom";
function TVShow(){
    const {id} = useParams();
    return(
        <h1>
            TV Show Details for ID: {id}
        </h1>
    )
}

export default TVShow;