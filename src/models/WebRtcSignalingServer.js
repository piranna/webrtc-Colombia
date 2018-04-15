/* WebRtcSiganlingServer */
let os = require('os');


class WebRtcSignalingServer{

	//let wss = {};

	constructor(webSocketServer,evKurentoClt,evKurentoClientRegistry) {
		/* Defining local dependencies */
		this.wss = webSocketServer;
		this.evKurentoClt = evKurentoClt;
		this.cltRegistry = evKurentoClientRegistry;


		/* Binding to local scope the "this" reference " */
		this.dispatchIpAddr = this.dispatchIpAddr.bind(this);
		this.notifyNewConnection = this.notifyNewConnection.bind(this);
		this.getAllConnectedUsers = this.getAllConnectedUsers.bind(this);
		this.call = this.call.bind(this);
		this.responseCall = this.responseCall.bind(this);
		this.hangOut = this.hangOut.bind(this);
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
			type: 'all clients',
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
	}


	responseCall(){
	}

	hangOut(){
	}
}


module.exports = exports = WebRtcSignalingServer;