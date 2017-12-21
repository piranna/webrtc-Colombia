'use strict';
var socketio = require('socket.io');

class WebSocketsServer{

	constructor(httpServer) {
		
		/* Instancia un servidor de websockets */
		this.socketServer = new socketio(httpServer);
		
		console.log("Inicilializando el servidor de sockets...")
	}

	emmitMessageToSockets (eventType,msgObj){

		this.socketServer.sockets.emit(eventType,msgObj);

	}

	emmitMessageToSingleSocket (eventype,msgObj,socketid){

		

	}


	startToListenSocketsEvents (){

		this.socketServer.sockets.on('connection', (socket)=>{

		    /* Registra el socket */
		    socket.emit('message', {'message': 'Te has conectado al servidor  de sockets exitosamente...'});
		    //console.log(socketServer.sockets);
		    //console.log(socket.client);

		    /* -------- */
		    socket.on('subscribe', (data)=>{ 
		        socket.join(data.room); 
		    })

		    socket.on('unsubscribe', (data)=>{  
		        socket.leave(data.room); 
		    })

		    socket.on('send', (data)=>{
		        socket.sockets.in(data.room).emit('message', data);
		    });

		    socket.on('message',(data)=>{
		    	console.log(data);
		        socket.emit('messageresponse',{"message":"200"});
		    });
		});

	};

}


//Usando require();
module.exports = exports = WebSocketsServer;

//Usando Import
//export default WebSocketsServer;