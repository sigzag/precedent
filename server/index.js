const express = require('express');
const io = require('socket.io');
const { createServer } = require('http');
const { resolve } = require('path');
const User = require('./engine/User');

//  server
const app = express();
const server = createServer(app);
const socket = io(server);

app.use(express.static(resolve(__dirname, '..', 'build')));
socket.on('connection', (socket) => new User(socket));
server.listen(4000, () => console.log('Listening on localhost:4000'));
