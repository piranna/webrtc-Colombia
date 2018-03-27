'strict mode'
/* Requiring/Importing dependencies */
let kurento = require('kurento-client');
let minimist = require('minimist');

/* Own modules */
let WebSecureServer = require('./src/models/WebSecureServer');
let WebServer = require('./src/models/WebServer');
let WebSocketsServer = require('./src/models/WebSocketsServer');
let WebRtcSignalingServer = require('./src/models/WebRtcSignalingServer');
let config = require('./config.js');

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

/* Starting servers */

let wsServer = new WebSocketsServer(httpserver.wserver);
wsServer.startToListenSocketsEvents();
let webRtcSignalingSrv = new WebRtcSignalingServer(wsServer);

/* Viculando el administrador de eventos de WebRTC al servidor de sockets mediante el patrón Pub/Sub */
wsServer.subscribeToEvents('ipaddr',webRtcSignalingSrv.dispatchIpAddr);
wsServer.subscribeToEvents('getallclients',webRtcSignalingSrv.getAllConnectedUsers);
wsServer.subscribeToEvents('connection',webRtcSignalingSrv.notifyNewConnection);
//wsServer.subscribeToEvents('ipaddr',webRtcSignalingSrv.dispatchIpAddr);








/*
  Genera el cliente de kurento que se conecta al servidor 
  Retorna una promesa que en caso de ser exitosa recibirá el objeto Kurento-Cliente 

  @author: @maomuriel
  @return: {Promise} La función que se ejecuta cuando se resuelve la promesa recibe el objeto kurento-cliente

*/



  kc = kurento.KurentoClient(argv.ws_uri);

  kc.then(function(kclient){
  // Connection success
    //return 
    kurentoClt = kclient;
    //console.log(kurentoClt);
    kurentoClt.create("MediaPipeline",(error,pl)=>{

        console.log(pl);
        mediaPipeLine = pl;
        /*
        mediaPipeLine.create("WebRtcEndPoint",function(error,me){
          if (error){
            console.log(error);
          }
          console.log(me);
        });
        */
    })
  },
  function(error){
  // Connection error
    console.log(error);
    return error;
  });
    //console.log("Desde 105...");
    //console.log(ret);



/*
let promise1 = {};
promise1 = getKurentoClient();

promise1.then((kc)=>{

  console.log("WWWWWWWWWWW...");
  kurentoClient = kc;
  kurentoClient.create('MediaPipeLine',(error,pl)=>{
    if (error){
      console.log("Error generando el pipeline");
    }
    console.log(pl);
  });
  main();
},(error)=>{
  console.log("ZZZZZZZZZZZ...");
  console.log(error)
});


function main(){
  console.log("Desde main()");
  console.log(kurentoClient);
}
*/

let intervalController = setInterval(setIntervalFunction,1000);



function setIntervalFunction(){

  if (mediaPipeLine){
    console.log("MediaPipeline is redy");
    //mediaPipeLine.      

    console.log(kurentoClt);
    console.log(mediaPipeLine);
    mediaPipeLine.create("WebRtcEndpoint",function(error,ep){

      console.log(ep);

    });
    /*
    //This line of code doesn't work 
    kurentoClt.create('MediaPipeLine',(error,pl2)=>{

      console.log("Se genera un segundo pipeline...")
      console.log(pl2);
      

    });
    */
    clearInterval(intervalController);
  }
  else{
    console.log("MediaPipeLine is not ready...");
    console.log(kurentoClt);
  }
}









