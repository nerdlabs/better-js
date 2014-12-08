var fs = require('fs'),
    betterJS = require('./lib/index');

var source = fs.readFileSync('messy.js');

var result = betterJS(source);

console.log(result);
