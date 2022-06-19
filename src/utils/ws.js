let socket;
let buildMessage;

const initConnection = (gameId, playerId) => {
  const gameURL = `localhost:5000/api/game/${gameId}`;

  buildMessage = (msgType, data) => JSON.stringify({
    msgType,
    gameId,
    playerId,
    data,
  });

  console.log('Connecting to game: ', gameURL);
  socket = new WebSocket(`ws://${gameURL}`);

  socket.addEventListener('open', () => {
    socket.send(buildMessage('join'));
  });

  socket.addEventListener('close', () => {
    console.log('Server disconnected');
  });

  socket.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    console.log('Message from server: ', data);
  });
};

const sendWS = (msgType, data) => socket.send(buildMessage(msgType, data));

const disconnectWS = () => sendWS('leave');

export default initConnection;
export { sendWS, disconnectWS };
