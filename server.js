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
  // socket has an event listener that listens for
  // a disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // add event listener on the socket that hears
  // our chat message we emitted from the client
  socket.on('chat message', (msg) => {
    // msg is the data we received from the emitter
    //io.emit will send that data back to any clients
    //listening for the 'chat message' event
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
