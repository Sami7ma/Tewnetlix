import { fetchFromTMDB } from "./api";

const LIMIT = 45; // Limit the number of results to fetch
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