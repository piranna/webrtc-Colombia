class EvClients{

	constructor(){
		this.clients = [];
		this.addClient = this.addClient.bind(this);
		this.getClientByUID = this.getClientByUID.bind(this);
		this.removeClient = this.removeClient.bind(this);
	}

	addClient(clt){
		this.clients.push(clt);
	}
	getClientByUID(uid){
		for (let i = 0; i < this.clients.length ; i++){
			if (this.clients[i].uid == uid){
				return this.clients[i];
			}
		}
		return false;
	}
	removeClient(clt){
		for (let i = 0; i < this.clients.length ; i++){
			if (this.clients[i].uid == clt.uid){
				this.clients[i] = null;
				return true;
			}
		}
		return false;
	}
}


export default EvClients;