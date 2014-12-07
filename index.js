var fs = require('fs'),
    esprima = require('esprima'),
    estraverse = require('estraverse'),
    escodegen = require('escodegen');

var source = fs.readFileSync('messy.js');

var ast = esprima.parse(source);

var scopes = [];

function isVariable(node) {
  return node.type === 'VariableDeclaration';
}

function isFunction(node) {
  return node.type === 'FunctionDeclaration';
}

function getVariableName(node) {
  return node.id.name;
}

function getVariableNames(node) {
  return node.declarations.map(getVariableName);
}

function merge(array1, array2) {
  return array1.concat(array2);
}

function getScopeIdentifiers(body) {
  var vars  = body.filter(isVariable).map(getVariableNames).reduce(merge, []);
  var funcs = body.filter(isFunction).map(getVariableName);
  return vars.concat(funcs);
}

function getArguments(node) {
  return node.params.map(function (param) { return param.name; });
}

function isDeclared(name) {
  return scopes.some(function (scope) {
    return scope.indexOf(name) !== -1;
  });
}

estraverse.traverse(ast, {
  enter: function(node) {
    var scope = [];
    if (Array.isArray(node.body)) {
      scope.push.apply(scope, getScopeIdentifiers(node.body));
    }
    if (isFunction(node)) {
      scope.push.apply(scope, getArguments(node));
    }
    scopes.push(scope);

    if (node.type === 'CallExpression' && node.callee.name === 'isNaN') {
      if (!isDeclared('isNaN')) {
        node = replaceIsNaN(node);
      }
    }
  },
  leave: function (node, parent) {
    scopes.pop();
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
