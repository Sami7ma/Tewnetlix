import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Volume,
    VolumeOff,
    Play,
    HeartPlus,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import "./DetailHero.css";

function DetailHero({ media, trailer, imageURL }) {
    const navigate = useNavigate();
    const iframeRef = useRef(null);

    const [muted, setMuted] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // Reset trailer and description state when switching media
    useEffect(() => {
        setShowTrailer(false);
        setMuted(true);
        setExpanded(false);

        if (!trailer?.key) {
            return;
        }

        const timer = setTimeout(() => {
            setShowTrailer(true);
        }, 3500);

        return () => clearTimeout(timer);
    }, [media?.id, trailer?.key]);

    // Back button
    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    // Mute / unmute trailer
    const toggleMute = () => {
        if (!iframeRef.current) {
            return;
        }

        const action = muted ? "unMute" : "mute";

        iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func: action,
                args: [],
            }),
            "*"
        );

        setMuted(!muted);
    };

    // =========================================
    // MEDIA DATA
    // =========================================

    const title = media.title || media.name;

    const backdrop = media.backdrop_path
        ? `${imageURL}${media.backdrop_path}`
        : "";

    // Movie or TV
    const mediaType =
        media.media_type ||
        (media.title ? "movie" : "tv");

    // Runtime / seasons
    let runtime = null;

    if (media.runtime) {
        runtime = `${Math.floor(media.runtime / 60)}h ${
            media.runtime % 60
        }m`;
    } else if (media.number_of_seasons) {
        runtime = `${media.number_of_seasons} Season${
            media.number_of_seasons > 1 ? "s" : ""
        }`;
    }

    // Year
    const year = media.release_date
        ? media.release_date.split("-")[0]
        : media.first_air_date
        ? media.first_air_date.split("-")[0]
        : null;

    // Rating
    const rating =
        media.vote_average && media.vote_average > 0
            ? media.vote_average.toFixed(1)
            : null;

    // Description
    const description = media.overview || "";

    // =========================================
    // TRAILER
    // =========================================

    const trailerParams = trailer?.key
        ? new URLSearchParams({
              autoplay: 1,
              mute: 1,
              controls: 0,
              loop: 1,
              playlist: trailer.key,
              playsinline: 1,
              rel: 0,
              enablejsapi: 1,
              iv_load_policy: 3,
              cc_load_policy: 0,
              disablekb: 1,
          }).toString()
        : "";

    const trailerURL = trailer?.key
        ? `https://www.youtube.com/embed/${trailer.key}?${trailerParams}`
        : null;

    // =========================================
    // RENDER
    // =========================================

    return (
        <section className="media-hero">

            {/* =================================
                BACKDROP
            ================================= */}

            {backdrop && (
                <img
                    className={`media-backdrop ${
                        showTrailer ? "hidden" : "visible"
                    }`}
                    src={backdrop}
                    alt={title || "Media backdrop"}
                />
            )}

            {/* =================================
                TRAILER
            ================================= */}

            {showTrailer && trailerURL && (
                <div className="media-video-wrapper visible">
                    <iframe
                        ref={iframeRef}
                        className="media-trailer"
                        src={trailerURL}
                        title={title || "Trailer"}
                        allow="autoplay; encrypted-media; fullscreen"
                        loading="eager"
                        allowFullScreen
                    />
                </div>
            )}

            {/* =================================
                TOP BUTTONS
            ================================= */}

            <div className="media-top-buttons">

                <button
                    className="back-button"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft />
                </button>

                {showTrailer && trailerURL && (
                    <button
                        className="volume-button"
                        onClick={toggleMute}
                        aria-label={
                            muted
                                ? "Unmute trailer"
                                : "Mute trailer"
                        }
                    >
                        {muted ? (
                            <VolumeOff fill="currentColor" />
                        ) : (
                            <Volume />
                        )}
                    </button>
                )}

            </div>

            {/* =================================
                OVERLAY
            ================================= */}

            <div className="detailHero-media-overlay" />

            {/* =================================
                CONTENT
            ================================= */}

            <div className="media-content">

                <h1>{title}</h1>

                {/* META */}

                <div className="media-meta">

                    {rating && (
                        <span>★ {rating}</span>
                    )}

                    {runtime && (
                        <span>{runtime}</span>
                    )}

                    {year && (
                        <span>{year}</span>
                    )}

                </div>

                {/* GENRES */}

                <div className="media-genres">

                    {media.genres &&
                        media.genres.map((genre) => (
                            <span key={genre.id}>
                                ● {genre.name}
                            </span>
                        ))}

                </div>

                {/* =================================
                    DESCRIPTION
                ================================= */}

                {description && (
                    <div
                        className={`media-description-wrapper ${
                            expanded ? "expanded" : ""
                        }`}
                    >

                        <p className="media-description">
                            {description}
                        </p>

                        <button
                            className="media-see-more"
                            onClick={() =>
                                setExpanded(!expanded)
                            }
                        >
                            {expanded
                                ? "See less"
                                : "See more"}
                        </button>

                    </div>
                )}

                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="media-actions">

                    <button
                        className="play-button"
                        onClick={() =>
                            navigate(
                                `/watch/${mediaType}/${media.id}`
                            )
                        }
                    >
                        <Play
                            fill="currentColor"
                            size={18}
                        />

                        Play Now
                    </button>

                    <button
                        className="favorite-button"
                    >
                        <HeartPlus size={18} />

                        Add to Favorites
                    </button>

                </div>

            </div>

        </section>
    );
}

export default DetailHero;