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
  const [selectedCell, setSelectedCell] = useState(null);

  return (
    <div id="board">
      {
        Array(NUM_ROWS).fill().map((_1, rowIndex) => (
          Array(NUM_COLS).fill().map((_2, colIndex) => {
            const cellIdx = rowIndex * NUM_COLS + colIndex;
            const cellColor = getCellColor(rowIndex + colIndex);

            return (
              <Cell
                key={cellIdx}
                color={cellIdx === selectedCell ? 'red' : cellColor}
                piece={cells[cellIdx]}
                onClick={() => {
                  if (cellIdx !== selectedCell && cells[cellIdx]) {
                    setSelectedCell(cellIdx);
                  } else {
                    setSelectedCell(null);
                  }
                }}
              />
            );
          })
        ))
      }
    </div>
  );
}

export default Board;
