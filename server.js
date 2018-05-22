#!/usr/bin/env node
'strict mode'
/* Requiring/Importing dependencies */
let minimist = require('minimist');

/* Own modules */
const {httpPort, httpsPort, config: {certs: {cert, key}}} = require('./config.js');
let WebSecureServer = require('./src/models/WebSecureServer');
let WebServer = require('./src/models/WebServer');
let WebSocketsServer = require('./src/models/WebSocketsServer');
let WebRtcSignalingServer = require('./src/models/WebRtcSignalingServer');
let EvKurentoClient = require('./src/modules/EvKurentoClient');
let EvKurentoClientRegistry = require('./src/models/EvKurentoClientRegistry');


/* Getting params from command line */
let argv = minimist(process.argv.slice(2), {
  default: {}
});

/* Params to start servers */
let pathToPublic = __dirname+"/public/";
let httpserver = {};
let port = 12000;
let kurentoClt = null;
let mediaPipeLine = null;


/**
  Starting http server

*/
switch(process.argv[2]){
  case 'https':
    port = config.httpsPort;
    const options = {key, cert}
    httpserver = new WebSecureServer(pathToPublic,port,options);
    break;

  case 'http':
    port = config.httpPort;
    httpserver = new WebServer(pathToPublic,port);
    break;

  default:{
    console.error("No se ha definido un metodo para arrancar el servidor web","Error");
    return "";
  }
}

/** Starting websockets server and WebRTC signaling module */



let wsServer = new WebSocketsServer(httpserver.wserver);
wsServer.startToListenSocketsEvents();

/*
  It starts the Kurento-Client
*/
EvKurentoClient.getKurentoClt((error,kc)=>{

  if (error){
    console.log("Error starting Kurento client...");
    console.log(error);
    return error;
  }
  console.log("Starting Kurento client...");
})


/*

  Starting the signaling server

*/
let webRtcSignalingSrv = new WebRtcSignalingServer(wsServer,EvKurentoClient,new EvKurentoClientRegistry());

/**
  ESP:
  Viculando el administrador de eventos de WebRTC al servidor de sockets mediante el patrón Pub/Sub

  ENG:
  Linking webrtc events handler (signaling) with websocket server, using Pub/Sub pattern.
*/


wsServer.subscribeToEvents('connection',webRtcSignalingSrv.notifyNewConnection);
wsServer.subscribeToEvents('subscribe',(data)=>{
  if (data.msgObj.type == 'joined'){
    let clt = {
      uid:data.uid,
      name: data.name,
      socketid: data.socketid
    }
    webRtcSignalingSrv.registeringClient(clt);
  }
});
wsServer.subscribeToEvents('getallclients',(data)=>{
  console.log(data);
  webRtcSignalingSrv.getAllConnectedClients(data.idsocket);
});
wsServer.subscribeToEvents('disconnect',webRtcSignalingSrv.disconnectSocket);
/* WebRTC with Kurento signaling methods */
wsServer.subscribeToEvents('call',webRtcSignalingSrv.call);
wsServer.subscribeToEvents('callResponse',webRtcSignalingSrv.responseCall);
wsServer.subscribeToEvents('rejectedCall',webRtcSignalingSrv.rejectedCall);
wsServer.subscribeToEvents('hangout',webRtcSignalingSrv.hangOut);
wsServer.subscribeToEvents('icecandidate',webRtcSignalingSrv.onIceCandidate);
