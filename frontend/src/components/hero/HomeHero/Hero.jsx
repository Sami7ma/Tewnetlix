import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BookmarkPlus, ChevronLeft, ChevronRight, Info, Play } from "lucide-react";
import Button from "../../ui/Button/Button";
import IconButton from "../../ui/IconButton/IconButton";
import "./Hero.css";

function Hero({ items = [] }) {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const [expandedSlideId, setExpandedSlideId] = useState(null);
    const dragStartX = useRef(0);
    const dragCurrentX = useRef(0);
    const timerRef = useRef(null);
    const hasDragged = useRef(false);
    const reducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const slides = useMemo(() => { 
        const usableItems =
            items.filter(
                item =>
                    item?.backdrop_path
            );
        return usableItems.slice(0, 8);
    }, [items]);
    /*  AUTOPLAY */

    const startAutoplay = useCallback(() => {
        if (timerRef.current) {
            window.clearInterval(
                timerRef.current
            );
        }
        if (reducedMotion || slides.length < 2) {
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
    }, [reducedMotion, slides.length]);


    useEffect(() => {
        startAutoplay();
        return () => {
            if (timerRef.current) {
                window.clearInterval( timerRef.current);
            }
        };
    }, [startAutoplay]);

    /* NEXT SLIDE */

    const nextSlide = () => {
        setActiveIndex(
            index =>
                (index + 1) %
                slides.length
        );
        startAutoplay();
    };

    /*PREVIOUS SLIDE*/
    const previousSlide = () => {
        setActiveIndex(
            index =>
                index === 0
                    ? slides.length - 1
                    : index - 1
        );
        startAutoplay();
    };
    /*POINTER DOWN*/

    const handlePointerDown = event => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }
        if (event.pointerType === "mouse" && !isHovering) {
            return;
        }
        if (slides.length < 2) {
            return;
        }
        dragStartX.current =event.clientX;
        dragCurrentX.current =event.clientX;
        hasDragged.current =false;
        setIsDragging(true);
        setDragOffset(0);
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
        }
        event.currentTarget.setPointerCapture(event.pointerId);
    };
    /*POINTER MOVE */

    const handlePointerMove = event => {
        if (!isDragging) {
            return;
        }
        dragCurrentX.current = event.clientX;
        const offset = dragCurrentX.current - dragStartX.current;
        setDragOffset(offset);
        const distance =
            Math.abs(dragCurrentX.current - dragStartX.current);
        if (distance > 8) {
            hasDragged.current = true;
        }
    };
    /* POINTER UP */

    const handlePointerUp = event => {
        if (!isDragging) {
            return;
        }
        const distance = dragCurrentX.current - dragStartX.current;
        const threshold = 80;
        if (distance < -threshold) {
            nextSlide();
        } else if (distance > threshold) {
            previousSlide();
        }
        setIsDragging(false);
        setDragOffset(0);
        if (
            event.currentTarget.hasPointerCapture(event.pointerId)
        ) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        if (!isHovering && !isFocused) {
            startAutoplay();
        }
    };

    /* POINTER CANCEL */

    const handlePointerCancel = () => {
        setIsDragging(false);
        setDragOffset(0);
        startAutoplay();
    };
    /* ACTIVE SLIDE */
    const active = slides[Math.min(activeIndex, Math.max(slides.length - 1, 0))] || slides[0];
    const showFullDescription = active
        ? expandedSlideId === active.id
        : false;

    if (!active) {
        return null;
    }

    /* IMAGE */

    const imageURL = import.meta.env.VITE_TMDB_IMAGE_URL;

    const backdrop = active.backdrop_path
                        ? `${imageURL}${active.backdrop_path}`
                        : "";

    /* MEDIA INFORMATION */

    const title = active.title || active.name || "Featured";
    const mediaType = active.media_type || (active.title
                                                ? "movie"
                                                : "tv"
                                            );
    const year = active.release_date?.split("-")[0] ||
                active.first_air_date?.split("-")[0] ||
                "New";
    const rating = active.vote_average
                    ? active.vote_average.toFixed(1)
                    : "N/A";
    const genres = active.genre_names
                    ?.slice(0, 2)
                    .join(" / ");
    const description = active.overview || "";
    /*RENDER*/

    return (
        <section className={isDragging
                                ? "hero is-dragging"
                                : isHovering
                                ? "hero is-hovered"
                                : "hero"
            }
            style={{transform:`translate3d(${dragOffset}px, 0, 0)`}}
            aria-label="Featured titles"
            onMouseEnter={() =>setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false);
                if (!isFocused) {
                    startAutoplay();
                }
            }}
            onFocusCapture={() => {
                setIsFocused(true);
                if (timerRef.current) {
                    window.clearInterval(timerRef.current);
                }
            }}
            onBlurCapture={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsFocused(false);
                    if (!isHovering) {
                        startAutoplay();
                    }
                }
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
        >
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
            <div className="hero-overlay" />

            {slides.length > 1 && (
                <div className="hero-slide-controls" aria-label="Featured title controls">
                    <IconButton
                        label="Previous featured title"
                        onClick={previousSlide}
                    >
                        <ChevronLeft aria-hidden="true" />
                    </IconButton>
                    <span className="hero-slide-count" aria-live="polite">
                        {activeIndex + 1} / {slides.length}
                    </span>
                    <IconButton
                        label="Next featured title"
                        onClick={nextSlide}
                    >
                        <ChevronRight aria-hidden="true" />
                    </IconButton>
                </div>
            )}

            <div className="hero-content">
                <span className="hero-kicker">Featured on TEWNETLIX</span>

                <h1>{title}</h1>

                <div className="hero-meta">
                    <span>• {rating}</span>
                    <span>• {year}</span>
                    <span>• {
                            mediaType === "tv"
                                ? "TV Show"
                                : "Movie"
                            }
                    </span>
                    {genres && (
                        <span>{genres}</span>
                    )}
                </div>
                {/*DESCRIPTION*/}
                <p className={
                        showFullDescription
                            ? "hero-description expanded"
                            : "hero-description"
                    }>
                    {showFullDescription
                        ? description
                        : description.length > 180
                            ? `${description.slice(0, 180)}...`
                            : description
                    }
                    {description.length > 180 && (
                        <Button
                            type="button"
                            variant="subtle"
                            className="see-more-button"
                            onPointerDown={event =>
                                event.stopPropagation()
                            }
                            onClick={() =>
                                setExpandedSlideId(
                                showFullDescription ? null : active.id,
                                )
                            }>
                            {showFullDescription ? "See less" : "See more"}
                        </Button>
                    )}
                </p>
                {/* ACTIONS*/}
                <div className="hero-buttons" onPointerDown={event =>
                    event.stopPropagation()
                    }>
                    <Button variant="primary" className="play-btn" onClick={() =>
                                                navigate(
                                                    `/watch/${mediaType}/${active.id}`
                                                    )}>
                        <Play size={18} fill="currentColor" />
                        Play
                    </Button>
                    <Button variant="secondary" className="secondary-btn"
                        onClick={() => navigate(
                            `/${
                                mediaType === "tv"
                                    ? "tv"
                                    : "movie"
                                }/${active.id}`
                            )
                        }>
                        <Info size={18} />
                        Info
                    </Button>

                    <Button variant="secondary" className="secondary-btn">
                        <BookmarkPlus size={18}/>
                        Watchlist
                    </Button>
                </div>
            </div>
        </section>

    );

}

export default Hero;