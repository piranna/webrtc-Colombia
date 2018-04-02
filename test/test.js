'use strict';

/* Dependencias externas */
let assert = require('assert');
let chai = require('chai');
let fs = require('fs');
let request = require('request');
let socketIoClient = require('socket.io-client');

let config = require('../config.js');

let configData = {
	httpPort:8900,
	httpsPort:8943,
	pathToPublic : __dirname+"/../public/",
}

const options = {
	key:config.certs.key,
	cert:config.certs.cert
} 

/*

	Loading modules to test

*/

//let WebServer = require('../dist/src/models/WebServer.js');
//let WebSecureServer = require('../dist/src/models/WebSecureServer.js');
let WebSecureServer = require('../src/models/WebSecureServer');
let WebServer = require('../src/models/WebServer');
let WebSocketsServer = require('../src/models/WebSocketsServer');
let EvKurentoClient = require('../src/modules/EvKurentoClient.js');

let httpsServer = new WebSecureServer(configData.pathToPublic,configData.httpsPort,options);
//let httpServer = new WebSecureServer(configData.pathToPublic,configData.httpPort);
let wssServer = new WebSocketsServer(httpsServer.wserver);
//let wsServer = new WebSocketsServer(httpServer.wserver);
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


describe('Testing web server over ssl',function(){
	it ('HTTPS GET Request',function(done){
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


describe('Testing EvKurentoClient module',function(){


	/**
	*	This test verifies the creation of the Kurento Client
	*/
	it ('Creating Kurento Client',function(done){
			EvKurentoClient.getKurentoClt((error,kc)=>{
				if (error==null){			
					chai.assert.equal(kc.constructor.name,'KurentoClient',`Error creating Kurento Client, ${kc.constructor.name} created instead`);
				}
				else if (error.error){
					chai.assert.equal(error.msg,'There is a kurento client creation request on hold...',`No Kurento Client created`);		
				}
				else{
					chai.assert.isNotOk(error.error,`It is such strange! it must be false, ${error.error} instead`);
				}
				done();
			});
	});

	/**
	*	This test verifies the creation of MediaPipeline
	*/

	it ('Creating MediaPipeline',function(done){

		EvKurentoClient.createPipeline((error,pl)=>{

			if (error){
				console.log("Error creating MediaPipeline...");
				console.log(error);
			}

			chai.assert.equal(pl.constructor.name,"MediaPipeline",`Error creating MediaPipeline, ${pl.constructor.name} instead`);
			done();

		})
	});

	/**
	*	Double checking of Mediapipeline creation
	*/
	it ('Verifying MediaPipeline creation',function(){
		chai.assert.equal(EvKurentoClient.getPipelineByIndex(0).constructor.name,'MediaPipeline',`No MediaPipeline ready, ${EvKurentoClient.getPipelineByIndex(0).constructor.name} instead`);
	});

	/**
	*	This test verifies the creation of WebRtcEndpoint over native pipeline object
	*/
	it ('Testing RtcEndPoint MediaElement creation over native pipeline object',(done)=>{

		EvKurentoClient.getPipelineByIndex(0).create('WebRtcEndpoint',(error,me)=>{

			chai.assert.equal(me.constructor.name,'WebRtcEndpoint',`Error creating WebRtcEndpoint, ${me.constructor.name} instead`);
			done();

		});

	})

	/**
	*	This test verifies the creation of WebRtcEndpoint over EvKurentoClient module
	*/
	it ('Testing RtcEndPoint MediaElement creation over EvKurentoClient module',(done)=>{

		let pl = EvKurentoClient.getPipelineByIndex(0);
		EvKurentoClient.createMediaElement(pl,'WebRtcEndpoint','',(error,me)=>{
			//console.log(me);
			chai.assert.equal(me.constructor.name,'WebRtcEndpoint',`Error creating WebRtcEndpoint, ${me.constructor.name} instead`)
			done();
		})

	})

});



/*

	HELPER FUNCTIONS

*/




