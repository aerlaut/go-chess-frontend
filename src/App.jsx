import React, { useState, useEffect } from 'react';

import PlayArea from './components/PlayArea';

const getGameId = async () => {
  const res = await fetch('http://localhost:5000/api/match');
  const match = await res.json();
  return match.id;
};

// Connect to match if not connected.
// A match is a URL with a match id.
const connectToMatch = async () => {
  const currentPath = window.location.pathname;
  const matchId = currentPath.split('/')[2];

  // If URL is still base, go to match link
  if (!matchId) {
    const newMatchId = await getGameId();

    const gameUrl = `${currentPath}match/${newMatchId}`;
    window.location.pathname = gameUrl;
  }

  // If URL is a match link, connect to match
  return matchId;
};

function App() {
  const [gameId, setGameId] = useState('default');
  const [gameLink, setGameLink] = useState(null);

  useEffect(() => {
    connectToMatch().then((matchId) => {
      setGameLink(`${window.location.protocol}//${window.location.host}/match/${matchId}`);
      setGameId(matchId);
    });
  }, [gameId]);

  return (
    <div id="app">
      <div>
        <h1 style={{ display: 'inline-block' }}>Go Chess</h1>
        <button
          id="new-game"
          type="button"
          onClick={async () => {
            const newGameId = await getGameId();
            window.location.pathname = `/match/${newGameId}`;
          }}
        >
          New Game
        </button>
      </div>
      <div>
        {gameLink && (
          <span>
            Share game link:
            {' '}
            <button
              type="button"
              style={{
                display: 'inline-block',
                padding: '0.2em 0.5em',
                border: '1px solid black',
                backgroundColor: 'lightgrey',
                borderRadius: '0.2em',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigator.clipboard.writeText(gameLink);
              }}
            >
              {gameLink}
            </button>
          </span>
        )}
      </div>
      <PlayArea gameNo={gameId} />
    </div>
  );
}

export default App;
