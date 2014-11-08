module.exports = function() {

    var names = [
        'Adam', 'Bob', 'Craig', 'Dave', 'Eddy', 'Frank', 'George',
        'Harry', 'Ian', 'John', 'Karl', 'Len', 'Matt', 'Neil'];

    var sentiments = ['positive', 'negative'];

    var getName = function() {
        var index = Math.round(Math.random() * (names.length - 1));
        return names[index];
    };

    var getSentiment = function() {
        var index = Math.round(Math.random() * (sentiments.length - 1));
        return sentiments[index];
    };

    var getScore = function() {
        return 0.5 + Math.round(Math.random());
    };

    var getMixed = function() {
        return Boolean(Math.round(Math.random()));
    };

    return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam nunc nec ligula consequat ullamcorper. Nullam commodo elementum varius..',
        user: {
            screen_name: getName(),
            profile_image_url: 'https://g.twimg.com/Twitter_logo_blue.png'
        },
        sentiment: {
            type: getSentiment(),
            score: getScore(),
            mixed: getMixed()
        }
    };

};
