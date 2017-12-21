'use strict';

let assert = require('assert');
let chai = require('chai');


let fs = require('fs');
let request = require('request');
let socketIoClient = require('socket.io-client');




/*

	Loading modules to test

*/

let WebServer = require('../dist/src/models/WebServer.js');
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

