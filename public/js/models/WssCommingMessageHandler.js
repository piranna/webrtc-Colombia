import PubSub from 'PubSub';
class WssCommingMessageHandler{
	constructor(socket){
		this.pubsub = new PubSub();
		this.onMesage = this.onMesage.bind(this);
		this.unSubscribeToEvents = this.unSubscribeToEvents.bind(this);
		this.subscribeToEvents = this.subscribeToEvents.bind(this);
		this.socket = socket;
	}
	subscribeToEvents (topic,callback){
		return this.pubsub.subscribe(topic,callback);
	}
	unSubscribeToEvents (reference){
		return this.pubsub.unsubscribe(reference);
	}
	onMesage(data){
		console.log("- WssMessageHandler");
		console.log(data);
		data.socket = this.socket;
		this.pubsub.publish(data.type,data);
	}
}

//module.exports = exports = WssMessageHandler;
export default WssCommingMessageHandler;