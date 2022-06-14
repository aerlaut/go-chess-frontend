import React from 'react';

const numRows = 8;
const numCols = 8;
const cells = Array(numRows * numCols).fill();

function Board() {
  return (
    <div id="app">
      <h1>Go Chess</h1>
      <div id="board">
        {
            Array(numRows).fill().map((_1, rowIndex) => (
              Array(numCols).fill().map((_2, colIndex) => (
                <div
                  className="board-cell"
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{ backgroundColor: (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black' }}
                >
                  {cells[rowIndex * numRows + colIndex]}
                </div>
              ))
            ))
          }
      </div>
    </div>
  );
}

export default Board;
