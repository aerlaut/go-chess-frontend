import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import RemovedPieces from './RemovedPieces';

import { COLORS } from '../constants';

function PlayArea(props) {
  const { gameNo } = props;

  const [removed, setRemoved] = useState([]);

  useEffect(() => {
    setRemoved([]);
  }, [gameNo]);

  return (
    <div id="play-area">
      <RemovedPieces
        pieces={removed.filter((piece) => piece.color === COLORS.BLACK)}
      />
      <Board
        gameNo={gameNo}
        onPieceRemoved={(piece) => setRemoved([...removed, piece])}
      />
      <RemovedPieces
        pieces={removed.filter((piece) => piece.color === COLORS.WHITE)}
      />
    </div>

  );
}

PlayArea.propTypes = {
  gameNo: PropTypes.number.isRequired,
};

export default PlayArea;
