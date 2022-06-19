import { sendWS } from './ws';

const sendMoves = (moves) => {
  sendWS(moves);
};

export default sendMoves;
