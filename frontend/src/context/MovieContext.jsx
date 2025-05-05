import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const storedFavs = localStorage.getItem("favorites");
                if (storedFavs) {
                    const parsedFavs = JSON.parse(storedFavs);
                    if (Array.isArray(parsedFavs)) {
                        setFavorites(parsedFavs);
                    }
                }
            } catch (error) {
                console.error("Failed to load favorites:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('favorites', JSON.stringify(favorites));
            } catch (error) {
                console.error("Failed to save favorites:", error);
            }
        }
    }, [favorites, isLoading]);

    const addToFavorites = (movie) => {
        if (!movie || !movie.id) return false;
        
        // Prevent duplicates
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites(prev => [...prev, movie]);
            return true;
        }
        return false;
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const toggleFavorite = (movie) => {
        if (isFavorite(movie.id)) {
            removeFromFavorites(movie.id);
            return false;
        } else {
            return addToFavorites(movie);
        }
    };

    const clearAllFavorites = () => {
        setFavorites([]);
    };

    const addMultipleToFavorites = (movies) => {
        if (!Array.isArray(movies)) return;
        
        const newFavorites = movies.filter(
            movie => movie?.id && !favorites.some(fav => fav.id === movie.id)
        );
        
        if (newFavorites.length > 0) {
            setFavorites(prev => [...prev, ...newFavorites]);
        }
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const getFavoriteById = (movieId) => {
        return favorites.find(movie => movie.id === movieId);
    };

    const value = {
        favorites,
        isLoading,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        clearAllFavorites,
        addMultipleToFavorites,
        isFavorite,
        getFavoriteById,
        favoritesCount: favorites.length
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};
