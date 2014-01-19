/*jslint node: true */
"use strict";

var io = require('./../server');

var ioClient = require('socket.io-client');

var socketURL = 'http://127.168.0.1:8080';

var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe("server", function() {
    it("should return a clean tweet object with a sentiment", function(done) {
        var client = ioClient.connect(socketURL, options);
        client.on('connect', function() {
            client.emit('filter', {track: 'javascript'});
        });
        client.on('disconnect', function() {
            done();
        });
        client.on('tweet', function(tweet) {
            expect(tweet.sentiment.type).toBeDefined();
            expect(tweet.sentiment.score).toBeDefined();
            expect(tweet.sentiment.mixed).toBeDefined();
            expect(tweet.text.length).toBeGreaterThan(0);
            expect(tweet.user.screen_name.length).toBeGreaterThan(0);
            client.disconnect();
        });
    });
    it("teardown", function() {
        io.server.close();
        // Give the server a second to close and then force the process to exit
        setTimeout(function() {
            process.exit(1);
        }, 1000);
    });
});