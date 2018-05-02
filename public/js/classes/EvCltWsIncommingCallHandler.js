class EvCltWsIncommingCallHandler{

	constructor(){
	}

	/**
	* This must be fire when an incomingcall request arrives
	* from signaling server.
	*
	* @param {String} callerUid - The universal identifier of the client's caller 
	* @param {SdpOffer} sdpOffer - The sdp offer object from caller client (WebRTC)
	* @param {modules/EvKurentoClient} evKurentoClt - EV Kurento Client module
	*/
	onIncomingCall(callerUid,sdpfOffer,evKurentoClt){

		

	}

}


export default EvCltWsIncommingCallHandler;