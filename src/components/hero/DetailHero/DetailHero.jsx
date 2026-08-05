import { useNavigate } from "react-router-dom";
import { ArrowLeft, Volume, VolumeOff, Play, HeartPlus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./DetailHero.css";

function DetailHero({ movie, trailer, imageURL }) {
  const navigate = useNavigate();
  const iframeRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  // Reset trailer state when switching movies
  useEffect(() => {
    setShowTrailer(false);
    setMuted(true);

    if (!trailer?.key) return;

    const timer = setTimeout(() => {
      setShowTrailer(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [movie?.id, trailer?.key]);

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

  const backdrop = movie?.backdrop_path ? `${imageURL}${movie.backdrop_path}` : "";
  const runtime = movie?.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "";
  const year = movie?.release_date ? movie.release_date.split("-")[0] : "";
  const rating = movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A";

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
    <section className="movie-hero">
      {backdrop && (
        <img
          className={`movie-backdrop ${showTrailer ? "hidden" : "visible"}`}
          src={backdrop}
          alt={movie?.title || "Movie Backdrop"}
        />
      )}

      {showTrailer && trailerURL && (
        <div className="movie-video-wrapper visible">
          <iframe
            ref={iframeRef}
            className="movie-trailer"
            src={trailerURL}
            title={movie?.title || "Trailer"}
            allow="autoplay; encrypted-media; fullscreen"
            loading="eager"
            allowFullScreen
          />
        </div>
      )}

      <div className="movie-top-buttons">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft />
        </button>

        {/* Mute/Unmute button is rendered ONLY when the trailer is active */}
        {showTrailer && trailerURL && (
          <button className="volume-button" onClick={toggleMute}>
            {muted ? <VolumeOff /> : <Volume />}
          </button>
        )}
      </div>

      <div className="detailHero-movie-overlay" />

      <div className="movie-content">
        <h1>{movie?.title}</h1>
        <div className="movie-meta">
          <span>★ {rating}</span>
          <span>{runtime}</span>
          <span>{year}</span>
        </div>
        <div className="movie-genres">
          {movie?.genres?.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <p className="movie-description">{movie?.overview}</p>
        <div className="movie-actions">
          <button
            className="play-button"
            onClick={() => navigate(`/watch/movie/${movie?.id}`)}
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