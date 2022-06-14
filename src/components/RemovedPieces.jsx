import React from 'react';
import PropTypes from 'prop-types';

function RemovedPieces(props) {
  const { pieces } = props;

  return (
    <div className="removed-pieces">
      { pieces.map((piece, idx) => <div key={idx} className="board-cell">{piece.icon}</div>) }
    </div>
  );
}

const pieceShape = PropTypes.shape({
  icon: PropTypes.string,
  color: PropTypes.string,
});

RemovedPieces.propTypes = {
  pieces: PropTypes.arrayOf(pieceShape).isRequired,
};

export default RemovedPieces;
