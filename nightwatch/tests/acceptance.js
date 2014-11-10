module.exports = {
    before: function(browser) {
        browser.search = function(term) {
            return this
                .setValue('input[type=text]', term)
                .waitForElementVisible('button', 1000)
                .click('button')
                .waitForElementVisible('.latest-tweet', 1000);
        };
    },
    beforeEach: function(browser) {
        browser
            .url("http://localhost:8080")
            .waitForElementVisible('body', 1000);
    },
    "US1 - Search for tweets containing a keyword" : function (browser) {
        browser
            .search('javascript')
            .end();
    },
    "US2 - View Sentiment of each tweet" : function (browser) {
        browser
            .search('javascript')
            .waitForElementVisible('.latest-tweet', 1000)
            .end();
    },
    "US3 - View overall sentiment" : function (browser) {
        browser
            .search('javascript')
            .waitForElementVisible('.gauge', 1000)
            .end();
    },
    "US4 - View all tweets" : function (browser) {
        browser
            .search('javascript')
            .click('.explore a')
            .waitForElementVisible('.tweets__tweet', 1000)
            .end();
    },
    "US5 - Filter tweets" : function (browser) {
        browser
            .url("http://localhost:8080")
            .waitForElementVisible('body', 1000)
            .search('javascript')
            .click('.explore a')
            .waitForElementVisible('.tweets__tweet', 1000)

            // Find the sentiment of the current tweet
            .getText('.tweets tr:first-child td:last-child', function(result) {
                var senitment = result.value;

                // Turn the sentiment filter on
                this.click('.options-container .' + senitment);

                // Ensure the tweet is filtered out
                this.waitForElementNotPresent('.tweets__tweet', 1000);

                // Turn the sentiment filter off
                this.click('.options-container .' + senitment);
            })

            // Make sure the tweet is visible again
            .waitForElementVisible('.tweets__tweet', 1000)
            .end();

        browser.clickWrapper = null;
    },
    "US6 - View sentiment numbers" : function (browser) {
        browser
            .search('javascript')
            .getText('#sentiments tr:first-child td', function(value) {
                this.assert.notEqual(+value, 0, 'Sentiment count must be greater than 0');
            })
            .end();
    },
    "US7 - View latest tweets" : function (browser) {
        browser
            .search('javascript')
            .waitForElementVisible('.latest-tweets', 1000)
            .waitForElementVisible('.latest-tweet', 1000)
            .end();
    }
};