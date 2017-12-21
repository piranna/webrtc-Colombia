import WebServer from './models/WebServer';


let pathToPublic = __dirname+"/public/";
let httpserver = new WebServer(pathToPublic,6000);
