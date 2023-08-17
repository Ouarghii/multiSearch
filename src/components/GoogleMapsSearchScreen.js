import React, { useState } from 'react';

const GoogleMapsScreenSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = 'YOUR_API_KEY'; // Replace with your own Google Maps API key

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&key=${apiKey}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div>
      <h2>Google Maps Search</h2>

      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <p>{result.name}</p>
                <p>{result.formatted_address}</p>
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

export default GoogleMapsScreenSearch;
