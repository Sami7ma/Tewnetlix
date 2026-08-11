import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    BookmarkPlus,
    Info,
    Play
} from "lucide-react";

import "./Hero.css";


/* =========================================
   FALLBACK SLIDES
========================================= */

const FALLBACK_SLIDES = [

    {
        id: 157336,
        media_type: "movie",
        title: "Interstellar",
        vote_average: 8.8,
        release_date: "2014-11-07",
        backdrop_path:
            "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
        overview:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    }

];


/* =========================================
   HERO
========================================= */

function Hero({ items = [] }) {

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] =
        useState(0);

    const [isDragging, setIsDragging] =
        useState(false);


    /*
        Track pointer position.
    */

    const dragStartX =
        useRef(0);

    const dragCurrentX =
        useRef(0);


    /*
        Used to restart autoplay
        after manual interaction.
    */

    const timerRef =
        useRef(null);


    /*
        Prevent buttons from triggering
        a drag action.
    */

    const hasDragged =
        useRef(false);


    /* =========================================
       HERO SLIDES
    ========================================= */

    const slides = useMemo(() => {

        const usableItems =
            items.filter(
                item =>
                    item?.backdrop_path
            );

        return usableItems.length
            ? usableItems.slice(0, 8)
            : FALLBACK_SLIDES;

    }, [items]);


    /* =========================================
       RESET SLIDE
    ========================================= */

    useEffect(() => {

        setActiveIndex(0);

    }, [slides]);


    /* =========================================
       AUTOPLAY
    ========================================= */

    const startAutoplay = () => {

        if (timerRef.current) {

            window.clearInterval(
                timerRef.current
            );

        }


        if (slides.length < 2) {
            return;
        }


        timerRef.current =
            window.setInterval(() => {

                setActiveIndex(
                    index =>
                        (index + 1) %
                        slides.length
                );

            }, 6500);

    };


    useEffect(() => {

        startAutoplay();

        return () => {

            if (timerRef.current) {

                window.clearInterval(
                    timerRef.current
                );

            }

        };

    }, [slides.length]);


    /* =========================================
       NEXT SLIDE
    ========================================= */

    const nextSlide = () => {

        setActiveIndex(
            index =>
                (index + 1) %
                slides.length
        );

        startAutoplay();

    };


    /* =========================================
       PREVIOUS SLIDE
    ========================================= */

    const previousSlide = () => {

        setActiveIndex(
            index =>
                index === 0
                    ? slides.length - 1
                    : index - 1
        );

        startAutoplay();

    };


    /* =========================================
       POINTER DOWN
    ========================================= */

    const handlePointerDown = event => {

        /*
            Only respond to primary mouse button.
        */

        if (
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {
            return;
        }


        dragStartX.current =
            event.clientX;

        dragCurrentX.current =
            event.clientX;

        hasDragged.current =
            false;

        setIsDragging(true);


        /*
            Capture the pointer so dragging
            continues even if the pointer
            leaves the hero.
        */

        event.currentTarget.setPointerCapture(
            event.pointerId
        );

    };


    /* =========================================
       POINTER MOVE
    ========================================= */

    const handlePointerMove = event => {

        if (!isDragging) {
            return;
        }


        dragCurrentX.current =
            event.clientX;


        const distance =
            Math.abs(
                dragCurrentX.current -
                dragStartX.current
            );


        if (distance > 8) {

            hasDragged.current =
                true;

        }

    };


    /* =========================================
       POINTER UP
    ========================================= */

    const handlePointerUp = event => {

        if (!isDragging) {
            return;
        }


        const distance =
            dragCurrentX.current -
            dragStartX.current;


        const threshold =
            80;


        /*
            Dragged left
            → next slide
        */

        if (
            distance < -threshold
        ) {

            nextSlide();

        }


        /*
            Dragged right
            → previous slide
        */

        else if (
            distance > threshold
        ) {

            previousSlide();

        }


        setIsDragging(false);


        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {

            event.currentTarget.releasePointerCapture(
                event.pointerId
            );

        }

    };


    /* =========================================
       POINTER CANCEL
    ========================================= */

    const handlePointerCancel = () => {

        setIsDragging(false);

    };


    /* =========================================
       ACTIVE SLIDE
    ========================================= */

    const active =
        slides[activeIndex] ||
        slides[0];


    if (!active) {
        return null;
    }


    /* =========================================
       IMAGE
    ========================================= */

    const imageURL =
        import.meta.env.VITE_TMDB_IMAGE_URL;


    const backdrop =
        active.backdrop_path
            ? `${imageURL}${active.backdrop_path}`
            : "";


    /* =========================================
       MEDIA INFORMATION
    ========================================= */

    const title =
        active.title ||
        active.name ||
        "Featured";


    const mediaType =
        active.media_type ||
        (
            active.title
                ? "movie"
                : "tv"
        );


    const year =
        active.release_date?.split("-")[0] ||
        active.first_air_date?.split("-")[0] ||
        "New";


    const rating =
        active.vote_average
            ? active.vote_average.toFixed(1)
            : "N/A";


    const genres =
        active.genre_names
            ?.slice(0, 2)
            .join(" / ");


    /* =========================================
       RENDER
    ========================================= */

    return (

        <section
            className={
                isDragging
                    ? "hero is-dragging"
                    : "hero"
            }

            aria-label="Featured titles"

            onPointerDown={
                handlePointerDown
            }

            onPointerMove={
                handlePointerMove
            }

            onPointerUp={
                handlePointerUp
            }

            onPointerCancel={
                handlePointerCancel
            }
        >

            {/* =================================
                BACKDROP
            ================================= */}

            {backdrop && (

                <img
                    className="hero-backdrop"
                    src={backdrop}
                    alt=""
                    aria-hidden="true"
                    draggable="false"
                />

            )}


            {/* =================================
                OVERLAY
            ================================= */}

            <div className="hero-overlay" />


            {/* =================================
                CONTENT
            ================================= */}

            <div className="hero-content">

                <span className="hero-kicker">

                    Featured on TEWNETLIX

                </span>


                <h1>
                    {title}
                </h1>


                <div className="hero-meta">

                    <span>
                        • {rating}
                    </span>

                    <span>
                        • {year}
                    </span>

                    <span>
                        • {
                            mediaType === "tv"
                                ? "TV Show"
                                : "Movie"
                        }
                    </span>

                    {genres && (

                        <span>
                            {genres}
                        </span>

                    )}

                </div>


                <p>
                    {active.overview}
                </p>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div
                    className="hero-buttons"

                    onPointerDown={event =>
                        event.stopPropagation()
                    }
                >

                    <button
                        className="play-btn"

                        onClick={() =>
                            navigate(
                                `/watch/${mediaType}/${active.id}`
                            )
                        }
                    >

                        <Play
                            size={18}
                            fill="currentColor"
                        />

                        Play

                    </button>


                    <button
                        className="secondary-btn"

                        onClick={() =>
                            navigate(
                                `/${
                                    mediaType === "tv"
                                        ? "tv"
                                        : "movie"
                                }/${active.id}`
                            )
                        }
                    >

                        <Info size={18} />

                        Info

                    </button>


                    <button
                        className="secondary-btn"
                    >

                        <BookmarkPlus
                            size={18}
                        />

                        Watchlist

                    </button>

                </div>

            </div>


            {/* =================================
                SLIDE POSITION
            ================================= */}

            <div
                className="hero-progress"
                aria-hidden="true"
            >

                <span
                    style={{
                        width: `${
                            ((activeIndex + 1) /
                            slides.length) *
                            100
                        }%`
                    }}
                />

            </div>

        </section>

    );

}


export default Hero;