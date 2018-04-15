class EvClientWsJoinedToRoomHandler{

	constructor(){
		this.onJoined = this.onJoined.bind(this);
		this.identity = {};
	}

	onJoined(data){		

		console.log("- EvCltWsJoinedToRoomHandler");
		console.log(data);
	}

}



export default EvClientWsJoinedToRoomHandler;