const connectWS = (matchId) => {
  const matchURL = `localhost:5000/api/match/${matchId}`;

  console.log('Connecting to match: ', matchURL);

  const socket = new WebSocket(`ws://${matchURL}`);

  socket.addEventListener('open', () => {
    socket.send('Hello server!');
  });

  socket.addEventListener('message', (res) => {
    const data = res.json();
    console.log('Message from server: ', data);
  });

  socket.addEventListener('close', () => {
    socket.send('Client disconnecting');
  });
};

export default connectWS;
