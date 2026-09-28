const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;



export const fetchFromTMDB = async (endpoint, options = {}) => {

    try{
        const separator = endpoint.includes("?") ? "&" : "?";
        const response = await fetch(
            `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
            options,
        );
        if(!response.ok){
            throw new Error("Failed to fetch data from TMDB API");
        }
        return response.json();

    }catch(error){
        if (error.name !== "AbortError") {
            console.error("Error fetching TMDB data:", error);
        }
        throw error;
    }
}