import PubSub from 'PubSub';
/**
* This class stores the calling status of the client
* Possible status:
*
* - READY: Avalable to accept or to make a new call
* - BUSY: The client is in an active call
* - NOTREADY: The client is not in an active call, but it is not able to join to a new one.
*/

class EvClientCallStatus{

	constructor(){
		this.pubsub = new PubSub();
		this.setStatus = this.setStatus.bind(this);
		this.getStatus = this.getStatus.bind(this);
		this.unSubscribeToStatusOnChange = this.unSubscribeToStatusOnChange.bind(this);
		this.subscribeToStatusOnChange = this.subscribeToStatusOnChange.bind(this);
		this.status = 'NOTREADY';
	}
	unSubscribeToStatusOnChange(reference){
		return this.pubsub.unsubscribe(reference);
	}
	subscribeToStatusOnChange(callback){
		return this.pubsub.subscribe('onchange',callback);
	}
	setStatus(status){
		console.log(`Changing from ${this.status} to ${status}`);
		if (!(status== 'READY' || status== 'NOTREADY' || status== 'BUSY')){
			console.log("EvClientCallStatus:30");
			return false;
		}
		if (this.status == status){
			console.log("EvClientCallStatus:34");
			return false;
		}
		this.status = status;
		this.pubsub.publish('onchange',this.status);
		return this.status;
	}
	getStatus(){
		return this.status;
	}
	getFullStatus(){
		switch(this.status){

			case 'READY': return {status:'READY',msg:'Client ready'};
							break;
			case 'NOTREADY': return {status:'NOTREADY',msg:'Client not ready'};
							break;
			case 'BUSY': return {status:'BUSY',msg:'Client is already in a call'};
							break;
		}
	}
}


export default EvClientCallStatus;