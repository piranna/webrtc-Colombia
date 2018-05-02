'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var socketio = require('socket.io');
var PubSub = require('PubSub');

var WebSocketsServer = function () {
	function WebSocketsServer(httpServer) {
		_classCallCheck(this, WebSocketsServer);

		/* Instancia un servidor de websockets */
		this.socketServer = new socketio(httpServer);
		this.pubsub = new PubSub();
		this.maxUserPerRoom = 15;
		console.log("Starting websockets server...");
	}

	_createClass(WebSocketsServer, [{
		key: 'emmitMessageToSockets',
		value: function emmitMessageToSockets(eventType, msgObj) {

			this.socketServer.sockets.emit(eventType, msgObj);
		}
	}, {
		key: 'emmitMessageToSingleSocket',
		value: function emmitMessageToSingleSocket(eventype, msgObj, room) {
			this.socketServer.to(room).emit(eventype, msgObj);
		}
	}, {
		key: 'subscribeToEvents',
		value: function subscribeToEvents(topic, callback) {
			return this.pubsub.subscribe(topic, callback);
		}
	}, {
		key: 'unSubscribeToEvents',
		value: function unSubscribeToEvents(reference) {
			return this.pubsub.unsubscribe(reference);
		}
	}, {
		key: 'startToListenSocketsEvents',
		value: function startToListenSocketsEvents() {
			var _this = this;

			this.socketServer.sockets.on('connection', function (socket) {

				/* It notifies to socket, it has been connected */
				socket.emit('message', {
					type: 'connected',
					code: 200
				});
				console.log("Socket: " + socket.id + " has been connected");
				_this.pubsub.publish('connection', socket);

				/* It subscribes a socket to a room */
				socket.on('subscribe', function (data) {

					var msgObj = {};
					if (typeof _this.socketServer.sockets.adapter.rooms[data.room] != 'undefined') {
						console.log("The room already exists and it has " + _this.socketServer.sockets.adapter.rooms[data.room].length + " connected sockets.");
						if (_this.socketServer.sockets.adapter.rooms[data.room].length < _this.maxUserPerRoom) {
							console.log("Registering socket " + socket.id + " to room " + data.room + ".");
							socket.join(data.room);
							msgObj = {
								code: 200,
								type: 'joined',
								members: _this.socketServer.sockets.adapter.rooms[data.room].length,
								joined: true
								//Returns a notification to socket
							};_this.emmitMessageToSingleSocket("message", msgObj, socket.id);
						} else {
							console.log("It is not possible to connect " + socket.id + " to room " + data.room + ", full room");
							msgObj.error = "Full room";
							msgObj.code = 412; //HTTP 412 Error, 412 Precondition Failed
							msgObj.type = 'no joined';
							//Returns a notification to socket
							_this.emmitMessageToSingleSocket("error", msgObj, socket.id);
						}
					} else {
						console.log("Creating a new room: " + data.room + " and registering socket " + socket.id + "...");
						socket.join(data.room);
						msgObj = {
							code: 200,
							type: 'joined',
							members: _this.socketServer.sockets.adapter.rooms[data.room].length,
							joined: true
							//Returns a notification to socket
						};_this.emmitMessageToSingleSocket("message", msgObj, socket.id);
					}

					//It emmits a message to subcribers (PubSub pattern)
					data.msgObj = msgObj;
					data.socketid = socket.id;
					_this.pubsub.publish('subscribe', data);
				});

				/* desuscribe a un socket de un room */
				socket.on('unsubscribe', function (data) {
					socket.leave(data.room);
					//Retorna la notificación al socket
					var msgObj = {
						code: 200,
						msg: 'You have left the room: ' + data.room,
						type: 'leave'
					};
					_this.emmitMessageToSingleSocket("message", msgObj, socket.id);
					//Emite el mensaje para los clientes que están conectados al PubSub de este metodo
					data.msgObj = msgObj;
					data.socketid = socket.id;
					_this.pubsub.publish('unsubscribe', data);
				});

				/**
    * This event handler re-send data object to any other socket connected
    * to room defined in data.room
    * 
    * @param {Object} data - This object has the payload to resend other sockets joined to data.room room
    */
				socket.on('send', function (data) {
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
				socket.on('message', function (data) {
					console.log(data);
					console.log("=======================\n");
					_this.pubsub.publish(data.topic, data.info);
				});

				/**
    *
    * Event handler for sockets when they have been disconnected
    *
    */
				socket.on('disconnect', function (reason) {

					console.log('Socket ' + socket.id + ' has been disconnected');
					_this.pubsub.publish('disconnect', { reason: reason, socketid: socket.id });
				});
			});
		}
	}]);

	return WebSocketsServer;
}();

//Usando require();


module.exports = exports = WebSocketsServer;

//Usando Import
//export default WebSocketsServer;