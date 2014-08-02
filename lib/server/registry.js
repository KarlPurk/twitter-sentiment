var events = require('events');

// Production configuration

var productionConfig = {
    'twit': require('twit'),
    'alchemy-api': require('alchemy-api')
};

// Testing configuration

var tweetMock = {
    text: 'Test',
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
        return {
            stream: function() {
                var stream = new events.EventEmitter();
                setInterval(function() {
                    stream.emit('tweet', tweetMock);
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
    env: 'testing',
    get: function(key) {
        return environments[this.env][key];
    }
};