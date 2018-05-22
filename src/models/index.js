'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');


module.exports = function(pathToPublic) {
	return function(req,res){
    let pathReq = url.parse(req.url).pathname;
    let pathToHtmlFiles = pathToPublic+''+pathReq;
    console.log(req.url);
    console.log(req.method);

    switch(pathReq){
      case '/':
        let localIndexHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <title>WebRTC Test</title>
</head>
<body>
  <h1>WebRTC Test</h1>
</body>
</html>`;

        res.writeHead(200,{'Content-Type':"text/html"});
        res.write(localIndexHtml);
        res.end();
      break;

      default:
      	let extname = path.extname(pathReq);
		    let contentType = 'text/html';

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

      	fs.readFile(pathToHtmlFiles, function(error, data){
	        if (error){
	          res.writeHead(404);
	          res.write("opps this doesn't exist - 404");
	        }
	        else{
	          res.writeHead(200, {"Content-Type": contentType});
	          res.write(data, "utf8");
	        }
					res.end();
      	});
    }
	};
}
