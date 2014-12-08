var fs = require('fs'),
    esprima = require('esprima'),
    estraverse = require('estraverse'),
    escodegen = require('escodegen'),
    utils = require('./utils');

var scopes = [];

var rules = [
  require('./transforms/isNaN')
];

module.exports = function (source) {
  var ast = esprima.parse(source);

  estraverse.traverse(ast, {
    enter: function(node) {
      var scope = [];
      if (Array.isArray(node.body)) {
        scope = scope.concat(utils.getScopeIdentifiers(node.body));
      }
      if (utils.isFunction(node)) {
        scope = scope.concat(utils.getArguments(node));
      }
      scopes.push(scope);

      rules.forEach(function (rule) {
        if (rule.test(node, scopes)) {
          return rule.manipulate(node);
        }
      });
    },
    leave: function (node, parent) {
      scopes.pop();
    }
  });

  return escodegen.generate(ast);
};
