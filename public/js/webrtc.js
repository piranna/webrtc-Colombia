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
import EvClientCallStatus from './models/EvClientCallStatus';

/* Import Modules */
import evKurentoClient from './modules/EvKurentoClient';



/**
* New object to handle calling status
*/
const cltCallStatus = new EvClientCallStatus();
cltCallStatus.setStatus('NOTREADY');
evKurentoClient.setClientCallStatus(cltCallStatus);

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
const mainSocket = io('https://192.168.1.11:8443');
/**
*	It defines the identity object
*/
const cltIdentity = new EvClientIdentity();
/**
* This is a javascript plain object to 
* pass to kurentoUtils.WebRtcPeer as constructor parameter 
*/
let webRtcPeerOptions = {
	localVideo: document.getElementById('vOwn'),
	remoteVideo: document.getElementById('vForeign'),
	/*
	mediaConstraints:{
		audio : true,
		video : true,
	},
    configuration : {
           "iceServers": [{
               'username': 'ejvturn',
               'url': 'turn:turn100.sientifica.com:5349',
               'credential': '7235bdM235'
           }],
           "iceTransportPolicy": "relay"  //stun wont be used
	}
	*/
}
/**
* It defines de callee user ID
*/
let calleeId = '';

/**
*	It defines handlers for messages coming from websocket server
*/
const evcltWsOnConnectedHandler = new EvClientWsConectedHandler();
const evCltWsJoinedToRoomHandler = new EvClientWsJoinedToRoomHandler();
const evCltWsNewConnectionHandler = new EvClientWsNewConnectionHandler();
const evCltWsNewSubscriptionHandler = new EvClientWsNewSubscriptionHandler();
const evCltWsGetAllClientsHandler = new EvClientWsGetAllClientsHandler(cltsDrawer);
const wssMsgHandler = new WssCommingMessageHandler(mainSocket);



/*
	Websocket connection related event handlers
*/

wssMsgHandler.subscribeToEvents('connected',evcltWsOnConnectedHandler.onConnected);//Connected to websocket server
wssMsgHandler.subscribeToEvents('joined',evCltWsJoinedToRoomHandler.onJoined);
wssMsgHandler.subscribeToEvents('new subscription',(data)=>{
	evCltWsNewSubscriptionHandler.onNewSubscription(data,mainSocket,cltIdentity);
});
wssMsgHandler.subscribeToEvents('all clients',(data)=>{
	evClients.clients = data.clients;
	evCltWsGetAllClientsHandler.onGetAllClients(evClients);
});


/*
	WebRTC connection related event handlers
*/
wssMsgHandler.subscribeToEvents('rejectedcall',(data)=>{
	evKurentoClient.onRejectedCall(data,(error,data)=>{
		console.log(data);
	});
});
wssMsgHandler.subscribeToEvents('incomingcall',(data)=>{
	evKurentoClient.onIncomingCall(data.callerId,data.sdpOffer,(response)=>{
		if (response.error){
			console.log("Error responding to incoming call request");
			console.log(`${response.msg}`);
			return false;
		}
		else{
			console.log("Response for incoming call request has sent ok");
			console.log(`${response.msg}`);
			return true;
		}
	});
});
wssMsgHandler.subscribeToEvents('startcomunication',(data)=>{
	evKurentoClient.onStartCommunication(data.sdpAnswer,(error)=>{
		if (error){
			console.log("Failed starting communication");
		}
		else{
			console.log("Starting communication...");	
		}
	});
});
wssMsgHandler.subscribeToEvents('icecandidate',(data)=>{

	evKurentoClient.onRemoteIceCandidate(data.candidate,(error)=>{
		if (error){
			console.log("Failing adding remote ICE Candidate");
		}
		else{
			console.log("Remote ICE Candidate added successfully");	
		}
	});

})



/**
* It instantiates an object to handle the prompt for nickname
*/
const evNickSetter = new EvClientNickNameSetter();


/** 
* It delegates any message coming from signaling server to
* WssMessageHandler instance.
*/
mainSocket.on("message",(data)=>{
	wssMsgHandler.onMesage(data);
})

/**
* Set some elements of the EvKurentoClient module
*/
evKurentoClient.setSocket(mainSocket);//Add Socket to EvKurentoClient
evKurentoClient.setCltIdentity(cltIdentity);//Add identity to EvKurentoClient
evKurentoClient.setClientsList(evClients);



/*

	Code to run after document is ready

*/
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

	cltCallStatus.setStatus('READY');





	/*
	
		Buttons onclick handlers
	
	*/
	const btnStart = document.querySelector("button[class='controls__start']");
	const btnCall = document.querySelector("button[class='controls__call']");
	const btnStop = document.querySelector("button[class='controls__stop']");
	

	btnStart.addEventListener("click",(e)=>{
		evKurentoClient.startLocal(webRtcPeerOptions,(error,webRtcPeer)=>{
			if (error){
				console.log("- webrtc.js:240");
				console.log(error);
			}
			else{
				console.log("- webrtc.js:244");
				console.log("Success creating WebRTCPeer object...");	
				console.log(webRtcPeer);
				
			}
		});
	});


	btnCall.addEventListener("click",(e)=>{

		let fullStatus = cltCallStatus.getFullStatus();
		if (fullStatus.status != 'READY'){
			alert (fullStatus.msg);
			return false;
		}

		if (calleeId == ''){
			alert("Please choose a user to call");
			return false;
		}

		let callee = evClients.getClientByUID(calleeId);
		if (!callee){
			alert("Not valid user to call");
			return false;
		}


		evKurentoClient.createSdpOffer((error,sdpOffer)=>{
			
			if (error){
				console.log("- webrtc.js:171");
				console.log(error);
			}
			else{
				console.log("- webrtc.js:175");
				console.log("Success creating sdpOffer object...");	
				//console.log(sdpOffer);
				/* It makes the call to callee */
				//evKurentoClient.call(cltIdentity,);
				evKurentoClient.call(callee,sdpOffer,(error)=>{
					if (error.error){
						console.log(`Error!: ${error.msg}`);
					}
					else{
						console.log(`Success!: ${error.msg}`);
					}

				});
			}
		});
	});

	btnStop.addEventListener("click",(e)=>{
		evKurentoClient.stopCall((response)=>{ console.log(response);});
	});
	
});

/*
	Choosing users to call handler
*/
$(".users").on('click',".clientList__client",(e)=>{

	$("ul.clientsList li").removeClass("clientList__client--selected");
	$(e.target).addClass('clientList__client--selected');
	calleeId = $(e.target).attr('data-cltid');
	//console.log(calleeId);
	
})
