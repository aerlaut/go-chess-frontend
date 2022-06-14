import React from 'react';
import PropTypes from 'prop-types';

function Cell(props) {
  const { piece, color } = props;

  return (
    <div
      className="board-cell"
      style={{
        backgroundColor: color,
      }}
    >
      {piece}
    </div>
  );
}

Cell.propTypes = {
  color: PropTypes.string.isRequired,
  piece: PropTypes.string,
};

Cell.defaultProps = {
  piece: null,
};

export default Cell;
