var utils = require('../utils');

function test(node, scopes) {
  return node.type === 'CallExpression'
      && node.callee.name === 'isNaN'
      && !utils.isDeclared(scopes, 'isNaN');
}

function replaceIsNaN(node) {
  node.callee = {
    type: 'MemberExpression',
    computed: false,
    object: { type: 'Identifier', name: 'Number' },
    property: { type: 'Identifier', name: 'isNaN' }
  };
  return node;
}

module.exports = {
  test: test,
  manipulate: replaceIsNaN
};
