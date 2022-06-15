import React, { useState } from 'react';

import PlayArea from './components/PlayArea';

function App() {
  const [gameNo, setGameNo] = useState(0);

  return (
    <div id="app">
      <div>
        <h1 style={{ display: 'inline-block' }}>Go Chess</h1>
        <button
          id="new-game"
          type="button"
          onClick={() => setGameNo(gameNo + 1)}
        >
          New Game
        </button>
      </div>
      <PlayArea gameNo={gameNo} />
    </div>
  );
}

export default App;
