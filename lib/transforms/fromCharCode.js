var utils = require('../utils');

function test(node, scopes) {
  return node.type === 'CallExpression'
      && node.callee.type === 'MemberExpression'
      && node.callee.object.name === 'String'
      && node.callee.property.name === 'fromCharCode';
}

function replace(node) {
  node.callee.property.name = 'fromCodePoint';
  return node;
}

module.exports = {
  test: test,
  manipulate: replace
};
