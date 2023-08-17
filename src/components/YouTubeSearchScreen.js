
  import React, { useState } from 'react';
  import { Modal } from 'react-bootstrap';
  import './YouTubeSearchScreen.css'; // Import CSS file for styling
  
  const YouTubeSearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const apikey='AIzaSyBzLZuOnAUKREfXlN1N8t6OSW2dnB6sNYw'

    const handleSearch = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${apikey}`
        );
        const data = await response.json();
        setSearchResults(data.items);
        setShowModal(true);
      } catch (error) {
        console.error('Error searching YouTube:', error);
      }
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div className="youtube-search-container">
        <h2>
          <span style={{ color: 'red' }}>You</span>Tube Search
        </h2>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
  
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>YouTube Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="search-results-container">
              {searchResults.map((result) => (
                <div key={result.id.videoId} className="search-result-item">
                  <img
                    src={result.snippet.thumbnails.default.url}
                    alt="Thumbnail"
                    className="thumbnail"
                  />
                  <div className="result-info">
                    <h3>{result.snippet.title}</h3>
                    <p>{result.snippet.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
  
  export default YouTubeSearchScreen;
  