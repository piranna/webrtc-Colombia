'use strict';

const fs = require('fs');
const https = require('https');

const index = require('./index')


class WebSecureServer{
	constructor(pathToPublic,httpPort,{cert, key}) {
		this.pathToPublic = pathToPublic;
		this.options = {
			key: fs.readFileSync(key),
			cert: fs.readFileSync(cert)
		};
		this.wserver = https.createServer(this.options, index(pathToPublic))
		.listen(httpPort);
		console.log("Escuando en puerto: "+httpPort);
	}
}


//Usando require();
module.exports = WebSecureServer;

//Usando Import
//export default FileWatcher;
