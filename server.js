var express = require('express');
var app = express();
var http = require('http').Server(app);
// io takes in http as an argument integrating http to the websockets
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// .on is an event listener waiting for a connection from
// the client at the server port defined by http
// the callback received a socket as a response object
io.on('connection', (socket) => {
  console.log('A connection opened');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
