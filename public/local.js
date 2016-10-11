// // CLIENT FILE

// // Start a WebSocket connection with the server using SocketIO
// var socket = io(); 	// Note that the SocketIO client-side library was imported on line 13 of index.html,
// 					// and this file (local.js) was imported on line 14 of index.html

// var randomNumber = Math.floor(Math.random() * 1000);

// // Send an event named "test" to the server with socket.emit() function
// // and with this event, send the string 'Hi, this is...' as the data
// socket.emit('test', {sender: "client", randomNumber: randomNumber});

// // When the client receives an event named "test",
// socket.on('test', function(data) {
//   // Take whatever data was received and display it in the client console
//   console.log(data);
// });

// document.addEventListener('click', function(event) {
//   // this matches up with line 29 in app.js;
//   // socket.emit on client file will send something;
//   // socket.on on server file will receive that thing
//   socket.emit('test', event.clientX, event.clientY);
// });


// Which three JavaScript events should we use instead of "click" to detect
// 1) when a user holds down their mouse button, 2) moves their mouse, and 3) lets go of their mouse button?
// mousedown, mouseenter(move onto), mouseover(it or its children), MOUSEMOVE, mouseup


// // Create a variable for the web page's canvas element, which has id="mycanvas":
// var canvas = document.getElementById('mycanvas');

// // Create a variable to access the two-dimensional canvas drawing functions
// var pen = canvas.getContext('2d');

// pen.beginPath();  // Initialize
// pen.moveTo(0,0);  // Choose starting coordinates (top left corner of canvas)
// pen.lineTo(500,500);  // Choose ending coordinates (500 pixels from top, 500 pixels from left)
// pen.stroke();   // Draw the line

// Start a WebSocket connection with the server using SocketIO
var socket = io();

// Create a variable for the web page's canvas element, which has id="mycanvas"
var canvas = document.getElementById('mycanvas');

// Create a variable to access the two-dimensional canvas drawing functions
var pen = canvas.getContext('2d');

// Set event listeners for when the mouse button is pressed down, when the mouse moves, and when the mouse button is released
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawStuff);
canvas.addEventListener('mouseup', stopDrawing);

var isDrawing = false;

function startDrawing(event) {
  // console.log("START: " + event.clientX + ", " + event.clientY);
  // Which canvas drawing functions should go here??
  // HINT: start with pen.beginPath();
  isDrawing = true;
  pen.beginPath();
  pen.moveTo(event.clientx, event.clientY);
  socket.emit('mousedown', {x: event.clientX, y: event.clientY});
}

function drawStuff(event) {
  // console.log("Moved to: " + event.clientX + ", " + event.clientY);
  // Which canvas drawing functions should go here?? (or none at all?)
  if (isDrawing) {
    pen.lineTo(event.clientX, event.clientY);
    pen.stroke();
    socket.emit('mousemove', {x: event.clientX, y: event.clientY});
  }
}

function stopDrawing(event) {
  // console.log("STOP: " + event.clientX + ", " + event.clientY);
  // Which canvas drawing functions should go here?? (or none at all?)
  // pen.closePath();
  isDrawing = false;
}

socket.on('mousedown', function(data) {
  pen.beginPath();
  pen.moveTo(data.x, data.y);
  console.log(data);
});

socket.on('mousemove', function(data) {
  pen.lineTo(data.x, data.y);
  pen.stroke();
  console.log(data);
});
