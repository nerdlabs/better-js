var utils = require('../utils');

function test(node, scopes) {
  return node.type === 'CallExpression'
      && node.callee.type === 'MemberExpression'
      && node.callee.property.name === 'charCodeAt';
}

function replace(node) {
  node.callee.property.name = 'codePointAt';
  return node;
}

module.exports = {
  test: test,
  manipulate: replace
};
