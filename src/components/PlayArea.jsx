import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import RemovedPieces from './RemovedPieces';

import { PIECE_COLORS } from '../constants';

function PlayArea(props) {
  const { gameNo } = props;

  const [removed, setRemoved] = useState([]);

  useEffect(() => {
    setRemoved([]);
  }, [gameNo]);

  return (
    <div id="play-area">
      <RemovedPieces
        pieces={removed.filter((piece) => PIECE_COLORS.BLACK.includes(piece))}
      />
      <Board
        gameNo={gameNo}
        onPieceRemoved={(piece) => setRemoved([...removed, piece])}
      />
      <RemovedPieces
        pieces={removed.filter((piece) => PIECE_COLORS.WHITE.includes(piece))}
      />
    </div>

  );
}

PlayArea.propTypes = {
  gameNo: PropTypes.number.isRequired,
};

export default PlayArea;
