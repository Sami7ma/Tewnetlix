import { fetchFromTMDB } from "./api";
const LIMIT = 35;
const ANIME_KEYWORD_ID = 210024;

/* =========================================
   GENRES CACHE
========================================= */

let movieGenres = null;
let tvGenres = null;


/* =========================================
   MOVIE GENRES
========================================= */

async function getMovieGenres() {
    if (movieGenres) {
        return movieGenres;
    }
    const data = await fetchFromTMDB(
        "/genre/movie/list"
    );
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
    const data = await fetchFromTMDB(
        "/genre/tv/list"
    );
    tvGenres = Object.fromEntries(
        data.genres.map(genre => [
            genre.id,
            genre.name
        ])
    );
    return tvGenres;
}


/* =========================================
   NORMALIZE MEDIA
========================================= */

function normalizeMediaList(
    items = [],
    mediaType
) {
    return items.map(item => ({
        ...item,
        media_type:
            item.media_type || mediaType
    }));
}

/* =========================================
   ADD MOVIE GENRE NAMES
========================================= */
async function addMovieGenres(movies) {
    const genres =
        await getMovieGenres();
    return normalizeMediaList(
        movies,
        "movie"
    ).map(movie => ({
        ...movie,
        genre_names:
            (movie.genre_ids || [])
                .map(id => genres[id])
                .filter(Boolean)
    }));
}
/* =========================================
   ADD TV GENRE NAMES
========================================= */

async function addTVGenres(shows) {
    const genres =
        await getTVGenres();
    return normalizeMediaList(
        shows,
        "tv"
    ).map(show => ({
        ...show,
        genre_names:
            (show.genre_ids || [])
                .map(id => genres[id])

                .filter(Boolean)

    }));

}


/* =========================================
   MOVIES
========================================= */

export async function getTrendingMovies() {

    const data =
        await fetchFromTMDB(
            "/trending/movie/week"
        );

    const results =
        data.results.slice(0, LIMIT);

    return await addMovieGenres(
        results
    );

}


export async function getTopRatedMovies() {
    const data =await fetchFromTMDB(
            "/movie/top_rated"
        );

    const results =data.results.slice(0, LIMIT);
    return await addMovieGenres(results);
}
export async function getPopularMovies() {
    const data =await fetchFromTMDB("/movie/popular");
    const results =data.results.slice(0, LIMIT);
    return await addMovieGenres(results);
}

export async function searchMulti(query) {
    if (!query.trim()) {
        return [];
    }
    const data =await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
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
            item =>
                item.media_type === "tv"
        );
    const movieResults = await addMovieGenres(movies);
    const tvResults = await addTVGenres(shows);
    const normalizedResults =
        results
            .map(item => {
                if (
                    item.media_type === "movie"
                ) {
                    return movieResults.find(
                        movie =>
                            movie.id === item.id
                    );
                }
                return tvResults.find(
                    show =>
                        show.id === item.id
                );
            })
            .filter(Boolean);
    return normalizedResults;
}

export async function getMovieDetails(id) {
    return await fetchFromTMDB(`/movie/${id}`);
}
export async function getMovieCredits(id) {
    const data =await fetchFromTMDB(`/movie/${id}/credits`);
    return data.cast.slice(0,12);
}
export async function getMovieRecommendations(id) {
    const data = await fetchFromTMDB(`/movie/${id}/recommendations`);
    const results = data.results.slice(0, LIMIT);
    return await addMovieGenres(results);
}
export async function getMovieTrailer(id) {
    const data = await fetchFromTMDB(`/movie/${id}/videos`);
    return (
        data.results.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        ) || null
    );

}
export async function getPopularTVShows() {
    const data =await fetchFromTMDB("/tv/popular");
    const results =data.results.slice(0,LIMIT);
    return await addTVGenres(results);
}


export async function getTrendingTVShows() {
    const data = await fetchFromTMDB("/trending/tv/week");
    const results = data.results.slice(0,LIMIT);
    return await addTVGenres(results);
}
export async function getTopRatedTVShows() {
    const data = await fetchFromTMDB("/tv/top_rated");
    const results =data.results.slice(0,LIMIT);
    return await addTVGenres(results);
}
export async function getTVDetails(id) {
    return await fetchFromTMDB(`/tv/${id}`);
}

export const getTVCredits =
    async (id) => {
        const data = await fetchFromTMDB(`/tv/${id}/credits`);
        return data.cast.slice(0,12);
    };

export const getTVRecommendations =
    async (id) => {

        const data =
            await fetchFromTMDB(
                `/tv/${id}/recommendations`
            );

        const results =
            data.results.slice(
                0,
                LIMIT
            );

        return await addTVGenres(
            results
        );

    };


/* =========================================
   TV TRAILER
========================================= */

