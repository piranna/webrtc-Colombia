import io from "socket.io-client";

var isInitiator;
var data = {};
window.room = prompt("Enter room name:");

var socket = io.connect('https://192.168.1.7:12000/');

if (room !== "") {
  console.log('Message from client: Asking to join room ' + room);
  data.room = room;
  socket.emit('subscribe', data);
}

socket.on('created', function(room, clientId) {
  isInitiator = true;
});

socket.on('full', function(room) {
  console.log('Message from client: Room ' + room + ' is full :^(');
});

socket.on('ipaddr', function(data) {
  console.log('Message from client: Server IP address is ' + data.ip);
});

socket.on('joined', function(room, clientId) {
  isInitiator = false;
});

socket.on('log', function(array) {
  console.log.apply(console, array);
});


setTimeout(function(){

	data = {
		topic: 'ipaddr',
		info:{
			room: room
		}
	}
	socket.emit('message',data);

},2000);
