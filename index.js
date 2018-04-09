'strict mode'
/* Requiring/Importing dependencies */
let minimist = require('minimist');

/* Own modules */
let config = require('./config.js');
let WebSecureServer = require('./src/models/WebSecureServer');
let WebServer = require('./src/models/WebServer');
let WebSocketsServer = require('./src/models/WebSocketsServer');
let WebRtcSignalingServer = require('./src/models/WebRtcSignalingServer');
let EvKurentoClient = require('./src/modules/EvKurentoClient');
let EvKurentoClientRegistry = require('./src/models/EvKurentoClientRegistry');


/* Getting params from command line */
let argv = minimist(process.argv.slice(2), {
  default: {
      as_uri: "https://kms2.sientifica.com:8443/",
      ws_uri: "wss://kms2.sientifica.com:8433/kurento"
  }
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
if(process.argv[2] && typeof process.argv[2] === 'string'){

  switch(process.argv[2]){
    case 'https':
      port = config.httpsPort;
      const options = {
        key:config.certs.key,
        cert:config.certs.cert
      } 
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

}else{
  console.error("No se ha definido un metodo para arrancar el servidor web","Error");
  return "";
}

/** Starting websockets server and WebRTC signaling module */



let wsServer = new WebSocketsServer(httpserver.wserver);
wsServer.startToListenSocketsEvents();
EvKurentoClient.getKurentoClt((error,kc)=>{

  if (error){
    console.log("Error starting Kurento client...");
    console.log(error);
    return error;
  }
  console.log("Starting Kurento client...");
})


let webRtcSignalingSrv = new WebRtcSignalingServer(wsServer,EvKurentoClient,new EvKurentoClientRegistry());

/**
  ESP: 
  Viculando el administrador de eventos de WebRTC al servidor de sockets mediante el patrón Pub/Sub 

  ENG: 
  Linking webrtc events handler (signaling) with websocket server, using Pub/Sub pattern.
*/




wsServer.subscribeToEvents('ipaddr',webRtcSignalingSrv.dispatchIpAddr);
wsServer.subscribeToEvents('getallclients',webRtcSignalingSrv.getAllConnectedUsers);
wsServer.subscribeToEvents('connection',webRtcSignalingSrv.notifyNewConnection);

/* WebRTC with Kurento signaling methods */
wsServer.subscribeToEvents('call',webRtcSignalingSrv.call);
wsServer.subscribeToEvents('responsecall',webRtcSignalingSrv.responseCall);
wsServer.subscribeToEvents('hangout',webRtcSignalingSrv.hangOut);
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
//wsServer.subscribeToEvents('ipaddr',webRtcSignalingSrv.dispatchIpAddr);








