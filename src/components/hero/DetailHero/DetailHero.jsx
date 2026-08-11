import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume, VolumeOff, Play, HeartPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./DetailHero.css";

function DetailHero({ media, trailer, imageURL }) {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  // Reset trailer state when switching media
  useEffect(() => {
    setShowTrailer(false);
    setMuted(true);

    if (!trailer?.key) return;

    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [media?.id, trailer?.key]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const toggleMute = () => {
    if (!iframeRef.current) return;

    const action = muted ? "unMute" : "mute";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: action, args: [] }),
      "*"
    );

    setMuted(!muted);
  };

  // 1. SAFELY EXTRACT DATA
  const title = media.title || media.name;
  const backdrop = media.backdrop_path ? `${imageURL}${media.backdrop_path}` : "";
  
  // Determine if movie or tv for the play button
  const mediaType = media.media_type || (media.title ? "movie" : "tv");

  // Format runtime or seasons safely
  let runtime = null;
  if (media.runtime) {
    runtime = `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`;
  } else if (media.number_of_seasons) {
    runtime = `${media.number_of_seasons} Season${media.number_of_seasons > 1 ? 's' : ''}`;
  }

  // Format year safely
  const year = media.release_date
    ? media.release_date.split("-")[0]
    : media.first_air_date
    ? media.first_air_date.split("-")[0]
    : null;

  // Format rating safely
  const rating = media.vote_average && media.vote_average > 0 
    ? media.vote_average.toFixed(1) 
    : null;

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

  return (
    <section className="media-hero">
      {backdrop && (
        <img
          className={`media-backdrop ${showTrailer ? "hidden" : "visible"}`}
          src={backdrop}
          alt={title || "media Backdrop"}
        />
      )}

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

      <div className="media-top-buttons">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft />
        </button>

        {/* Mute/Unmute button is rendered ONLY when the trailer is active */}
        {showTrailer && trailerURL && (
          <button className="volume-button" onClick={toggleMute}>
            {muted ? <VolumeOff fill="currentColor" /> : <Volume />}
          </button>
        )}
      </div>

      <div className="detailHero-media-overlay" />

      <div className="media-content">
        <h1>{title}</h1>
        
        <div className="media-meta">
          {/* 2. CONDITIONALLY RENDER SPANS SO THEY DON'T SHOW UP BLANK */}
          {rating && <span>★ {rating}</span>}
          {runtime && <span>{runtime}</span>}
          {year && <span>{year}</span>}
        </div>

        <div className="media-genres">
          {/* Safe check in case genres array is undefined */}
          {media.genres && media.genres.map((genre) => (
            <span key={genre.id}>●{genre.name}</span>
          ))}
        </div>
        
        <p className="media-description">{media.overview}</p>
        
        <div className="media-actions">
          <button
            className="play-button"
            onClick={() => navigate(`/watch/${mediaType}/${media.id}`)}
          >
            <Play fill="currentColor" />
            Play Now
          </button>
          <button className="favorite-button">
            <HeartPlus />
            Add to Favorites
          </button>
        </div>
      </div>
    </section>
  );
}

export default DetailHero;