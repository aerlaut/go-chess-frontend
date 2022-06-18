import moves from './moves';

/* eslint-disable max-len */
const COLORS = {
  WHITE: 'White',
  BLACK: 'Black',
};

const MOVEMENT_TYPES = {
  WHITE_PAWN: 'white_pawn',
  BLACK_PAWN: 'black_pawn',
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
};

// Unicode characters for each piece
// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
const PIECE = {
  WHITE_KING: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.KING, icon: '\u2654' },
  WHITE_QUEEN: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.QUEEN, icon: '\u2655' },
  WHITE_ROOK: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.ROOK, icon: '\u2656' },
  WHITE_BISHOP: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.BISHOP, icon: '\u2657' },
  WHITE_KNIGHT: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.KNIGHT, icon: '\u2658' },
  WHITE_PAWN: { color: COLORS.WHITE, movement_type: MOVEMENT_TYPES.WHITE_PAWN, icon: '\u2659' },
  BLACK_KING: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.KING, icon: '\u265A' },
  BLACK_QUEEN: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.QUEEN, icon: '\u265B' },
  BLACK_ROOK: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.ROOK, icon: '\u265C' },
  BLACK_BISHOP: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.BISHOP, icon: '\u265D' },
  BLACK_KNIGHT: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.KNIGHT, icon: '\u265E' },
  BLACK_PAWN: { color: COLORS.BLACK, movement_type: MOVEMENT_TYPES.BLACK_PAWN, icon: '\u265F' },
};

const STARTING_POSITIONS = {
  0: PIECE.BLACK_ROOK,
  1: PIECE.BLACK_KNIGHT,
  2: PIECE.BLACK_BISHOP,
  3: PIECE.BLACK_QUEEN,
  4: PIECE.BLACK_KING,
  5: PIECE.BLACK_BISHOP,
  6: PIECE.BLACK_KNIGHT,
  7: PIECE.BLACK_ROOK,
  8: PIECE.BLACK_PAWN,
  9: PIECE.BLACK_PAWN,
  10: PIECE.BLACK_PAWN,
  11: PIECE.BLACK_PAWN,
  12: PIECE.BLACK_PAWN,
  13: PIECE.BLACK_PAWN,
  14: PIECE.BLACK_PAWN,
  15: PIECE.BLACK_PAWN,
  48: PIECE.WHITE_PAWN,
  49: PIECE.WHITE_PAWN,
  50: PIECE.WHITE_PAWN,
  51: PIECE.WHITE_PAWN,
  52: PIECE.WHITE_PAWN,
  53: PIECE.WHITE_PAWN,
  54: PIECE.WHITE_PAWN,
  55: PIECE.WHITE_PAWN,
  56: PIECE.WHITE_ROOK,
  57: PIECE.WHITE_KNIGHT,
  58: PIECE.WHITE_BISHOP,
  59: PIECE.WHITE_QUEEN,
  60: PIECE.WHITE_KING,
  61: PIECE.WHITE_BISHOP,
  62: PIECE.WHITE_KNIGHT,
  63: PIECE.WHITE_ROOK,
};

const ALLOWED_MOVES = {
  [MOVEMENT_TYPES.WHITE_PAWN]: moves.whitePawnMovement,
  [MOVEMENT_TYPES.BLACK_PAWN]: moves.blackPawnMovement,
  [MOVEMENT_TYPES.KING]: moves.kingMovement,
  [MOVEMENT_TYPES.ROOK]: moves.rookMovement,
  [MOVEMENT_TYPES.BISHOP]: moves.bishopMovement,
  [MOVEMENT_TYPES.KNIGHT]: moves.knightMovement,
  [MOVEMENT_TYPES.QUEEN]: moves.queenMovement,
};

export {
  STARTING_POSITIONS,
  PIECE,
  COLORS,
  MOVEMENT_TYPES,
  ALLOWED_MOVES,
};
