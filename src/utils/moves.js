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

const getRow = (startingPosition) => Math.floor(startingPosition / NUM_COLS);
const getCol = (startingPosition) => startingPosition % NUM_COLS;

const availableRight = (startingPosition) => (NUM_COLS - 1) - getCol(startingPosition);
const availableLeft = (startingPosition) => getCol(startingPosition);
const availableTop = (startingPosition) => getRow(startingPosition);
const availableDown = (startingPosition) => (NUM_ROWS - 1) - getRow(startingPosition);

const trimEdges = (
  possibleMoves,
) => possibleMoves.filter((moveIdx) => moveIdx >= 0 && moveIdx <= MAX_MOVES);

const whitePawnMovement = (startingPosition) => {
  const moves = [];

  // Move 2 steps
  if (startingPosition > MAX_MOVES - 2 * NUM_COLS) {
    moves.push(move(startingPosition).up().up().position);
  }

  // Move step
  moves.push(move(startingPosition).up().position);

  return trimEdges(moves);
};

const blackPawnMovement = (startingPosition) => {
  const moves = [];

  // Move 2 steps
  if (startingPosition < 2 * NUM_COLS) {
    moves.push(move(startingPosition).down().down().position);
  }

  // Move step
  moves.push(move(startingPosition).down().position);

  return trimEdges(moves);
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

  return trimEdges(moves);
};

const rookMovement = (startingPosition) => {
  const moves = [];

  // Move up
  for (let i = 0; i < availableTop(startingPosition); i += 1) {
    moves.push(move(startingPosition).up().repeat(i).position);
  }

  // Move down
  for (let i = 0; i < availableDown(startingPosition); i += 1) {
    moves.push(move(startingPosition).down().repeat(i).position);
  }

  // Move left
  for (let i = 0; i < availableLeft(startingPosition); i += 1) {
    moves.push(move(startingPosition).left().repeat(i).position);
  }

  // Move right
  for (let i = 0; i < availableRight(startingPosition); i += 1) {
    moves.push(move(startingPosition).right().repeat(i).position);
  }

  return moves;
};

const bishopMovement = (startingPosition) => {
  const moves = [];

  // Move up-left
  for (let i = 0;
    i < Math.min(availableTop(startingPosition), availableLeft(startingPosition));
    i += 1) {
    moves.push(move(startingPosition).up().repeat(i).left()
      .repeat(i).position);
  }

  // Move up-right
  for (let i = 0;
    i < Math.min(availableTop(startingPosition), availableRight(startingPosition));
    i += 1) {
    moves.push(move(startingPosition).up().repeat(i).right()
      .repeat(i).position);
  }

  // Move down-left
  for (let i = 0;
    i < Math.min(availableDown(startingPosition), availableLeft(startingPosition));
    i += 1) {
    moves.push(move(startingPosition).down().repeat(i).left()
      .repeat(i).position);
  }

  // Move down-right
  for (let i = 0;
    i < Math.min(availableDown(startingPosition), availableRight(startingPosition));
    i += 1) {
    moves.push(move(startingPosition).down().repeat(i).right()
      .repeat(i).position);
  }

  return moves;
};

const knightMovement = (startingPosition) => {
  const moves = [];

  // Move up-left
  if (availableLeft(startingPosition) > 1 && availableTop(startingPosition)) {
    moves.push(move(startingPosition).up().left().left().position);
  }

  if (availableLeft(startingPosition) && availableTop(startingPosition) > 1) {
    moves.push(move(startingPosition).left().up().up().position);
  }

  // Move up-right
  if (availableRight(startingPosition) > 1 && availableTop(startingPosition)) {
    moves.push(move(startingPosition).up().right().right().position);
  }

  if (availableRight(startingPosition) && availableTop(startingPosition) > 1) {
    moves.push(move(startingPosition).right().up().up().position);
  }

  // Move down-left
  if (availableLeft(startingPosition) > 1 && availableDown(startingPosition)) {
    moves.push(move(startingPosition).down().left().left().position);
  }

  if (availableLeft(startingPosition) && availableDown(startingPosition) > 1) {
    moves.push(move(startingPosition).left().down().down().position);
  }

  // Move down-right
  if (availableRight(startingPosition) > 1 && availableDown(startingPosition)) {
    moves.push(move(startingPosition).down().right().right().position);
  }

  if (availableRight(startingPosition) && availableDown(startingPosition) > 1) {
    moves.push(move(startingPosition).right().down().down().position);
  }

  return trimEdges(moves);
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
