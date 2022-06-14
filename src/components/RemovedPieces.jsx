import React from 'react';
import PropTypes from 'prop-types';

function RemovedPieces(props) {
  const { pieces } = props;

  return (
    <div className="removed-pieces">
      { pieces.map((piece) => <div className="board-cell">{piece}</div>) }
    </div>
  );
}

RemovedPieces.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RemovedPieces;
