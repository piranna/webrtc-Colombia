"use strict";

var _WebServer = require("./models/WebServer");

var _WebServer2 = _interopRequireDefault(_WebServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pathToPublic = __dirname + "/public/";
var httpserver = new _WebServer2.default(pathToPublic, 6000);