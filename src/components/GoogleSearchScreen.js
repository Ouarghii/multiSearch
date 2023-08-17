import React, { useState } from 'react';
import './GoogleSearchScreen.css'; // Import CSS file for styling

const GoogleSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = 'AIzaSyBzLZuOnAUKREfXlN1N8t6OSW2dnB6sNYw'; // Replace with your own Google API key

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=611db537816d942d8&q=${searchQuery}`
      );

      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div className="google-search-container">
      <div className="google-search-bar">
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google Logo"
          className="google-logo"
        />
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your search query"
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>

      <div className="search-results-container">
        {searchResults.length > 0 ? (
          <ul className="search-results-list">
            {searchResults.map((result, index) => (
              <li key={index} className="search-result-item">
                <a href={result.link} className="result-link">
                  <h3 className="result-title">{result.title}</h3>
                  <p className="result-url">{result.displayLink}</p>
                  <p className="result-snippet">{result.snippet}</p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results-message">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default GoogleSearchScreen;