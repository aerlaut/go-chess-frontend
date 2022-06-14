import React, { useState } from 'react';
import { STARTING_POSITIONS } from '../constants';

import Cell from './Cell';

const NUM_ROWS = 8;
const NUM_COLS = 8;

function resetBoard() {
  const emptyBoard = Array(NUM_ROWS * NUM_COLS).fill();

  Object.entries(STARTING_POSITIONS).forEach(([position, piece]) => {
    emptyBoard[position] = piece;
  });

  return emptyBoard;
}

function getCellColor(index) { return index % 2 === 0 ? 'white' : '#ccc'; }

function Board() {
  const [cells] = useState(resetBoard());

  return (
    <div id="board">
      {
        Array(NUM_ROWS).fill().map((_1, rowIndex) => (
          Array(NUM_COLS).fill().map((_2, colIndex) => {
            const cellIdx = rowIndex * NUM_COLS + colIndex;
            const cellColor = getCellColor(rowIndex + colIndex);

            return (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                color={cellColor}
                piece={cells[cellIdx]}
              />
            );
          })
        ))
      }
    </div>
  );
}

export default Board;
