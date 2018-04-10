import PubSub from 'PubSub';

class WssMessageHandler{

	constructor(){
		this.pubsub = new PubSub();
		this.onMesage = this.onMesage.bind(this);
		this.unSubscribeToEvents = this.unSubscribeToEvents.bind(this);
		this.subscribeToEvents = this.subscribeToEvents.bind(this);
	}

	subscribeToEvents (topic,callback){
		return this.pubsub.subscribe(topic,callback);
	}

	unSubscribeToEvents (reference){
		return this.pubsub.unsubscribe(reference);
	}

	onMesage(data){

		this.pubsub.publish(data.topic,data);

	}

}
//module.exports = exports = WssMessageHandler;
export default WssMessageHandler;