import React, { useState } from 'react';
import { STARTING_POSITIONS } from '../constants';

const NUM_ROWS = 8;
const NUM_COLS = 8;

function resetBoard() {
  const emptyBoard = Array(NUM_ROWS * NUM_COLS).fill();

  Object.entries(STARTING_POSITIONS).forEach(([position, piece]) => {
    emptyBoard[position] = piece;
  });

  return emptyBoard;
}

function Board() {
  const [cells] = useState(resetBoard());

  return (
    <div id="app">
      <h1>Go Chess</h1>
      <div id="board">
        {
            Array(NUM_ROWS).fill().map((_1, rowIndex) => (
              Array(NUM_COLS).fill().map((_2, colIndex) => (
                <div
                  className="board-cell"
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{ backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'white' : '#ccc' }}
                >
                  {cells[rowIndex * NUM_ROWS + colIndex]}
                </div>
              ))
            ))
          }
      </div>
    </div>
  );
}

export default Board;