export const getTVTrailer =
    async (id) => {

        const data =
            await fetchFromTMDB(
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


/* =========================================
   TV SEASON DETAILS
========================================= */

export async function getSeasonDetails(
    id,
    season
) {

    return await fetchFromTMDB(
        `/tv/${id}/season/${season}`
    );

}


/* =========================================
   DISCOVER MOVIES
========================================= */

export async function getDiscoverMovies({

    genres = [],

    year = "",

    rating = "",

    length = "",

    sort = "popularity.desc",

    page = 1

}) {

    const params =
        new URLSearchParams();


    params.append(
        "sort_by",
        sort
    );


    params.append(
        "page",
        page
    );


    /* ================================
       GENRES
    ================================= */

    if (genres.length > 0) {

        params.append(

            "with_genres",

            genres.join("|")

        );

    }


    /* ================================
       RELEASE YEAR
    ================================= */

    if (year) {

        params.append(

            "primary_release_year",

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
       RUNTIME
    ================================= */

    if (length === "short") {

        params.append(
            "with_runtime.lte",
            "90"
        );

    }


    if (length === "medium") {

        params.append(
            "with_runtime.gte",
            "90"
        );

        params.append(
            "with_runtime.lte",
            "120"
        );

    }


    if (length === "long") {

        params.append(
            "with_runtime.gte",
            "120"
        );

        params.append(
            "with_runtime.lte",
            "180"
        );

    }


    if (length === "epic") {

        params.append(
            "with_runtime.gte",
            "180"
        );

    }


    /* ================================
       RATING SORT PROTECTION
    ================================= */

    if (
        sort === "vote_average.desc"
    ) {

        params.append(
            "vote_count.gte",
            "100"
        );

    }


    /* ================================
       FETCH
    ================================= */

    const data =
        await fetchFromTMDB(
            `/discover/movie?${params.toString()}`
        );


    return {

        ...data,

        results:
            normalizeMediaList(
                data.results || [],
                "movie"
            )

    };

}


/* =========================================
   DISCOVER TV
========================================= */

export const getDiscoverTV =
    async ({

        genres = [],

        genreOperator = "|",

        year = "",

        rating = "",

        length = "",

        status = "",

        type = "",

        keyword = "",

        sort = "popularity.desc",

        page = 1

    }) => {

        const params =
            new URLSearchParams();


        params.append(
            "page",
            page
        );


        params.append(
            "sort_by",
            sort
        );


        /* ================================
           GENRES
        ================================= */

        if (genres.length) {

            params.append(

                "with_genres",

                genres.join(
                    genreOperator
                )

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
           KEYWORD
        ================================= */

        if (keyword) {

            params.append(
                "with_keywords",
                keyword
            );

        }


        /* ================================
           FETCH
        ================================= */

        const data =
            await fetchFromTMDB(
                `/discover/tv?${params.toString()}`
            );


        return {

            ...data,

            results:
                normalizeMediaList(
                    data.results || [],
                    "tv"
                )

        };

    };


/* =========================================
   DISCOVER ANIME
========================================= */

export const getDiscoverAnime =
    async ({

        genres = [],

        year = "",

        rating = "",

        length = "",

        status = "",

        type = "",

        sort = "popularity.desc",

        page = 1

    }) => {


        /*
            TMDB Animation genre = 16

            We always require Animation.

            The Anime keyword makes the
            results much more specifically
            anime rather than ordinary
            Western animation.
        */

        const animeGenres = [

            16,

            ...genres.filter(
                genre =>
                    genre !== 16
            )

        ];


        return await getDiscoverTV({

            genres: animeGenres,

            /*
                If a user chooses another genre:

                Animation AND Action
                Animation AND Adventure

                etc.

                Comma = AND
            */

            genreOperator: ",",

            year,

            rating,

            length,

            status,

            type,

            sort,

            page,

            keyword:
                ANIME_KEYWORD_ID

        });

    };


/* =========================================
   ANIME
========================================= */

export async function getAnimeTVShows() {

    const data =
        await fetchFromTMDB(

            `/discover/tv?` +
            `with_genres=16` +
            `&with_keywords=${ANIME_KEYWORD_ID}` +
            `&sort_by=popularity.desc`

        );


    const results =
        data.results.slice(
            0,
            LIMIT
        );


    return await addTVGenres(
        results
    );

}
/* =========================================
   TRENDING ANIME
========================================= */

export async function getTrendingAnime() {

    const data = await fetchFromTMDB(
        `/discover/tv?` +
        `with_genres=16` +
        `&with_keywords=${ANIME_KEYWORD_ID}` +
        `&sort_by=popularity.desc`
    );

    const results = data.results.slice(
        0,
        LIMIT
    );

    return await addTVGenres(results);
}


/* =========================================
   TOP RATED ANIME
========================================= */

export async function getTopRatedAnime() {

    const data = await fetchFromTMDB(
        `/discover/tv?` +
        `with_genres=16` +
        `&with_keywords=${ANIME_KEYWORD_ID}` +
        `&sort_by=vote_average.desc` +
        `&vote_count.gte=100`
    );

    const results = data.results.slice(
        0,
        LIMIT
    );

    return await addTVGenres(results);
}