// SERVER FILE

// Setting up libraries and configuration
var express = require('express');		// The require() function includes the code for Express
var app = express();					// Initialize the Express library
var http = require('http').Server(app);	// Initialize an HTTP server
var io = require('socket.io')(http);	// Include and initialize SocketIO
var port = process.env.PORT || 8000;	// Set the default port number to 8000, or use Heroku's settings (process.env.PORT)

// Use Express to serve everything in the "public" folder as static files
app.use(express.static('public'));

// Activate the server and listen on our specified port number
http.listen(port, function() {
	// Display this message in the server console once the server is active
	console.log('Listening on port ' + port);

});

// When a user connects over websocket,
io.on('connection', function(socket) {

	// Display this message in the server console
	console.log('A user connected!');

  // Send an event named "test" to every client with io.sockets.emit() function (or just io.emit() for short)
  // and with this event, send the string 'Hey everyone...' as the data
  io.sockets.emit('test', {sender: "server", randomNumber: 3});

  // When the server receives an event named "test",
  socket.on('test', function(data) {
    // Take whatever data was received and display it in the server console
    console.log(data);
    // reply to client who clicked screen w/ an event
    socket.emit('test', 'I saw you click!');
    // reply to every client except one who clicked
    socket.broadcast.emit('test', 'Off with their head!');
  });

  socket.on('mousedown', function(data){
    socket.broadcast.emit('mousedown', data);
  });
  socket.on('mousemove', function(data){
    socket.broadcast.emit('mousemove', data);
  });

});	// End of SocketIO code
