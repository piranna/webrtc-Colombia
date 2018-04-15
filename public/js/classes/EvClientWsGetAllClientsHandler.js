class EvClientWsGetAllClientsHandler{

	/**
	* Constructor methos
	* @param {EvClientDrawer} drawer - Object that renders in the html the list of clients
	*/
	constructor(drawer){
		this.onGetAllClients = this.onGetAllClients.bind(this);
		this.drawer = drawer;
	}

	/**
	*
	* This method handles the coming messages from signaling server when it sends the 
	* list of the all clients subscribed to it.
	*
	* @param {EvClients} evClients
	*/

	onGetAllClients(evClients){		
		console.log("- onGetAllClients");
		this.drawer.drawHtmlClients(evClients);
		
	}
}



export default EvClientWsGetAllClientsHandler;
