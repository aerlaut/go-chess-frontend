let socket;

const connectWS = (gameId) => {
  const gameURL = `localhost:5000/api/game/${gameId}`;

  console.log('Connecting to game: ', gameURL);
  socket = new WebSocket(`ws://${gameURL}`);

  socket.addEventListener('open', () => {
    socket.send('Hello server!');
  });

  socket.addEventListener('message', (e) => {
    const data = JSON.parse(e.data);
    console.log('Message from server: ', data);
  });

  socket.addEventListener('close', () => {
    socket.send('Client disconnecting');
  });
};

const sendWS = (message) => {
  socket.send(message);
};

export default connectWS;
export { sendWS };
