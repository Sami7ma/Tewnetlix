const embedURL = import.meta.env.VITE_EMBED_URL;
const playerColor = import.meta.env.VITE_PLAYER_COLOR;

export function getMovieEmbed(id){

    const params = new URLSearchParams({
        autoplay: 1,
        color: playerColor,
    });

    return `${embedURL}/movie/${id}?${params.toString()}`;
}

export function getTVEmbed(id, season, episode){

    const params = new URLSearchParams({
        autoplay: 1,
        color: playerColor,
    });

    return `${embedURL}/tv/${id}/${season}/${episode}?${params.toString()}`;
}