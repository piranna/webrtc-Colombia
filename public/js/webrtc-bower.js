/*
import $ from 'jquery';
import io from 'socket.io-client';
import uidgen from 'uid-safe';
*/
//import kurento = require('kurento/kurento-client-js');



console.log(kurentoUtils);
const mainSocket = io('https://192.168.1.7:8443');


//let uid = uidgen.sync(14);
const uid = lil.uuid();
let htmlConsole = document.querySelector(".console");
let clickHandler = ("ontouchstart" in window ? "touchend" : "click")

/* deja en el ámbito global el flujo de datos */

let localAudio, localVideo = {};
let peercon = 1;

$(document).ready(()=>{

    
    /* 1. Conecta el servidor de sockets */
	mainSocket.emit("message","Conectado...");

	mainSocket.on("message",(data)=>{

		console.log(data);
		htmlConsole.innerHTML = mainSocket.id;


	})


	/* 2. Toma los datos multimedia locales */
	const videoConstraints = {
		video: true,
		audio: false,
	};

	const audioConstraints = {
		audio: true,
		video: false,
	};

	console.log("Tomando los datos multimedia locales...");
	//console.log(navigator.mediaDevices);

	navigator.mediaDevices.getUserMedia(videoConstraints)
	.then((stream)=>{

		localVideo = stream;
		const videoObj = document.getElementById('vOwn');
		videoObj.srcObject = stream;
		//console.log(stream);

	})
	.catch((err)=>{
	  /* handle the error */
	  console.log("Error cargando el stream de datos...");
	  let errCont = document.getElementById("msgContainer");
	  errCont.innerHTML = err;
	});


	navigator.mediaDevices.getUserMedia(audioConstraints)
	.then((stream)=>{

		localAudio = stream;
		const videoObj = document.getElementById('vOwn');
		videoObj.srcObject = stream;
		//console.log(stream);

	})
	.catch((err)=>{
	  /* handle the error */
	  console.log("Error cargando el stream de datos...");
	  let errCont = document.getElementById("msgContainer");
	  errCont.innerHTML = err;
	});

	/* It generates Peer-to-peer connection */
	peercon = new RTCPeerConnection();
	console.log(peercon);


	/* Maneja la vinculación al otro cliente */

	$("#btn-send").on(clickHandler,(e)=>{

		e.preventDefault();
		let remoteId = $(e.target).siblings("#jointo").val();
		let msgObj = {

			topic: 'connectto',
			info: {
				id: remoteId
			}

		}

		console.log(msgObj);
		mainSocket.emit("message",msgObj);

	})


})


