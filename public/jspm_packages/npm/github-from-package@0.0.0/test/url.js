/* */ 
var test = require('tape');
var github = require('../index');
var packages = {
  a: require('./a.json!systemjs-json'),
  b: require('./b.json!systemjs-json'),
  c: require('./c.json!systemjs-json'),
  d: require('./d.json!systemjs-json'),
  e: require('./e.json!systemjs-json')
};
test(function(t) {
  t.plan(5);
  var url = 'https://github.com/substack/beep-boop';
  t.equal(url, github(packages.a), 'a.json comparison');
  t.equal(url, github(packages.b), 'b.json comparison');
  t.equal(url, github(packages.c), 'c.json comparison');
  t.equal(url, github(packages.d), 'd.json comparison');
  t.equal(url, github(packages.e), 'e.json comparison');
});
