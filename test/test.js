'use strict';

/* Dependencias externas */
let assert = require('assert');
let chai = require('chai');
let fs = require('fs');
let request = require('request');
let socketIoClient = require('socket.io-client');

let configData = {

	httpPort:8900,
	httpsPort:8943,
	pathToPublic : __dirname+"/../public/",


}

/*

	Loading modules to test

*/

//let WebServer = require('../dist/src/models/WebServer.js');
//let WebSecureServer = require('../dist/src/models/WebSecureServer.js');
let WebSecureServer = require('../src/models/WebSecureServer');
let WebServer = require('../src/models/WebServer');
let WebSocketsServer = require('../src/models/WebSocketsServer');

let httpsServer = new WebSecureServer(configData.pathToPublic,configData.httpsPort);
let httpServer = new WebSecureServer(configData.pathToPublic,configData.httpPort);
let wssServer = new WebSocketsServer(httpsServer.wserver);
let wsServer = new WebSocketsServer(httpServer.wserver);
/*
let FileWatcher = require('../dist/sg-syncer/models/FileWatcher.js');
let WtClient = require('../dist/sg-syncer/models/WtClient.js');
let SgDb = require('../dist/sg-syncer/classes/SgDb.js');
let SgHelpers = require('../dist/sg-syncer/classes/SgHelpers.js');

let WebSocketsServer = require('../dist/sg-syncer/models/WebSocketsServer.js');
let SoapClient = require('../dist/sg-syncer/models/SoapClient.js');
*/


/*
	Starting test cases
*/

describe('Module to Test',function(){
	it ('Test #1',function(){
		console.log("Testing #1...");
	});
});


describe('Servidor web con ssl',function(){
	it ('Petición HTTPS GET',function(done){
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		request.get("https://localhost:"+configData.httpsPort+"/index.html",(error,response,body)=>{
			if(error){
				console.log(error);
				chai.assert.isNotOk(true,'Ha ocurrido un error iniciando el servidor web base del servidor de sockets');
				done();
			}
			else{
				
				chai.assert(response.body,/\<h1\>Test\ WebRTC\ \(No Kurento\)\<\/h1\>/,'Ha ocurrido un error iniciando el servidor https base del servidor de sockets')
				//console.log(body);
				done();
			}
		});
	});
});
