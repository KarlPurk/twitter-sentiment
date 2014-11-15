/*jslint node: true */
"use strict";

var io = require('./../../server');

require('must');
var ioClient = require('socket.io-client');
var socketURL = 'http://127.168.0.1:8080';
var options ={
    transports: ['websocket'],
    'force new connection': true
};

describe("server", function() {
    it("must return a clean tweet object with a sentiment", function(done) {
        var client = ioClient.connect(socketURL, options),
            tweetReceived = false;
        client.on('error', function(e) {
            throw new Error(e);
        });
        client.on('connect', function() {
            client.emit('filter', {track: 'javascript'});
        });
        client.on('disconnect', function() {
            tweetReceived.must.equal(true);
            done();
        });
        client.on('tweet', function(tweet) {
            tweetReceived = true;
            tweet.sentiment.type.must.be.a.string();
            tweet.sentiment.score.must.be.a.number();
            tweet.sentiment.mixed.must.be.a.boolean();
            tweet.text.length.must.be.gt(0);
            tweet.user.screen_name.length.must.be.gt(0);
            client.disconnect();
        });
    });
});
