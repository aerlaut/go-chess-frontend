import React, { useState, useEffect } from 'react';

import { v1 as uuidv1 } from 'uuid';
import PlayArea from './components/PlayArea';
import initConnection, { disconnectWS } from './utils/ws';

const getPlayerId = () => {
  const idString = uuidv1();
  return idString.split('-')[4];
};

const getGameId = async () => {
  const res = await fetch('http://localhost:5000/api/game');
  const game = await res.json();
  return game.id;
};

// Connect to game if not connected.
// A game is a URL with a game id.
const connectToGame = async () => {
  const currentPath = window.location.pathname;
  const gameId = currentPath.split('/')[2];

  // If URL is still base, go to game link
  if (!gameId) {
    const newGameId = await getGameId();

    const gameUrl = `${currentPath}game/${newGameId}`;
    window.location.pathname = gameUrl;
  }

  // If URL is a game link, connect to game
  const playerId = getPlayerId();
  initConnection(gameId, playerId);

  return gameId;
};

function App() {
  const [currentGameId, setCurrentGameId] = useState('default');
  const [gameLink, setGameLink] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeunload', () => disconnectWS());
  }, []);

  useEffect(() => {
    connectToGame().then((gameId) => {
      setGameLink(`${window.location.protocol}//${window.location.host}/game/${gameId}`);
      setCurrentGameId(gameId);
    });
  }, [currentGameId]);

  return (
    <div id="app">
      <div>
        <h1 style={{ display: 'inline-block' }}>Go Chess</h1>
        <button
          id="new-game"
          type="button"
          onClick={async () => {
            const newGameId = await getGameId();
            window.location.pathname = `/game/${newGameId}`;
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
      <PlayArea gameNo={currentGameId} />
    </div>
  );
}

export default App;
