'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

var WebServer = function WebServer(pathToPublic, httpPort) {
	var _this = this;

	_classCallCheck(this, WebServer);

	this.pathToPublic = pathToPublic;
	this.wserver = http.createServer(function (req, res) {

		var pathReq = url.parse(req.url).pathname;
		var pathToHtmlFiles = _this.pathToPublic + '' + pathReq;
		console.log(req.url);
		console.log(req.method);

		switch (pathReq) {
			case '/':
				var localIndexHtml = '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset=\'utf-8\'>\n    <meta name=\'viewport\' content=\'width=device-width, initial-scale=1\'>\n    <title>WebRTC Test</title>\n</head>\n<body>\n    <h1>WebRTC Test</h1>\n</body>\n</html>';

				res.writeHead(200, { 'Content-Type': "text/html" });
				res.write(localIndexHtml);
				res.end();

				break;
			default:

				var extname = path.extname(pathReq);
				var contentType = 'text/html';
				switch (extname) {
					case '.js':
						contentType = 'text/javascript';
						break;
					case '.css':
						contentType = 'text/css';
						break;
					case '.json':
						contentType = 'application/json';
						break;
					case '.png':
						contentType = 'image/png';
						break;
					case '.jpg':
						contentType = 'image/jpg';
						break;
					case '.wav':
						contentType = 'audio/wav';
						break;
				}
				fs.readFile(pathToHtmlFiles, function (error, data) {
					if (error) {
						res.writeHead(404);
						res.write("opps this doesn't exist - 404");
						res.end();
					} else {
						res.writeHead(200, { "Content-Type": contentType });
						res.write(data, "utf8");
						res.end();
					}
				});
				break;
				break;
		}

		//console.log(res);
	});
	console.log("Escuando en puerto: " + httpPort);
	this.wserver.listen(httpPort);
};

//Usando require();


module.exports = exports = WebServer;

//Usando Import
//export default FileWatcher;