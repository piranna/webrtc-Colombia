/* Import libraries */
import $ from 'jquery';
import io from 'socket.io-client';
//import kurento = require('kurento/kurento-client-js');

/* Import models */
import WssCommingMessageHandler from './models/WssCommingMessageHandler.js';
import EvClientIdentity from './models/EvClientIdentity.js';
import EvClients from './models/EvClients.js';

/* Import Classes */
import EvClientNickNameSetter from './classes/EvClientNickNameSetter.js';
import EvClientWsConectedHandler from './classes/EvClientWsConectedHandler.js';
import EvClientWsJoinedToRoomHandler from './classes/EvClientWsJoinedToRoomHandler.js';
import EvClientWsNewConnectionHandler from './classes/EvClientWsNewConnectionHandler';
import EvClientWsNewSubscriptionHandler from './classes/EvClientWsNewSubscriptionHandler';
import EvClientWsGetAllClientsHandler from './classes/EvClientWsGetAllClientsHandler'
import EvClientsDrawer from './classes/EvClientsDrawer';



/**
* New object to draw the clients list
*/
const cltsDrawer = new EvClientsDrawer();


/**
* It creates the clients object
*/
const evClients = new EvClients();

/**
* It connects to websocket and webrtc signaling server.
*/
const mainSocket = io('https://192.168.1.6:8443');

/**
*	It defines the identity object
*/
const cltIdentity = new EvClientIdentity();

/**
*	It defines handlers for messages coming from websocket server
*/
const evcltWsOnConnectedHandler = new EvClientWsConectedHandler();
const evCltWsJoinedToRoomHandler = new EvClientWsJoinedToRoomHandler();
const evCltWsNewConnectionHandler = new EvClientWsNewConnectionHandler();
const evCltWsNewSubscriptionHandler = new EvClientWsNewSubscriptionHandler();
const evCltWsGetAllClientsHandler = new EvClientWsGetAllClientsHandler(cltsDrawer);


const wssMsgHandler = new WssCommingMessageHandler(mainSocket);

wssMsgHandler.subscribeToEvents('connected',evcltWsOnConnectedHandler.onConnected);//Connected to websocket server
wssMsgHandler.subscribeToEvents('joined',evCltWsJoinedToRoomHandler.onJoined);

wssMsgHandler.subscribeToEvents('new subscription',(data)=>{
	evCltWsNewSubscriptionHandler.onNewSubscription(data,mainSocket,cltIdentity);
});

wssMsgHandler.subscribeToEvents('all clients',(data)=>{
	evClients.clients = data.clients;
	evCltWsGetAllClientsHandler.onGetAllClients(evClients);
});
//wssMsgHandler.subscribeToEvents('nojoined',);


/**
* It instantiates an object to handle the prompt for nickname
*/
const evNickSetter = new EvClientNickNameSetter();




let htmlConsole = document.querySelector(".console");
let clickHandler = ("ontouchstart" in window ? "touchend" : "click")



let localAudio, localVideo = {};
let peercon = 1;


/** 
* It delegates any message coming from signaling server to
* WssMessageHandler instance.
*/
mainSocket.on("message",(data)=>{
	wssMsgHandler.onMesage(data);
})





$(document).ready(()=>{


	/* 1. Asking user for a nickname */
	 do{
	 	cltIdentity.name = evNickSetter.getNickName();
	 } while (cltIdentity.name == '' || typeof cltIdentity.name == 'undefined' || cltIdentity.name==null)
    /* 2. It registers client in signaling server */
	mainSocket.emit("subscribe",{
		room: 'ev',
		uid: cltIdentity.uid,
		name:cltIdentity.name,
		socketid:mainSocket.id
	});


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


	


});


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





