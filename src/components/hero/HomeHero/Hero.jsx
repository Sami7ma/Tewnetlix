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

function Hero({ items = [] }) {

    const navigate = useNavigate();

    const [activeIndex, setActiveIndex] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef(0);
    const dragCurrentX = useRef(0);
    const timerRef = useRef(null);
    const hasDragged = useRef(false);
    const slides = useMemo(() => {

        const usableItems =
            items.filter(
                item =>
                    item?.backdrop_path
            );

        return usableItems.slice(0, 8);

    }, [items]);
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


        if (
            event.pointerType === "mouse" &&
            !isHovering
        ) {
            return;
        }


        if (slides.length < 2) {
            return;
        }


        dragStartX.current =
            event.clientX;

        dragCurrentX.current =
            event.clientX;

        hasDragged.current =
            false;

        setIsDragging(true);
        setDragOffset(0);


        if (timerRef.current) {

            window.clearInterval(
                timerRef.current
            );

        }


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


        const offset =
            dragCurrentX.current -
            dragStartX.current;


        setDragOffset(offset);


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
        setDragOffset(0);


        if (
            event.currentTarget.hasPointerCapture(
                event.pointerId
            )
        ) {

            event.currentTarget.releasePointerCapture(
                event.pointerId
            );

        }


        startAutoplay();

    };


    /* =========================================
       POINTER CANCEL
    ========================================= */

    const handlePointerCancel = () => {

        setIsDragging(false);
        setDragOffset(0);
        startAutoplay();

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
                    : isHovering
                        ? "hero is-hovered"
                        : "hero"
            }
            style={{
                transform:
                    `translate3d(${dragOffset}px, 0, 0)`
            }}

            aria-label="Featured titles"

            onMouseEnter={() =>
                setIsHovering(true)
            }

            onMouseLeave={() =>
                setIsHovering(false)
            }

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
                    key={`backdrop-${active.id}`}
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
        </section>

    );

}


export default Hero;