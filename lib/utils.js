function isVariable(node) {
  return node.type === 'VariableDeclaration';
}
module.exports.isVariable = isVariable;

function isFunction(node) {
  return node.type === 'FunctionDeclaration';
}
module.exports.isFunction = isFunction;

function getVariableName(node) {
  return node.id.name;
}
module.exports.getVariableName = getVariableName;

function getVariableNames(node) {
  return node.declarations.map(getVariableName);
}
module.exports.getVariableNames = getVariableNames;

function merge(array1, array2) {
  return array1.concat(array2);
}
module.exports.merge = merge;

function getScopeIdentifiers(body) {
  var vars  = body.filter(isVariable).map(getVariableNames).reduce(merge, []);
  var funcs = body.filter(isFunction).map(getVariableName);
  return vars.concat(funcs);
}
module.exports.getScopeIdentifiers = getScopeIdentifiers;

function getArguments(node) {
  return node.params.map(function (param) { return param.name; });
}
module.exports.getArguments = getArguments;

function isDeclared(scopes, name) {
  return scopes.some(function (scope) {
    return scope.indexOf(name) !== -1;
  });
}
module.exports.isDeclared = isDeclared;
