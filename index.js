var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');

var source = fs.readFileSync('messy.js');



// console.log(JSON.stringify(esprima.parse(source), null, 4));

console.log(escodegen.generate(esprima.parse(source)));
