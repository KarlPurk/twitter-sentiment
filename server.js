var express = require('express'),
    app = express(),
    server,
    io;

// Configure express app to use static file server
app.use(express.static(__dirname + '/'));

// Create a new http server
server = require('http').createServer(app);

// Attach socket.io to the http server
io = require('socket.io').listen(server);

// Start the server
server.listen(8080);

io.sockets.on('connection', function (socket) {

    socket.on('filter', function(data) {
        console.log('filter received: ' + data.track);
    });

});