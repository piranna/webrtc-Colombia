/* Requiring/Importing dependencies */
let WebSecureServer = require('./src/models/WebSecureServer');
let WebServer = require('./src/models/WebServer');
let WebSocketsServer = require('./src/models/WebSocketsServer');

/* Params to start servers */
let pathToPublic = __dirname+"/public/";
let httpserver = {};
let port = 12000;

if(process.argv[2] && typeof process.argv[2] === 'string'){

	switch(process.argv[2]){
		case 'https':
			port = 12000;
			httpserver = new WebSecureServer(pathToPublic,port);
		break;

		case 'http':
			port = 12000;
			httpserver = new WebServer(pathToPublic,port);
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
