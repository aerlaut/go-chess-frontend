import React from 'react';
import PropTypes from 'prop-types';

function Cell(props) {
  const { piece, color, onClick } = props;

  return (
    <div
      className="board-cell"
      style={{
        backgroundColor: color,
      }}
      onClick={() => {
        onClick(piece);
      }}
    >
      {piece?.icon}
    </div>
  );
}

Cell.propTypes = {
  color: PropTypes.string.isRequired,
  piece: PropTypes.string,
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  piece: null,
  onClick: () => {},
};

export default Cell;
