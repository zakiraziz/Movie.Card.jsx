import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const { results, total_pages } = await getPopularMovies(currentPage);
        setMovies(results);
        setTotalPages(total_pages);
        setIsSearchActive(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const { results, total_pages } = await searchMovies(searchQuery, currentPage);
      setMovies(results);
      setTotalPages(total_pages);
      setError(null);
      setIsSearchActive(true);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const returnToPopular = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setIsSearchActive(false);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        {isSearchActive && (
          <button
            type="button"
            className="popular-button"
            onClick={returnToPopular}
            disabled={loading}
          >
            Back to Popular
          </button>
        )}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading movies...
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))
            ) : (
              <div className="no-results">
                No movies found. Try a different search.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
