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

function detectCollision(dest, destPiece, piece, moves, capture = true) {
  if (destPiece) {
    if (destPiece.color !== piece.color && capture) moves.push(dest);
    return true;
  }

  moves.push(dest);
  return false;
}

const whitePawnMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];
  let dest;

  // Move 1 step
  dest = move(startingPosition).up().position;
  const collide = detectCollision(dest, cells[dest], piece, moves, false);

  // Move 2 steps
  if (startingPosition > MAX_MOVES - 2 * NUM_COLS && !collide) {
    dest = move(startingPosition).up().up().position;
    detectCollision(dest, cells[dest], piece, moves, false);
  }

  // Check for diagonal captures
  const captureLeftIdx = startingPosition - NUM_ROWS - 1;
  const captureRightIdx = startingPosition - NUM_ROWS + 1;

  if (cells[captureLeftIdx]
    && cells[captureLeftIdx]?.color !== piece.color
  ) { moves.push(captureLeftIdx); }

  if (cells[captureRightIdx]
    && cells[captureRightIdx]?.color !== piece.color
  ) { moves.push(captureRightIdx); }

  return trimEdges(moves);
};

const blackPawnMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];
  let dest;

  // Move 1 step
  dest = move(startingPosition).down().position;
  const collide = detectCollision(dest, cells[dest], piece, moves, false);

  // Move 2 steps
  if (startingPosition < 2 * NUM_COLS && !collide) {
    dest = move(startingPosition).down().down().position;
    detectCollision(dest, cells[dest], piece, moves, false);
  }

  // Check for diagonal captures
  const captureLeftIdx = startingPosition + NUM_ROWS - 1;
  const captureRightIdx = startingPosition + NUM_ROWS + 1;

  if (cells[captureLeftIdx]
    && cells[captureLeftIdx]?.color !== piece.color
  ) { moves.push(captureLeftIdx); }

  if (
    cells[captureRightIdx]
    && cells[captureRightIdx]?.color !== piece.color
  ) { moves.push(captureRightIdx); }

  return trimEdges(moves);
};

const kingMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];

  let dest;

  dest = move(startingPosition).up().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).down().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).left().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).right().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).left().up().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).left().down().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).right().up().position;
  detectCollision(dest, cells[dest], piece, moves);
  dest = move(startingPosition).right().down().position;
  detectCollision(dest, cells[dest], piece, moves);

  return trimEdges(moves);
};

const rookMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];

  // Move up
  for (let i = 0; i < availableTop(startingPosition); i += 1) {
    const dest = move(startingPosition).up().repeat(i).position;
    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move down
  for (let i = 0; i < availableDown(startingPosition); i += 1) {
    const dest = move(startingPosition).down().repeat(i).position;
    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move left
  for (let i = 0; i < availableLeft(startingPosition); i += 1) {
    const dest = move(startingPosition).left().repeat(i).position;
    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move right
  for (let i = 0; i < availableRight(startingPosition); i += 1) {
    const dest = move(startingPosition).right().repeat(i).position;
    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  return moves;
};

const bishopMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];

  // Move up-left
  for (let i = 0;
    i < Math.min(availableTop(startingPosition), availableLeft(startingPosition));
    i += 1) {
    const dest = move(startingPosition).up().repeat(i).left()
      .repeat(i).position;

    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move up-right
  for (let i = 0;
    i < Math.min(availableTop(startingPosition), availableRight(startingPosition));
    i += 1) {
    const dest = move(startingPosition).up().repeat(i).right()
      .repeat(i).position;

    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move down-left
  for (let i = 0;
    i < Math.min(availableDown(startingPosition), availableLeft(startingPosition));
    i += 1) {
    const dest = move(startingPosition).down().repeat(i).left()
      .repeat(i).position;

    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  // Move down-right
  for (let i = 0;
    i < Math.min(availableDown(startingPosition), availableRight(startingPosition));
    i += 1) {
    const dest = move(startingPosition).down().repeat(i).right()
      .repeat(i).position;

    if (detectCollision(dest, cells[dest], piece, moves)) break;
  }

  return moves;
};

const knightMovement = (startingPosition, cells) => {
  const moves = [];
  const piece = cells[startingPosition];

  // Move up-left
  if (availableLeft(startingPosition) > 1 && availableTop(startingPosition)) {
    const dest = move(startingPosition).up().left().left().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  if (availableLeft(startingPosition) && availableTop(startingPosition) > 1) {
    const dest = move(startingPosition).left().up().up().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  // Move up-right
  if (availableRight(startingPosition) > 1 && availableTop(startingPosition)) {
    const dest = move(startingPosition).up().right().right().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  if (availableRight(startingPosition) && availableTop(startingPosition) > 1) {
    const dest = move(startingPosition).right().up().up().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  // Move down-left
  if (availableLeft(startingPosition) > 1 && availableDown(startingPosition)) {
    const dest = move(startingPosition).down().left().left().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  if (availableLeft(startingPosition) && availableDown(startingPosition) > 1) {
    const dest = move(startingPosition).left().down().down().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  // Move down-right
  if (availableRight(startingPosition) > 1 && availableDown(startingPosition)) {
    const dest = move(startingPosition).down().right().right().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  if (availableRight(startingPosition) && availableDown(startingPosition) > 1) {
    const dest = move(startingPosition).right().down().down().position;
    detectCollision(dest, cells[dest], piece, moves);
  }

  return trimEdges(moves);
};

const queenMovement = (startingPosition, cells) => {
  const rookMoves = rookMovement(startingPosition, cells);
  const bishopMoves = bishopMovement(startingPosition, cells);

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
