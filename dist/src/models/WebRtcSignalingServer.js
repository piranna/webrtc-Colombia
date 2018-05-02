'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* WebRtcSiganlingServer */
var os = require('os');
var EvKurentoPipeLineFactory = require('./EvKurentoPipeLineFactory');

var WebRtcSignalingServer = function () {

	//let wss = {};

	function WebRtcSignalingServer(webSocketServer, evKurentoClt, evKurentoClientRegistry) {
		_classCallCheck(this, WebRtcSignalingServer);

		/* Defining local dependencies */
		this.wss = webSocketServer;
		this.evKurentoClt = evKurentoClt;
		this.cltRegistry = evKurentoClientRegistry;
		this.sdpOffers = {};
		this.icecandidates = {};
		this.pipelines = {};
		this.kc = {};
		this.evKurentoPLFactory = new EvKurentoPipeLineFactory();
		/* Binding to local scope the "this" reference " */
		this.dispatchIpAddr = this.dispatchIpAddr.bind(this);
		this.notifyNewConnection = this.notifyNewConnection.bind(this);
		this.getAllConnectedUsers = this.getAllConnectedUsers.bind(this);
		this.call = this.call.bind(this);
		this.responseCall = this.responseCall.bind(this);
		this.hangOut = this.hangOut.bind(this);
		this.disconnectSocket = this.disconnectSocket.bind(this);
		this.rejectedCall = this.rejectedCall.bind(this);
	}

	_createClass(WebRtcSignalingServer, [{
		key: 'dispatchIpAddr',
		value: function dispatchIpAddr(data) {
			var _this = this;

			var ifaces = os.networkInterfaces();
			for (var dev in ifaces) {
				ifaces[dev].forEach(function (details) {
					if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
						//socket.emit('ipaddr', details.address);
						console.log("Despachando la IP del servidor al socket...");
						_this.wss.emmitMessageToSingleSocket('ipaddr', { 'ip': details.address }, data.room);
					}
				});
			}
		}
	}, {
		key: 'notifyNewConnection',
		value: function notifyNewConnection(socket) {

			console.log("Se ha conectado un nuevo cliente al servicio: " + socket.id);
			//this.wss.emmitMessageToSingleSocket ('message',data.msg,data.room);
			var msgObj = {
				type: 'new connection',
				code: 200,
				id: socket.id
			};
			this.wss.emmitMessageToSockets('message', msgObj);
		}
	}, {
		key: 'getAllConnectedUsers',
		value: function getAllConnectedUsers(idSocketToResponse) {

			var msgObj = {
				type: 'all sockets',
				code: 200,
				clients: []
				//console.log(this.wss.socketServer.sockets);
			};for (var client in this.wss.socketServer.sockets.connected) {
				msgObj.clients.push(client);
			}
			console.log(msgObj);
			this.wss.emmitMessageToSingleSocket('message', msgObj, idSocketToResponse);
		}

		/**
  * This function hanldes a socket disconnection
  * 
  * @param {Object} data - This is a plain javascript object with next attributes: data.reason, data.socketid
  *
  */

	}, {
		key: 'disconnectSocket',
		value: function disconnectSocket(data) {

			/* Deletes from clients registry */
			var cltToDel = this.cltRegistry.getClientBySocketId(data.socketid);
			this.cltRegistry.deleteClient(cltToDel);

			/* Notifies to other connected sockets the updated list of clients connected */
			var msgObj = {
				type: 'all clients',
				code: 200,
				clients: this.cltRegistry.registry
				//console.log(this.wss.socketServer.sockets);
			};console.log(msgObj);
			this.wss.emmitMessageToSockets('message', msgObj);
		}
	}, {
		key: 'getAllConnectedClients',
		value: function getAllConnectedClients(idSocketToResponse) {

			var msgObj = {
				type: 'all clients',
				code: 200,
				clients: this.cltRegistry.registry
				//console.log(this.wss.socketServer.sockets);
			};console.log(msgObj);
			this.wss.emmitMessageToSingleSocket('message', msgObj, idSocketToResponse);
		}

		/**
  * This method add a new client to the client's registry. 
  * 
  * @param {object} clt - Data object must have at least, clt.uid and clt.name
  */

	}, {
		key: 'registeringClient',
		value: function registeringClient(clt) {
			//Add client to local registry
			this.cltRegistry.addClient(clt);
			console.log(this.cltRegistry);
			var msgObj = {
				type: 'new subscription',
				code: 200,
				uid: clt.uid,
				name: clt.name,
				socketid: clt.socketid
				//it notifies to another clients about the new connection
			};this.wss.emmitMessageToSockets('message', msgObj);
		}
	}, {
		key: 'call',
		value: function call(data) {
			var callerId = data.callerId;
			var calleeId = data.calleeId;
			var sdpOffer = data.sdpOffer;
			var caller = this.cltRegistry.getClientByUid(callerId);
			var callee = this.cltRegistry.getClientByUid(calleeId);
			/* ---------------------------------- */

			/*
   	Save the sdpOffer sent by caller
   */
			this.sdpOffers[callerId] = sdpOffer;
			/*
   *
   */
			console.log('Sending call request to callee ' + callee.socketid);
			var msgObj = {
				type: 'incomingcall',
				code: 200,
				callerId: callerId,
				sdpOffer: sdpOffer
			};
			this.wss.emmitMessageToSingleSocket('message', msgObj, callee.socketid);
		}
	}, {
		key: 'responseCall',
		value: function responseCall(data) {

			var sdpOffer = data.sdpOffer;
			var caller = this.cltRegistry.getClientByUid(data.callerId);
			var callee = this.cltRegistry.getClientByUid(data.calleeId);
			var msgObj = {};
			var pl = {};

			/*
   	Saves the sdpOffer sent by callee
   */
			this.sdpOffers[data.callerId] = sdpOffer;

			//1. It creates a new MediaPipeline Kurento Client
			pl = this.evKurentoPLFactory.createPipeline(data.plType, this.evKurentoClt, this.wss);
			console.log(pl);

			/*
   pl.setIceCandidates(this.icecandidates);
   pl.setSdpOffers(this.sdpOffers);
   pl.startPipeline(caller,callee,(error,pl)=>{
   		console.log("Se ha generado el pl");
   	if(error){
   		console.log(error);
   	}
   	
   });
   	this.pipelines[data.calleeId] = pl;
   this.pipelines[data.callerId] = pl;
   */
		}
	}, {
		key: 'rejectedCall',
		value: function rejectedCall(data) {

			var caller = this.cltRegistry.getClientByUid(data.callerId);
			var callee = this.cltRegistry.getClientByUid(data.calleeId);
			//It cleans the sdpOffer sent by caller
			console.log("sdpOffers 1");
			console.log(this.sdpOffers);
			this.sdpOffers[data.callerId] = null;
			console.log("sdpOffers 2");
			console.log(this.sdpOffers);
			Reflect.deleteProperty(this.sdpOffers, data.callerId);
			console.log("sdpOffers 3");
			console.log(this.sdpOffers);
			delete this.sdpOffers[data.callerId];
			console.log("sdpOffers 4");
			console.log(this.sdpOffers);

			console.log('Sending call rejection to caller ' + caller.uid + ', error: ' + data.msg);
			var msgObj = {
				type: 'rejectedcall',
				code: 200,
				msg: data.msg,
				calleeId: callee.uid
			};
			this.wss.emmitMessageToSingleSocket('message', msgObj, caller.socketid);
		}
	}, {
		key: 'hangOut',
		value: function hangOut() {}
	}]);

	return WebRtcSignalingServer;
}();

module.exports = exports = WebRtcSignalingServer;