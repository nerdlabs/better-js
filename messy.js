var foo = 'bar';
var result = 1 + 3 + foo;

function test(toTest) {
  return isNaN(+result);
}


isNaN = alert;

function foo() {
  return isNaN(true);
}
