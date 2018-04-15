class EvKurentoClientRegistry{
	
	constructor(){
		this.registry = [];
		this.deleteClient = this.deleteClient.bind(this);
	}

	addClient(clt){
		if (!this.isClientAlreadyRegistered(clt)){
			this.registry.push(clt);
			return true;
		}
		else{
			return false;
		}
	}

	isClientAlreadyRegistered(clt){

		for (let i = 0 ; i < this.registry.length ; i++){

			if (clt.uid == this.registry[i].uid){
				return true;
			}
		}
		return false;
	}

	getClientByUid (uid){
		for (let i = 0 ; i < this.registry.length ; i++){

			if (uid == this.registry[i].uid){
				return this.registry[i];
			}
		}
		return false;
	}

	getClientBySocketId(socketid){

		for (let i = 0 ; i < this.registry.length ; i++){

			if (socketid == this.registry[i].socketid){
				return this.registry[i];
			}
		}
		return false;

	}


	deleteClient(clt){

		let indexToDel = -1;
		for (let i = 0 ; i < this.registry.length ; i++){

			if (clt.uid == this.registry[i].uid){
				indexToDel = i;
			}
		}
		if (indexToDel > -1){
			this.registry.splice(indexToDel, 1);
			return true;
		}
		else{
			return false;
		}
	}


	getRegistryLength(){
		return this.registry.length;
	}

}


module.exports = exports = EvKurentoClientRegistry;