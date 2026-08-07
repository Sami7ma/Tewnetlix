import { fetchFromTMDB } from "./api";

const LIMIT = 25; // Limit the number of results to fetch
export async function getTrendingMovies() {
    const data = await fetchFromTMDB("/trending/movie/week");
    return data.results.slice(0, LIMIT);
}

export async function getTopRatedMovies() {
    const data = await fetchFromTMDB("/movie/top_rated");
    return data.results.slice(0, LIMIT);
}

export async function getPopularTVShows() {
    const data = await fetchFromTMDB("/tv/popular");
    return data.results.slice(0, LIMIT);
}

export async function searchMovies(query){
    const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
    return data.results.slice(0, LIMIT);
}
export async function getMovieDetails(id){
    return await fetchFromTMDB(`/movie/${id}`);
}
export async function getMovieCredits(id) {
    const data = await fetchFromTMDB(`/movie/${id}/credits`);

    return data.cast.slice(0, 12);
}
export async function getMovieRecommendations(id) {
    const data = await fetchFromTMDB(`/movie/${id}/recommendations`);
    return data.results.slice(0, LIMIT);
}
export async function getMovieTrailer(id){

    const data = await fetchFromTMDB(`/movie/${id}/videos`);

    return data.results.find(
        video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );

}

// TV Show related functions
export async function getTVDetails(id) {
    return await fetchFromTMDB(`/tv/${id}`);
}
export const getTVCredits = async (id) => {
    const data = await fetchFromTMDB(`/tv/${id}/credits`);
    return data.cast.slice(0, 12);
}
export const getTVRecommendations = async (id) => {
    const data = await fetchFromTMDB(`/tv/${id}/recommendations`);
    return data.results.slice(0, LIMIT);
}
export const getTVTrailer = async (id) => {
    const data = await fetchFromTMDB(`/tv/${id}/videos`);
    return (data.results.find(
        video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        )|| null
    );
}

export async function getSeasonDetails(id, season) {
    return await fetchFromTMDB(`/tv/${id}/season/${season}`);
}