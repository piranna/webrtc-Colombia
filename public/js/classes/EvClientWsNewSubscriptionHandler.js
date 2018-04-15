class EvClientWsNewSubscriptionHandler{

	constructor(){
		this.onNewSubscription = this.onNewSubscription.bind(this);
	}

	/**
	*
	* This method handles comming messages from signaling server when a new
	* client has been suscribed to clients list (in signaling server)
	*
	* @param {object} data - Data object must have data.uid, data.name, data.socketid
	*
	*/

	onNewSubscription(data,localSocket){		
		console.log("- onNewSubscription");
		localSocket.emit('message',{
			topic: 'getallclients',
			info:{
				idsocket:localSocket.id
			}
		});
	}
}



export default EvClientWsNewSubscriptionHandler;
