const BASE_URL = import.meta.env.VIDSRCSBS_URL;

export function getMovieEmbedURL(id, color="CFCFCF") {
    const params = new URLSearchParams({
        autoPlay: 1,
        controls: 0,
        color: color,
    });

     return `${BASE_URL}/movie/${id}?${params}`;
}
export function getTVEmbedURL(
    id,
    season,
    episode,
    color = "CFCFCF"
) {
    const params = new URLSearchParams({
        autoPlay: 1,
        controls: 0,
        color: color,
    })
    return `${BASE_URL}/tv/${id}/${season}/${episode}?${params}`;
}