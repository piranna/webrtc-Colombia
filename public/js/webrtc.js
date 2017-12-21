import $ from 'jquery';
import io from 'socket.io-client';

const mainSocket = io('https://localhost:12000');

$(document).ready(()=>{

	console.log(mainSocket);
	mainSocket.emit("message","Conectado...");

	mainSocket.on("message",(data)=>{

		console.log(data);

	})


})