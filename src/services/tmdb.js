import { fetchFromTMDB } from "./api";

const LIMIT = 35;


/* =========================================
   GENRES
========================================= */

let movieGenres = null;
let tvGenres = null;


async function getMovieGenres() {
    if (movieGenres) {
        return movieGenres;
    }

    const data = await fetchFromTMDB("/genre/movie/list");

    movieGenres = Object.fromEntries(
        data.genres.map(genre => [
            genre.id,
            genre.name
        ])
    );

    return movieGenres;
}


async function getTVGenres() {
    if (tvGenres) {
        return tvGenres;
    }

    const data = await fetchFromTMDB("/genre/tv/list");

    tvGenres = Object.fromEntries(
        data.genres.map(genre => [
            genre.id,
            genre.name
        ])
    );

    return tvGenres;
}


/* =========================================
   ADD GENRE NAMES TO RESULTS
========================================= */

async function addMovieGenres(movies) {
    const genres = await getMovieGenres();

    return movies.map(movie => ({
        ...movie,

        genre_names: (movie.genre_ids || [])
            .map(id => genres[id])
            .filter(Boolean)
    }));
}


async function addTVGenres(shows) {
    const genres = await getTVGenres();

    return shows.map(show => ({
        ...show,

        genre_names: (show.genre_ids || [])
            .map(id => genres[id])
            .filter(Boolean)
    }));
}


/* =========================================
   MOVIES
========================================= */

export async function getTrendingMovies() {
    const data = await fetchFromTMDB("/trending/movie/week");

    const results = data.results.slice(0, LIMIT);

    return await addMovieGenres(results);
}


export async function getTopRatedMovies() {
    const data = await fetchFromTMDB("/movie/top_rated");

    const results = data.results.slice(0, LIMIT);

    return await addMovieGenres(results);
}


export async function searchMulti(query) {
    if (!query.trim()) {
        return [];
    }

    const data = await fetchFromTMDB(
        `/search/multi?query=${encodeURIComponent(query)}`
    );

    const results = data.results
        .filter(
            item =>
                item.media_type === "movie" ||
                item.media_type === "tv"
        )
        .slice(0, LIMIT);

    const movies = results.filter(
        item => item.media_type === "movie"
    );

    const shows = results.filter(
        item => item.media_type === "tv"
    );

    const movieResults = await addMovieGenres(movies);
    const tvResults = await addTVGenres(shows);

    const normalizedResults = results.map(item => {
        if (item.media_type === "movie") {
            return movieResults.find(
                movie => movie.id === item.id
            );
        }

        return tvResults.find(
            show => show.id === item.id
        );
    });

    return normalizedResults;
}

export async function getMovieDetails(id) {
    return await fetchFromTMDB(`/movie/${id}`);
}


export async function getMovieCredits(id) {
    const data = await fetchFromTMDB(`/movie/${id}/credits`);

    return data.cast.slice(0, 12);
}


export async function getMovieRecommendations(id) {
    const data = await fetchFromTMDB(
        `/movie/${id}/recommendations`
    );

    const results = data.results.slice(0, LIMIT);

    return await addMovieGenres(results);
}


export async function getMovieTrailer(id) {
    const data = await fetchFromTMDB(
        `/movie/${id}/videos`
    );

    return data.results.find(
        video =>
            video.site === "YouTube" &&
            video.type === "Trailer"
    );
}


/* =========================================
   TV SHOWS
========================================= */

export async function getPopularTVShows() {
    const data = await fetchFromTMDB("/tv/popular");

    const results = data.results.slice(0, LIMIT);

    return await addTVGenres(results);
}


export async function getTVDetails(id) {
    return await fetchFromTMDB(`/tv/${id}`);
}


export const getTVCredits = async (id) => {
    const data = await fetchFromTMDB(`/tv/${id}/credits`);

    return data.cast.slice(0, 12);
};


export const getTVRecommendations = async (id) => {
    const data = await fetchFromTMDB(
        `/tv/${id}/recommendations`
    );

    const results = data.results.slice(0, LIMIT);

    return await addTVGenres(results);
};


export const getTVTrailer = async (id) => {
    const data = await fetchFromTMDB(
        `/tv/${id}/videos`
    );

    return (
        data.results.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) || null
    );
};


export async function getSeasonDetails(id, season) {
    return await fetchFromTMDB(
        `/tv/${id}/season/${season}`
    );
};
export async function getDiscoverMovies({
    genres = [],
    year = "",
    sort = "popularity.desc",
    page = 1
}) {

    const params = new URLSearchParams();

    params.append("sort_by", sort);
    params.append("page", page);

    /*
        TMDB:
        comma = AND
        pipe = OR

        We want:
        Action OR Comedy OR Drama

        So:
        28|35|18
    */

    if (genres.length > 0) {
        params.append(
            "with_genres",
            genres.join("|")
        );
    }

    if (year) {
        params.append(
            "primary_release_year",
            year
        );
    }

    /*
        Prevent very low-vote movies from appearing
        when sorting by rating.
    */
    if (sort === "vote_average.desc") {
        params.append("vote_count.gte", "100");
    }

    const data = await fetchFromTMDB(
        `/discover/movie?${params.toString()}`
    );

    return data;
}
export const getDiscoverTV = async ({
    genres = [],
    year = "",
    rating = "",
    length = "",
    status = "",
    type = "",
    sort = "popularity.desc",
    page = 1
}) => {

    const params = new URLSearchParams();

    params.append("page", page);
    params.append("sort_by", sort);

    /* ================================
       GENRES
    ================================= */

    if (genres.length) {
        params.append(
            "with_genres",
            genres.join("|")
        );
    }


    /* ================================
       FIRST AIR YEAR
    ================================= */

    if (year) {
        params.append(
            "first_air_date_year",
            year
        );
    }


    /* ================================
       RATING
    ================================= */

    if (rating) {
        params.append(
            "vote_average.gte",
            rating
        );
    }


    /* ================================
       EPISODE RUNTIME
    ================================= */

    if (length === "short") {

        params.append(
            "with_runtime.lte",
            "30"
        );

    }

    if (length === "medium") {

        params.append(
            "with_runtime.gte",
            "30"
        );

        params.append(
            "with_runtime.lte",
            "60"
        );

    }

    if (length === "long") {

        params.append(
            "with_runtime.gte",
            "60"
        );

        params.append(
            "with_runtime.lte",
            "90"
        );

    }

    if (length === "epic") {

        params.append(
            "with_runtime.gte",
            "90"
        );

    }


    /* ================================
       STATUS
    ================================= */

    if (status) {

        params.append(
            "with_status",
            status
        );

    }


    /* ================================
       TYPE
    ================================= */

    if (type) {

        params.append(
            "with_type",
            type
        );

    }


    /* ================================
       FETCH FROM TMDB
    ================================= */

    return await fetchFromTMDB(
        `/discover/tv?${params.toString()}`
    );

};