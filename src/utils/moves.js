const NUM_COLS = 8;
const NUM_ROWS = 8;
const MAX_MOVES = NUM_COLS * NUM_ROWS - 1;

const move = (initialPosition) => ({
  start: initialPosition,
  position: initialPosition,
  lastMove: null,
  up() { this.position -= NUM_COLS; this.lastMove = 'up'; return this; },
  down() { this.position += NUM_COLS; this.lastMove = 'down'; return this; },
  left() { this.position -= 1; this.lastMove = 'left'; return this; },
  right() { this.position += 1; this.lastMove = 'right'; return this; },
  repeat(num) { for (let i = 0; i < num; i += 1) { this[this.lastMove](); } return this; },
});

const whitePawnMovement = (startingPosition) => {
  const moves = [];

  // Move 2 steps
  if (startingPosition > MAX_MOVES - 2 * NUM_COLS) {
    moves.push(move(startingPosition).up().up().position);
  }

  // Move step
  moves.push(move(startingPosition).up().position);

  return moves;
};

const blackPawnMovement = (startingPosition) => {
  const moves = [];

  // Move 2 steps
  if (startingPosition < 2 * NUM_COLS) {
    moves.push(move(startingPosition).down().down().position);
  }

  // Move step
  moves.push(move(startingPosition).down().position);

  return moves;
};

const kingMovement = (startingPosition) => {
  const moves = [];

  moves.push(move(startingPosition).up().position);
  moves.push(move(startingPosition).down().position);
  moves.push(move(startingPosition).left().position);
  moves.push(move(startingPosition).right().position);
  moves.push(move(startingPosition).left().up().position);
  moves.push(move(startingPosition).left().down().position);
  moves.push(move(startingPosition).right().up().position);
  moves.push(move(startingPosition).right().down().position);

  return moves;
};

const rookMovement = (startingPosition) => {
  const moves = [];

  // Move up
  for (let i = 0; i < NUM_COLS; i += 1) {
    moves.push(move(startingPosition).up().repeat(i).position);
  }

  // Move down
  for (let i = 0; i < NUM_COLS; i += 1) {
    moves.push(move(startingPosition).down().repeat(i).position);
  }

  // Move left
  for (let i = 0; i < NUM_COLS; i += 1) {
    moves.push(move(startingPosition).left().repeat(i).position);
  }

  // Move right
  for (let i = 0; i < NUM_COLS; i += 1) {
    moves.push(move(startingPosition).right().repeat(i).position);
  }

  return moves;
};

const bishopMovement = (startingPosition) => {
  const moves = [];

  // Move up-left
  for (let i = 0; i < NUM_ROWS; i += 1) {
    moves.push(move(startingPosition).up().repeat(i).left()
      .repeat(i).position);
  }

  // Move up-right
  for (let i = 0; i < NUM_ROWS; i += 1) {
    moves.push(move(startingPosition).up().repeat(i).right()
      .repeat(i).position);
  }

  // Move down-left
  for (let i = 0; i < NUM_ROWS; i += 1) {
    moves.push(move(startingPosition).down().repeat(i).left()
      .repeat(i).position);
  }

  // Move down-right
  for (let i = 0; i < NUM_ROWS; i += 1) {
    moves.push(move(startingPosition).down().repeat(i).right()
      .repeat(i).position);
  }

  return moves;
};

const knightMovement = (startingPosition) => {
  const moves = [];

  // Move up-left
  moves.push(move(startingPosition).up().left().left().position);
  moves.push(move(startingPosition).left().up().up().position);

  // Move up-right
  moves.push(move(startingPosition).up().right().right().position);
  moves.push(move(startingPosition).right().up().up().position);

  // Move down-left
  moves.push(move(startingPosition).down().left().left().position);
  moves.push(move(startingPosition).left().down().down().position);

  // Move down-right
  moves.push(move(startingPosition).down().right().right().position);
  moves.push(move(startingPosition).right().down().down().position);

  return moves;
};

const queenMovement = (startingPosition) => {
  const rookMoves = rookMovement(startingPosition);
  const bishopMoves = bishopMovement(startingPosition);

  return [...rookMoves, ...bishopMoves];
};

export default {
  whitePawnMovement,
  blackPawnMovement,
  kingMovement,
  rookMovement,
  bishopMovement,
  knightMovement,
  queenMovement,
};
