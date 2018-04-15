class EvClientWsNewConnectionHandler{

	constructor(){
		this.onNewConnection = this.onNewConnection.bind(this);
		this.identity = {};
	}

	onNewConnection(data){		

		console.log("- onNewConnection");
		console.log(data);
	}

}



export default EvClientWsNewConnectionHandler;