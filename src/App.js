import React from 'react';
import './App.css';
import YouTubeSearchScreen from './components/YouTubeSearchScreen';
import ChatGPTSearchScreen from './components/ChatGPTScreen';
import GoogleSearchScreen from './components/GoogleSearchScreen';
import NetflixSearchScreen from './components/NetflixSearchScreen';

function App() {
  return (
    <div className="App">
      <div className="square" style={{border:'solid 2px'}}>
        <div className="top-left" style={{ height: '45vh',width:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <YouTubeSearchScreen />
        </div>
        <div className="top-right " style={{ height: '45vh',width:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GoogleSearchScreen />
        </div>
        <div className="bottom-right" style={{ height: '50vh',width:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChatGPTSearchScreen />
        </div>
        <div className="bottom-left" style={{ height: '50vh',width:'100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NetflixSearchScreen />
        </div>
      </div>
    </div>
  );
}

export default App;

