class EvKurentoClientRegistry{
	
	constructor(){
		this.registry = [];
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


	getRegistryLength(){
		return this.registry.length;
	}

}


module.exports = exports = EvKurentoClientRegistry;