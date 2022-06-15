import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import RemovedPieces from './RemovedPieces';

import { COLORS } from '../utils/constants';

function PlayArea(props) {
  const { gameNo } = props;

  const [removed, setRemoved] = useState([]);
  const [colorTurn, setColorTurn] = useState(COLORS.WHITE);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setRemoved([]);
    setColorTurn(COLORS.WHITE);
    setWinner(null);
  }, [gameNo]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{winner ? `${winner} wins!` : `${colorTurn}'s turn`}</h2>
      <div id="play-area">
        <RemovedPieces
          pieces={removed.filter((piece) => piece.color === COLORS.BLACK)}
        />
        <Board
          gameNo={gameNo}
          turn={colorTurn}
          onPieceRemoved={(piece) => setRemoved([...removed, piece])}
          onEndTurn={() => setColorTurn(colorTurn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE)}
          onWin={() => { setWinner(colorTurn); setColorTurn(null); }}
        />
        <RemovedPieces
          pieces={removed.filter((piece) => piece.color === COLORS.WHITE)}
        />
      </div>
    </div>

  );
}

PlayArea.propTypes = {
  gameNo: PropTypes.number.isRequired,
};

export default PlayArea;
