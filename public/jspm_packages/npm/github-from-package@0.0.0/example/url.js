/* */ 
var github = require('../index');
var url = github(require('./package.json!systemjs-json'));
console.log(url);
