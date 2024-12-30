const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Broadcast to all clients
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = setupSocket;