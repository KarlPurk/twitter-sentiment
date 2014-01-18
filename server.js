/*jslint node: true */
"use strict";

var express = require('express'),
    app = express(),
    server,
    io,
    twitterHelper = require('./lib/server/twitter-helper');

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

        // Use the twitter helper module to create a filtered
        // twitter stream.  Pass in the socket, any received tweets
        // will be emitted as a tweet event on the socket.
        twitterHelper.createTweetStream(data.track, socket);
    });

});