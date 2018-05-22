'use strict';

const http = require('http');

const index = require('./index')


class WebServer{
	constructor(pathToPublic,httpPort) {
		this.pathToPublic = pathToPublic;
		this.wserver = http.createServer(index(pathToPublic))
		.listen(httpPort);
		console.log("Escuando en puerto: "+httpPort);
	}
}


//Usando require();
module.exports = WebServer;

//Usando Import
//export default FileWatcher;
