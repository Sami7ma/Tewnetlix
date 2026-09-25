const PRIMARY = import.meta.env.VITE_EMBED_PRIMARY;
const SECONDARY = import.meta.env.VITE_EMBED_SECONDARY;


export function getMovieEmbed(id,server, type, season, episode) {
    let baseURL = server === 1 ? PRIMARY : SECONDARY;
    if(type === "movie"){
        return `${baseURL}/movie/${id}`;
    }
    if(type === "tv"){
        return `${baseURL}/tv/${id}/${season}/${episode}`;
    }
    return null;
}