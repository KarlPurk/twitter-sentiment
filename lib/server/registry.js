var events = require('events'),
    argv = require('yargs').argv;

// Production configuration

var productionConfig = {
    'twit': require('twit'),
    'alchemy-api': require('alchemy-api')
};

// Testing configuration

var tweetMock = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam nunc nec ligula consequat ullamcorper. Nullam commodo elementum varius..',
    user: {
        screen_name: 'Karl'
    },
    sentiment: {
        type: 'positive',
        score: '1.5',
        mixed: false
    }
};

var testingConfig = {
    'twit': function() {
        //noinspection JSUnusedGlobalSymbols
        return {
            stream: function() {
                var stream = new events.EventEmitter();
                var tweets = 0;
                var interval = setInterval(function() {
                    stream.emit('tweet', tweetMock);
                    if (++tweets === 5) {
                       clearInterval(interval);
                    }
                }, 1000);
                stream.stop = function() {};
                return stream;
            }
        };
    },
    'alchemy-api': function() {
        return {
            sentiment: function(text, params, callback) {
                callback(null, {
                    docSentiment: tweetMock.sentiment
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