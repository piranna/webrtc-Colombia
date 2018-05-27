/* WebRtcSiganlingServer */
let os = require('os');
let EvKurentoPipeLineFactory = require('./EvKurentoPipeLineFactory');


class WebRtcSignalingServer{

	//let wss = {};

	constructor(webSocketServer,evKurentoClt,evKurentoClientRegistry) {
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
		this.hangUp = this.hangUp.bind(this);
		this.disconnectSocket = this.disconnectSocket.bind(this);
		this.rejectedCall = this.rejectedCall.bind(this);
		this.onIceCandidate = this.onIceCandidate.bind(this);
	}

	dispatchIpAddr(data){

		let ifaces = os.networkInterfaces();
		for (let dev in ifaces) {
			ifaces[dev].forEach((details) => {
				if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
					//socket.emit('ipaddr', details.address);
					console.log("Despachando la IP del servidor al socket...");
					this.wss.emmitMessageToSingleSocket ('ipaddr',
						{'ip': details.address},
						data.room);
				}
		  });
		}

	}


	notifyNewConnection(socket){

		console.log("Se ha conectado un nuevo cliente al servicio: "+socket.id);
		//this.wss.emmitMessageToSingleSocket ('message',data.msg,data.room);
		let msgObj = {
	    	type: 'new connection',
			code: 200,
			id: socket.id
		};
		this.wss.emmitMessageToSockets ('message',msgObj);

	}


	getAllConnectedUsers(idSocketToResponse){

		let msgObj ={
			type: 'all sockets',
			code: 200,
			clients: [],
		}
		//console.log(this.wss.socketServer.sockets);
		for (let client in this.wss.socketServer.sockets.connected){
			msgObj.clients.push(client);
		}
		console.log(msgObj)
		this.wss.emmitMessageToSingleSocket ('message',msgObj,idSocketToResponse);
		
	}

	/**
	* This function hanldes a socket disconnection
	* 
	* @param {Object} data - This is a plain javascript object with next attributes: data.reason, data.socketid
	*
	*/
	disconnectSocket(data){

		/* It gets the user related to disconnected socket */
		let userToDel = this.cltRegistry.getClientBySocketId(data.socketid);
		/* If the related user is in an ongoing call it stops de communication */
		this.releasePl(userToDel);
		/* Deletes from clients registry */
		this.cltRegistry.deleteClient(userToDel);
		/* Notifies to other connected sockets the updated list of clients connected */
		let msgObj ={
			type: 'all clients',
			code: 200,
			clients: this.cltRegistry.registry,
		}
		//console.log(this.wss.socketServer.sockets);
		console.log(msgObj)
		this.wss.emmitMessageToSockets ('message',msgObj);


	}


	releasePl(userToDel){

		console.log(userToDel);
		console.log("WebRtcSiganlingServer:111");
		if (this.pipelines[userToDel.uid] && typeof this.pipelines[userToDel.uid] != 'undefined'){
			this.pipelines[userToDel.uid].releasePipeline();
			let users = this.pipelines[userToDel.uid].getUsers();
			//It cleans sdpOffers and icecandidates already saved
			Reflect.deleteProperty(this.sdpOffers,users.caller.uid);
			delete this.sdpOffers[users.caller.uid];
			Reflect.deleteProperty(this.icecandidates,users.caller.uid);
			delete this.icecandidates[users.caller.uid];
			Reflect.deleteProperty(this.sdpOffers,users.callee.uid);
			delete this.sdpOffers[users.callee.uid];
			Reflect.deleteProperty(this.icecandidates,users.callee.uid);
			delete this.icecandidates[users.callee.uid];
			//It cleans MediaPipeline
			Reflect.deleteProperty(this.pipelines,users.caller.uid);
			delete this.pipelines[users.caller.uid];
			Reflect.deleteProperty(this.pipelines,users.callee.uid);
			delete this.pipelines[users.callee.uid];

			/*
				Sends message to another client
			*/
			let msgObj ={
				type: 'hangup',
				code: 200,
			}
			//console.log(this.wss.socketServer.sockets);
			console.log(msgObj)
			this.wss.emmitMessageToSockets ('message',msgObj);
			if (userToDel.uid == users.caller.uid){
				this.wss.emmitMessageToSingleSocket ('message',msgObj,users.callee.socketid);
			}
			else{
				this.wss.emmitMessageToSingleSocket ('message',msgObj,users.caller.socketid);	
			}
			
		}

	}


	getAllConnectedClients(idSocketToResponse){

		let msgObj ={
			type: 'all clients',
			code: 200,
			clients: this.cltRegistry.registry,
		}
		//console.log(this.wss.socketServer.sockets);
		console.log(msgObj)
		this.wss.emmitMessageToSingleSocket ('message',msgObj,idSocketToResponse);
		
	}


	/**
	* This method add a new client to the client's registry. 
	* 
	* @param {object} clt - Data object must have at least, clt.uid and clt.name
	*/
	registeringClient(clt){
		//Add client to local registry
		this.cltRegistry.addClient(clt);
		console.log(this.cltRegistry);
		let msgObj = {
			type: 'new subscription',
			code:200,
			uid:clt.uid,
			name:clt.name,
			socketid:clt.socketid
		}
		//it notifies to another clients about the new connection
		this.wss.emmitMessageToSockets ('message',msgObj);
	}


	call(data){
		let callerId = data.callerId;
		let calleeId = data.calleeId;
		let sdpOffer = data.sdpOffer;
		let caller = this.cltRegistry.getClientByUid(callerId);
		let callee = this.cltRegistry.getClientByUid(calleeId);
		/* ---------------------------------- */
		
		/*
			Save the sdpOffer sent by caller
		*/
		this.sdpOffers[callerId] = sdpOffer;
		/*
		*
		*/
		console.log(`Sending call request to callee ${callee.uid}`);
		let msgObj ={
			type: 'incomingcall',
			code: 200,
			callerId: callerId,
		}
		this.wss.emmitMessageToSingleSocket ('message',msgObj,callee.socketid);

	}


	responseCall(data){

		let sdpOffer = data.sdpOffer;
		let caller = this.cltRegistry.getClientByUid(data.callerId);
		let callee = this.cltRegistry.getClientByUid(data.calleeId);
		let msgObj = {};
		let pl = {};
		/*
			Saves the sdpOffer sent by callee
		*/
		this.sdpOffers[data.calleeId] = sdpOffer;
		//1. It creates a new MediaPipeline Kurento Client
		pl = this.evKurentoPLFactory.createPipeline(data.plType,this.evKurentoClt,this.wss);
		pl.setCaller(caller);
		pl.setCallee(callee);
		pl.setIceCandidates(this.icecandidates);
		pl.setSdpOffers(this.sdpOffers);
		pl.startPipeline((error,pl)=>{
			if(error){
				console.log(error);
				return false;
			}
			pl.generateSdpAnswer(caller.uid,(error,callerSdpAnswer)=>{
				if (error){

					console.log("Error creating sdpAnswer for caller...");
					console.log(error);
					return error;
				}
				console.log("callerSdpAnswer");
				console.log(callerSdpAnswer);
				pl.generateSdpAnswer(callee.uid,(error,calleeSdpAnswer)=>{
					if(error){

						console.log("Error creating sdpAnswer for callee...");
						console.log(error);
						return error;
					}
					console.log("calleeSdpAnswer");
					console.log(calleeSdpAnswer);
					//2. It sends to clients the notification to start the comunication
					msgObj ={
						type: 'startcomunication',
						code: 200,
						sdpAnswer: callerSdpAnswer
					}
					this.wss.emmitMessageToSingleSocket ('message',msgObj,caller.socketid);

					msgObj ={
						type: 'startcomunication',
						code: 200,
						sdpAnswer: calleeSdpAnswer
					}
					this.wss.emmitMessageToSingleSocket ('message',msgObj,callee.socketid);

				});
			});
		});
		this.pipelines[data.calleeId] = pl;
		this.pipelines[data.callerId] = pl;
		//2. 
		

	}


	rejectedCall(data){

		let caller = this.cltRegistry.getClientByUid(data.callerId);
		let callee = this.cltRegistry.getClientByUid(data.calleeId);
		//It cleans the sdpOffer sent by caller
		console.log("sdpOffers 1");
		console.log(this.sdpOffers);
		this.sdpOffers[data.callerId] = null;
		console.log("sdpOffers 2");
		console.log(this.sdpOffers);
		Reflect.deleteProperty(this.sdpOffers,data.callerId);
		console.log("sdpOffers 3");
		console.log(this.sdpOffers);
		delete this.sdpOffers[data.callerId];
		console.log("sdpOffers 4");
		console.log(this.sdpOffers);

		console.log(`Sending call rejection to caller ${caller.uid}, error: ${data.msg}`);
		let msgObj ={
			type: 'rejectedcall',
			code: 200,
			msg: data.msg,
			calleeId: callee.uid
		}
		this.wss.emmitMessageToSingleSocket ('message',msgObj,caller.socketid);
	}

	hangUp(data){
		let userToDel = this.cltRegistry.getClientByUid(data.uid);
		/* If the related user is in an ongoing call it stops de communication */
		this.releasePl(userToDel);
	}


	/*

		
	
	*/
	onIceCandidate(data){
		if (typeof this.pipelines[data.uid] != 'undefined' && typeof this.pipelines[data.uid]._WebRtcEndPoints[data.uid] != 'undefined'){
			console.log(`Adding to WebRtcEndpoint a new ice candidate from ${data.uid}`);
			this.pipelines[data.uid]._WebRtcEndPoints[data.uid].addIceCandidate(data.candidate);
		}
		else{
			console.log(`Adding to candidates queue an ice candidate from ${data.uid}`);
			if (typeof this.icecandidates[data.uid] == 'undefined' || typeof this.icecandidates[data.uid] != 'Array'){
				this.icecandidates[data.uid] = [];
			}
			this.icecandidates[data.uid].push(data.candidate);
		}
	}
}


module.exports = exports = WebRtcSignalingServer;