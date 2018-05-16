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
		this.hangOut = this.hangOut.bind(this);
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

		/* Deletes from clients registry */
		let cltToDel = this.cltRegistry.getClientBySocketId(data.socketid);
		this.cltRegistry.deleteClient(cltToDel);

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
		console.log(`Sending call request to callee ${callee.socketid}`);
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
		pl.setIceCandidates(this.icecandidates);
		pl.setSdpOffers(this.sdpOffers);
		pl.startPipeline(caller,callee,(error,pl)=>{
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

	hangOut(){
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