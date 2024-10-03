import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Initialize state for lyrics and active singer
  const [lyricsData, setLyricsData] = useState([]);
  const [activeSinger, setActiveSinger] = useState('First Singer');
  const [inputValue, setInputValue] = useState('');
  const [isFirstLyricAdded, setIsFirstLyricAdded] = useState(false);

  // Updated vibrant color scheme
  const singerColors = {
    'First Singer': '#FF6B6B',  // Vibrant Red
    'Second Singer': '#FFD93D', // Vibrant Yellow
    'Third Singer': '#1DD1A1',  // Vibrant Green
    'Fourth Singer': '#54A0FF', // Vibrant Blue
  };

  // Handle tab click - only allow other singers if the first lyric is added
  const handleTabClick = (singer) => {
    // If there's any input in the field, submit the current input as a lyric before switching
    if (inputValue.trim()) {
      const newLyric = {
        singer: activeSinger,
        text: inputValue,
        color: singerColors[activeSinger],
      };
      setLyricsData([...lyricsData, newLyric]);
      setInputValue(''); // Clear the input field
      setIsFirstLyricAdded(true); // Mark that the first lyric has been added
    }

    // Allow switching to other singers
    if (isFirstLyricAdded || singer === 'First Singer') {
      setActiveSinger(singer);
    }
  };

  // Handle input change with real-time lyrics update
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <h1 className="header">Complete the Lyrics</h1>

      {/* Singer Tabs */}
      <div className="tabs">
        {Object.keys(singerColors).map((singer) => (
          <button
            key={singer}
            className={`tab ${activeSinger === singer ? 'active' : ''}`}
            style={{ backgroundColor: singerColors[singer] }}
            onClick={() => handleTabClick(singer)}
          >
            {singer}
          </button>
        ))}
      </div>

      {/* Input Field (Realtime updates) */}
      {(activeSinger === 'First Singer' || isFirstLyricAdded) && (
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Enter lyrics for ${activeSinger}`}
          />
        </div>
      )}

      {/* Lyrics Container */}
      <div className="lyrics-box">
        <div className="lyrics-container">
          {lyricsData.map((lyric, index) => (
            <div
              key={index}
              className="lyric-line"
              style={{ backgroundColor: lyric.color }}
            >
              {lyric.singer}: {lyric.text}
            </div>
          ))}
          {/* Real-time input display */}
          {inputValue && (
            <div
              className="lyric-line"
              style={{ backgroundColor: singerColors[activeSinger] }}
            >
              {activeSinger}: {inputValue}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        Created by: Math Lee L. Biacolo
      </footer>
    </div>
  );
};

export default App;