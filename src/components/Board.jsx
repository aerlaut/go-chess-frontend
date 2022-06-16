import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ALLOWED_MOVES, STARTING_POSITIONS, MOVEMENT_TYPES, PIECE,
} from '../utils/constants';

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

function Board(props) {
  const {
    gameNo, turn, onPieceRemoved, onEndTurn, onWin,
  } = props;

  const [cells, setCells] = useState(resetBoard());
  const [pickedAPiece, setPickedAPiece] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [allowedMoves, setAllowedMoves] = useState([]);

  useEffect(() => {
    setCells(resetBoard());
    setPickedAPiece(false);
    setSelectedCell(null);
    setAllowedMoves([]);
  }, [gameNo]);

  function selectPiece(index) {
    setSelectedCell(index);
    setPickedAPiece(true);
  }

  function deselectPiece() {
    setSelectedCell(null);
    setPickedAPiece(false);
    setAllowedMoves([]);
  }

  function movePiece(fromCellIdx, toCellIdx) {
    // If moving to a place occupied with a piece of the same color, do not do anything
    if (cells[fromCellIdx].color === cells[toCellIdx]?.color) return;

    // If there is a piece of different color at the destination cell, remove it
    if (cells[toCellIdx]) { onPieceRemoved(cells[toCellIdx]); }

    // If the piece moved is pawn, check if it can be turned to queen
    if (cells[fromCellIdx].movement_type === MOVEMENT_TYPES.BLACK_PAWN && toCellIdx >= 56) {
      cells[fromCellIdx] = PIECE.BLACK_QUEEN;
    }

    if (cells[fromCellIdx].movement_type === MOVEMENT_TYPES.WHITE_PAWN && toCellIdx < 8) {
      cells[fromCellIdx] = PIECE.WHITE_QUEEN;
    }

    // Check if the piece is the king - which is a winning condition
    if (cells[toCellIdx]?.movement_type === MOVEMENT_TYPES.KING) onWin();

    // Move the piece to the destination cell
    cells[toCellIdx] = cells[fromCellIdx];
    cells[fromCellIdx] = null;

    deselectPiece();
  }

  function paintCell(cellIdx, defaultColor) {
    let result = defaultColor;

    if (cellIdx === selectedCell) { result = 'red'; }
    if (allowedMoves.includes(cellIdx)) { result = 'yellow'; }

    return result;
  }

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
                color={paintCell(cellIdx, cellColor)}
                piece={cells[cellIdx] || {}}
                onClick={(piece) => {
                  // If the selected cell contains a piece, select it
                  if (!pickedAPiece && piece && piece.color === turn) {
                    selectPiece(cellIdx);

                    const possibleMoves = ALLOWED_MOVES[
                      piece.movement_type
                    ](cellIdx, cells);

                    setAllowedMoves(possibleMoves);
                    return;
                  }

                  // If the same cells are chosen, deselect the cell
                  if (pickedAPiece && cellIdx === selectedCell) {
                    deselectPiece(cellIdx);
                    return;
                  }

                  // If a piece is picked up, move the piece
                  if (pickedAPiece) {
                    if (!allowedMoves.includes(cellIdx)) return;
                    movePiece(selectedCell, cellIdx);
                    onEndTurn();
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

Board.propTypes = {
  gameNo: PropTypes.number.isRequired,
  turn: PropTypes.string.isRequired,
  onPieceRemoved: PropTypes.func.isRequired,
  onEndTurn: PropTypes.func.isRequired,
  onWin: PropTypes.func.isRequired,
};

export default Board;
