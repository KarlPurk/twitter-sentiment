var events = require('events'),
    argv = require('yargs').argv;

// Production configuration

var productionConfig = {
    'twit': require('twit'),
    'alchemy-api': require('alchemy-api')
};

// Testing configuration
var generateTweet = require('./../test/stubs/tweet');

var testingConfig = {
    'twit': function() {
        //noinspection JSUnusedGlobalSymbols
        return {
            stream: function() {
                var stream = new events.EventEmitter();
                var tweets = 0;
                var count = 20;
                var getRandomTime = function() {
                    return (Math.round(Math.random() * 9) + 1) * 1000;
                };
                var queueNextTweet = function() {
                    setTimeout(function() {
                        stream.emit('tweet', generateTweet());
                        if (++tweets < count) {
                            queueNextTweet();
                        }
                    }, getRandomTime());
                };
                stream.emit('tweet', generateTweet());
                queueNextTweet();
                stream.stop = function() {};
                return stream;
            }
        };
    },
    'alchemy-api': function() {
        return {
            sentiment: function(text, params, callback) {
                callback(null, {
                    docSentiment: generateTweet().sentiment
                });
            }
        };
    }
};

// Supported environment configurations

var environments = {
    production: productionConfig,
    testing: testingConfig
};

module.exports = {
    env: argv.env ? argv.env : 'testing',
    get: function(key) {
        return environments[this.env][key];
    }
};