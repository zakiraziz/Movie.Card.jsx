import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const movies = [
        { id: 1, title: "john Wick", release_date: "2020" },
        { id: 1, title: "Terminator", release_date: "1999" },
        { id: 1, title: "The Matrix", release_date: "1998" },
    ];

    const handleSearch = () => {};

    return (
        <div className="home">
            <frome onSubmit={handleSearch} className="search-from">
                <input 
                type="text"
                placeholder="Search for movies..."
                />
                <button type="submit" className="search-button"></button>
            </frome>

        <div className="movies-grid">
            {movies.map((movie) =>(
            <MovieCard movie={movie} key={movie.id} />
    ))}
    </div>
    </div>
    )
}

export default Home