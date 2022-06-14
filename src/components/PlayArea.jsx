import React, { useState } from 'react';
import { PIECE_COLORS } from '../constants';

import Board from './Board';
import RemovedPieces from './RemovedPieces';

function PlayArea() {
  const [removed, setRemoved] = useState([]);

  return (
    <div id="play-area">
      <RemovedPieces
        pieces={removed.filter((piece) => PIECE_COLORS.BLACK.includes(piece))}
      />
      <Board onPieceRemoved={(piece) => setRemoved([...removed, piece])} />
      <RemovedPieces
        pieces={removed.filter((piece) => PIECE_COLORS.WHITE.includes(piece))}
      />
    </div>

  );
}

export default PlayArea;
