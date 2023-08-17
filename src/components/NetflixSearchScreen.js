import React, { useState } from 'react';
import './NetflixSearchScreen.css'; // Import the CSS file for styling

const NetflixSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = 'c2f64fddc7a4bae0e1f0fecc2dcc3f6b'; // Replace with your own Netflix API key

  const searchFunction = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();

      return data.results;
    } catch (error) {
      console.error('Error occurred during search:', error);
      return [];
    }
  };

  const handleSearch = async () => {
    try {
      const results = await searchFunction(searchQuery);

      setSearchResults(results);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div className="netflix-search">
      <h2>Netflix Search</h2>

      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul className="result-list">
            {searchResults.map((result, index) => (
              <li key={index} className="result-item">
                <h3 className="result-title">{result.title}</h3>
                <p className="result-overview">{result.overview}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt="Poster"
                  className="result-poster"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default NetflixSearchScreen;
