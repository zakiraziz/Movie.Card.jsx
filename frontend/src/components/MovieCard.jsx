import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, showDetailsButton = false }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const renderRatingStars = () => {
    const rating = Math.round(movie.vote_average / 2);
    return (
      <div className="movie-rating">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < rating ? "star-filled" : "star-empty"}
          />
        ))}
        <span>({movie.vote_count})</span>
      </div>
    );
  };

  return (
    <div
      className={`movie-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">No Image Available</div>
        )}
        
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? <FaHeart /> : <FaRegHeart />}
          </button>

          {isHovered && (
            <div className="hover-actions">
              <button className="play-button">
                <FaPlay /> Watch
              </button>
              {showDetailsButton && (
                <button 
                  className="details-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick();
                  }}
                >
                  Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        <div className="movie-meta">
          <p>{movie.release_date?.split("-")[0] || "Unknown year"}</p>
          {renderRatingStars()}
        </div>
        {isHovered && movie.overview && (
          <div className="movie-overview">
            <p>{movie.overview.substring(0, 100)}...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
