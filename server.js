/*jslint node: true */
"use strict";

var express = require('express'),
    Twit = require('twit'),
    config = require('./config'),
    app = express(),
    server,
    io,
    twitter = new Twit(config.twit),
    twitterHelper = require('./lib/server/twitter-helper')(twitter);

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
        twitterHelper.createTweetStream(data.track);
    });

});