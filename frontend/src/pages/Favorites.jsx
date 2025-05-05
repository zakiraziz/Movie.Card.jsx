import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Favorites() {
  const { favorites, removeAllFavorites, removeFromFavorites } = useMovieContext();
  const [filterYear, setFilterYear] = useState("");
  const [filterRating, setFilterRating] = useState(0);

  const filteredFavorites = favorites.filter(movie => {
    const yearMatch = !filterYear || 
      (movie.release_date && movie.release_date.includes(filterYear));
    const ratingMatch = !filterRating || 
      (movie.vote_average && movie.vote_average >= filterRating);
    return yearMatch && ratingMatch;
  });

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      removeAllFavorites();
    }
  };

  const handleRemove = (movieId) => {
    removeFromFavorites(movieId);
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <div className="empty-state">
          <h2>Your Favorites List is Empty</h2>
          <p>You haven't added any movies to your favorites yet.</p>
          <div className="empty-illustration">
            <span role="img" aria-label="broken heart">💔</span>
          </div>
          <p>Browse movies and click the heart icon to add them here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h2>Your Favorite Movies</h2>
        <div className="favorites-meta">
          <span>{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved</span>
          <button 
            onClick={handleClearAll}
            className="clear-all-btn"
            disabled={favorites.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="year-filter">Filter by Year:</label>
          <input
            id="year-filter"
            type="text"
            placeholder="e.g. 2023"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="rating-filter">Minimum Rating:</label>
          <select
            id="rating-filter"
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
          >
            <option value="0">Any Rating</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="no-results">
          <p>No movies match your filters.</p>
          <button 
            onClick={() => {
              setFilterYear("");
              setFilterRating(0);
            }}
            className="reset-filters"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredFavorites.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id}
              onRemove={() => handleRemove(movie.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
