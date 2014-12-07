var fs = require('fs');
var esprima = require('esprima');

var source = fs.readFileSync('messy.js');



console.log(JSON.stringify(esprima.parse(source), null, 4));

