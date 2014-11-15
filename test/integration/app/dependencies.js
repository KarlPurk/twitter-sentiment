/**
 * Return a hash of dependencies for easy reference in tests
 * This simply avoids having to require these common dependencies
 * in each test which results in cleaner tests that avoid stupidly
 * long relative paths.
 */
module.exports = {
    app: require('./../../../app/app'),
    backbone: require('backbone'),
    underscore: require('underscore')
};