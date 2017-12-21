/* */ 
"use strict";
exports.__esModule = true;
exports.default = replaceShorthandObjectMethod;
var _babelTypes = require('babel-types');
var t = _interopRequireWildcard(_babelTypes);
var _util = require('./util');
var util = _interopRequireWildcard(_util);
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function replaceShorthandObjectMethod(path) {
  if (!path.node || !t.isFunction(path.node)) {
    throw new Error("replaceShorthandObjectMethod can only be called on Function AST node paths.");
  }
  if (!t.isObjectMethod(path.node)) {
    return path;
  }
  if (!path.node.generator) {
    return path;
  }
  var parameters = path.node.params.map(function(param) {
    return t.cloneDeep(param);
  });
  var functionExpression = t.functionExpression(null, parameters, t.cloneDeep(path.node.body), path.node.generator, path.node.async);
  util.replaceWithOrRemove(path, t.objectProperty(t.cloneDeep(path.node.key), functionExpression, path.node.computed, false));
  return path.get("value");
}
