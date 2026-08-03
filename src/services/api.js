const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const streamURL1 = import.meta.env.VIDSRCSBS_URL;


export const fetchFromTMDB = async (endpoint) => {

    try{
        const separator = endpoint.includes("?") ? "&" : "?";
        const response = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`);
        if(!response.ok){
            throw new Error("Failed to fetch data from TMDB API");
        }
        return response.json();

    }catch(error){
        console.error("Error fetching movies:", error);
        throw error;
    }
}