const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket/socketHandler');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup WebSocket
setupSocket(io);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Server running on:`);
    console.log(`- Local: http://localhost:${port}`);
    console.log(`- Network: http://0.0.0.0:${port}`);
    console.log(`WebSocket is ready and listening for connections`);
});