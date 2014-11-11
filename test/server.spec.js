/*jslint node: true */
"use strict";

var io = require('./../server');

var expect = require('chai').expect;
var ioClient = require('socket.io-client');
var socketURL = 'http://127.168.0.1:8080';
var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe("server", function() {
    it("should return a clean tweet object with a sentiment", function(done) {
        var client = ioClient.connect(socketURL, options),
            tweetReceived = false;
        client.on('error', function(e) {
            throw new Error(e);
        });
        client.on('connect', function() {
            client.emit('filter', {track: 'javascript'});
        });
        client.on('disconnect', function() {
            expect(tweetReceived).to.be.true;
            done();
        });
        client.on('tweet', function(tweet) {
            tweetReceived = true;
            expect(tweet.sentiment.type).to.be.a('string');
            expect(tweet.sentiment.score).to.be.a('number');
            expect(tweet.sentiment.mixed).to.be.a('boolean');
            expect(tweet.text.length).to.be.greaterThan(0);
            expect(tweet.user.screen_name.length).to.be.greaterThan(0);
            client.disconnect();
        });
    });
});
