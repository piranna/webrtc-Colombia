'use strict';
var socketio = require('socket.io');
var PubSub = require('PubSub');

class WebSocketsServer{

	constructor(httpServer) {
		
		/* Instancia un servidor de websockets */
		this.socketServer = new socketio(httpServer);
		this.pubsub = new PubSub();
		this.maxUserPerRoom = 15;
		console.log("Starting websockets server...")
	}


	emmitMessageToSockets (eventType,msgObj){

		this.socketServer.sockets.emit(eventType,msgObj);

	}

	emmitMessageToSingleSocket (eventype,msgObj,room){
		this.socketServer.to(room).emit(eventype,msgObj);
	}


	subscribeToEvents (topic,callback){
		return this.pubsub.subscribe(topic,callback);
	}

	unSubscribeToEvents (reference){
		return this.pubsub.unsubscribe(reference);
	}

	startToListenSocketsEvents (){

		this.socketServer.sockets.on('connection', (socket)=>{

		    /* It notifies to socket, it has been connected */
		    socket.emit('message',{
		    	type: 'connected',
				code: 200,
			});
		    console.log("Socket: "+socket.id+" has been connected");
		    this.pubsub.publish('connection',socket);

		    /* It subscribes a socket to a room */
		    socket.on('subscribe', (data)=>{ 

		    	let msgObj = {}
		    	if (typeof this.socketServer.sockets.adapter.rooms[data.room] != 'undefined'){
		    		console.log("The room already exists and it has "+this.socketServer.sockets.adapter.rooms[data.room].length+" connected sockets.");
		    		if (this.socketServer.sockets.adapter.rooms[data.room].length < this.maxUserPerRoom){
		    			console.log("Registering socket "+socket.id+" to room "+data.room+".");
		    			socket.join(data.room); 
		    			msgObj = {
		    				code: 200,
		    				type: 'joined',
		    				members : this.socketServer.sockets.adapter.rooms[data.room].length,
		    				joined : true,
		    			}
		    			//Returns a notification to socket
		    			this.emmitMessageToSingleSocket ("message",msgObj,socket.id);
		    		}
		    		else{
		    			console.log("It is not possible to connect "+socket.id+" to room "+data.room+", full room");
		    			msgObj.error = "Full room";
		    			msgObj.code = 412;//HTTP 412 Error, 412 Precondition Failed
		    			msgObj.type = 'no joined';
		    			//Returns a notification to socket
		    			this.emmitMessageToSingleSocket ("error",msgObj,socket.id);
		    		}
		    	}
		    	else{
		    		console.log("Creating a new room: "+data.room+" and registering socket "+socket.id+"...");
		    		socket.join(data.room); 
		    		msgObj = {
		    			code: 200,
		    			type: 'joined',
						members : this.socketServer.sockets.adapter.rooms[data.room].length,
						joined : true,
	    			}
	    			//Returns a notification to socket
		    		this.emmitMessageToSingleSocket ("message",msgObj,socket.id);
		    	}

		    	//It emmits a message to subcribers (PubSub pattern)
		    	data.msgObj = msgObj;
		    	data.socketid = socket.id;
		    	this.pubsub.publish('subscribe',data);
		    })

		    /* desuscribe a un socket de un room */
		    socket.on('unsubscribe', (data)=>{  
		        socket.leave(data.room); 
		        //Retorna la notificación al socket
		        let msgObj = {
		        	code: 200,
		        	msg: 'You have left the room: '+data.room,
		        	type: 'leave'
		        }
	    		this.emmitMessageToSingleSocket ("message",msgObj,socket.id);
	    		//Emite el mensaje para los clientes que están conectados al PubSub de este metodo
	    		data.msgObj = msgObj;
	    		data.socketid = socket.id;
	    		this.pubsub.publish('unsubscribe',data);
		    })

		    /**
		    * This event handler re-send data object to any other socket connected
		    * to room defined in data.room
		    * 
		    * @param {Object} data - This object has the payload to resend other sockets joined to data.room room
		    */
		    socket.on('send', (data)=>{
		        socket.sockets.in(data.room).emit('message', data.message);
		    });



		    /**
			* This event handler expects the data object to re-send this object to 
			* functions registered in the data.topic subject.
			* 
			* In the client side (browser) a message must have this structure:
			*
			*		msgObj = {
			*
			*			topic: 'connectto',
			*			info: {
			*				id: remoteId
			*			}
			*		socket.emit("message",msgObj);
			*
			* In this example, the data passed in msgObj (object) is send to any function
			* registered for topic "connectto".
			*
		    */
		    socket.on('message',(data)=>{
		    	console.log(data);
		        console.log("=======================\n");
				this.pubsub.publish(data.topic,data.info);
		    });

		    /**
		    *
		    * Event handler for sockets when they have been disconnected
		    *
		    */
		    socket.on('disconnect',(reason)=>{

		    	console.log(`Socket ${socket.id} has been disconnected`);
		    	this.pubsub.publish('disconnect',({reason: reason,socketid:socket.id}));

		    })
		});

	};

}


//Usando require();
module.exports = exports = WebSocketsServer;

//Usando Import
//export default WebSocketsServer;