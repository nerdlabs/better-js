var fs = require('fs'),
    esprima = require('esprima'),
    estraverse = require('estraverse'),
    escodegen = require('escodegen');

var source = fs.readFileSync('messy.js');

var ast = esprima.parse(source);

estraverse.traverse(ast, {
  enter: function(node) {
    if (node.type === 'CallExpression') {
      node = replaceIsNaN(node);
    }
  }
});

var res = escodegen.generate(ast);


function replaceIsNaN(node) {
  node.callee = {
    type: 'MemberExpression',
    computed: false,
    object: { type: 'Identifier', name: 'Number' },
    property: { type: 'Identifier', name: 'isNaN' }
  };
  return node;
}

console.log(res);

