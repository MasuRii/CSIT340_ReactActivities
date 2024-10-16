import React, {useState} from 'react';
import './App.css';

const App = () => {

    const [lyricsData,
        setLyricsData] = useState([]);
    const [activeSinger,
        setActiveSinger] = useState('First Singer');
    const [inputValue,
        setInputValue] = useState('');
    const [isFirstLyricAdded,
        setIsFirstLyricAdded] = useState(false);

    const singerColors = {
        'First Singer': '#FF6B6B',
        'Second Singer': '#FFD93D',
        'Third Singer': '#1DD1A1',
        'Fourth Singer': '#54A0FF'
    };

    const handleTabClick = (singer) => {

        if (inputValue.trim()) {
            const newLyric = {
                singer: activeSinger,
                text: inputValue,
                color: singerColors[activeSinger]
            };
            setLyricsData([
                ...lyricsData,
                newLyric
            ]);
            setInputValue('');
            setIsFirstLyricAdded(true);
        }

        if (isFirstLyricAdded || singer === 'First Singer') {
            setActiveSinger(singer);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="app-container">
            <h1 className="header">Complete the Lyrics</h1>

            <div className="tabs">
                {Object
                    .keys(singerColors)
                    .map((singer) => (
                        <button
                            key={singer}
                            className={`tab ${activeSinger === singer
                            ? 'active'
                            : ''}`}
                            style={{
                            backgroundColor: singerColors[singer]
                        }}
                            onClick={() => handleTabClick(singer)}>
                            {singer}
                        </button>
                    ))}
            </div>

            {(activeSinger === 'First Singer' || isFirstLyricAdded) && (
                <div className="input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={`Enter lyrics for ${activeSinger}`}/>
                </div>
            )}

            <div className="lyrics-box">
                <div className="lyrics-container">
                    {lyricsData.map((lyric, index) => (
                        <div
                            key={index}
                            className="lyric-line"
                            style={{
                            backgroundColor: lyric.color
                        }}>
                            {lyric.singer}: {lyric.text}
                        </div>
                    ))}
                    {inputValue && (
                        <div
                            className="lyric-line"
                            style={{
                            backgroundColor: singerColors[activeSinger]
                        }}>
                            {activeSinger}: {inputValue}
                        </div>
                    )}
                </div>
            </div>

            <footer className="footer">
                Created by: Math Lee L. Biacolo
            </footer>
        </div>
    );
};

export default App;