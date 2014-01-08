var express = require('express'),
    app = express(),
    server;

// Configure express app to use static file server
app.use(express.static(__dirname + '/'));

// Create a new http server
server = require('http').createServer(app);

// Start the server
server.listen(8080);