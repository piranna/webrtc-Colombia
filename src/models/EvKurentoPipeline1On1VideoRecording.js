class EvKurentoPipeline1On1VideoRecording{

	constructor(evKurentoClient,wss){
		this._pipeline = {};
		this._candidates = {};
		this._sdpOffers = {};
		this._evKurentoClient = evKurentoClient;
		this._wss = wss;
		this._WebRtcEndPoints = {};

		this.addIceCandidate = this.addIceCandidate.bind(this);
		this.releaseCandidatesPool = this.releaseCandidatesPool.bind(this);
		this.generateSdpAnswer = this.generateSdpAnswer.bind(this);
	}
	addIceCandidate(clientId,candidate){
		if (typeof this._candidates[clientId] == 'undefined' || this._candidates[clientId] == null || this._candidates[clientId].constructor.name != 'Array'){
			_candidates[clientId] = [];
		}
		this._candidates[clientId].push(candidate);
		return true;
	}
	releaseCandidatesPool(clientId){
		this._candidates[clientId] = null;
		Reflect.deleteProperty(this._candidates,clientId);
		delete this._candidates[clientId];
		return true;
	}
	startPipeline(caller,callee,callback){
		let msg = {};
		this._evKurentoClient.createPipeline((error,pl)=>{
			if(error){
				console.log(error);
				callback(error);
				return false;
			}
			//console.log(pl);
			//console.log("-------------------------");
			//callback(null,this);
			//return false;
			pl.create("WebRtcEndpoint",(error,callerWebRtcEndPoint)=>{
				if (error){
					console.log(error);
					callback(error);
					return false;
				}
				// Gets the icecandidates already saved
				if (typeof this._candidates[caller.uid] != 'undefined' && typeof this._candidates[caller.uid] == 'Array'){
					while(this._candidates[caller.uid].length){
						let candidate = this._candidates[caller.uid].shift();
						callerWebRtcEndPoint.addIceCandidate(candidate);
					}
				}
				// Defines a event handler for OnIceCandidate
				callerWebRtcEndPoint.on("OnIceCandidate",(event)=>{
					let candidate = this._evKurentoClient.kurentolib.getComplexType('IceCandidate')(event.candidate);
					let msgObj = {
						type: 'icecandidate',
						code: 200,
						msg: error,
						candidate:candidate
					}
					this._wss.emmitMessageToSingleSocket ('message',msgObj,caller.socketid);

				});
				pl.create("WebRtcEndpoint",(error,calleeWebRtcEndPoint)=>{
					if (error){
						console.log(error);
						callback(error);
						return false;
					}
					if (typeof this._candidates[callee.uid] != 'undefined' && typeof this._candidates[callee.uid] == 'Array'){
						while(this._candidates[callee.uid].length){
							let candidate = this._candidates[callee.uid].shift();
							calleeWebRtcEndPoint.addIceCandidate(candidate);
						}
					}
					// Defines a event handler for OnIceCandidate
					calleeWebRtcEndPoint.on("OnIceCandidate",(event)=>{
						let candidate = this._evKurentoClient.kurentolib.getComplexType('IceCandidate')(event.candidate);
						let msgObj = {
							type: 'icecandidate',
							code: 200,
							msg: error,
							candidate:candidate
						}
						this._wss.emmitMessageToSingleSocket ('message',msgObj,callee.socketid);

					});
					//Connects the endpoints
					callerWebRtcEndPoint.connect(calleeWebRtcEndPoint,(error)=>{
                        if (error) {
                            pl.release();
                            return callback(error);
                        }

                        calleeWebRtcEndPoint.connect(callerWebRtcEndPoint,(error)=>{
                            if (error) {
                                pl.release();
                                return callback(error);
                            }
                        });

                        this._pipeline = pl;
                        this._WebRtcEndPoints[callee.uid] = calleeWebRtcEndPoint;
                        this._WebRtcEndPoints[caller.uid] = callerWebRtcEndPoint;
                        callback(null,this);
                    });
				});

			});

		});
	}
	//=====================================================
	setSdpOffers(sdpOffers){
		this._sdpOffers = sdpOffers;
	}
	setIceCandidates(iceCandidates){
		this._candidates = iceCandidates;
	}
	//=====================================================
	releasePipeline(){
		if (typeof this._pipeline != 'undefined' && this._pipeline.constructor.name == 'MediaPipeline'){
			this._pipeline.release();
		}
		this._pipeline = {};
		return true;
	}

	generateSdpAnswer(uid,callback){
		this._WebRtcEndPoints[uid].processOffer(this._sdpOffers[uid],(error,sdpAnswer)=>{
			console.log("sdpAnswer...");
			callback(error,sdpAnswer);
		});
    	this._WebRtcEndPoints[uid].gatherCandidates((error)=>{
    		console.log("GatherCandidates...");
	        if (error) {
	        	console.log(error);
	            return callback(error);
	        }
    	});

	}
}
module.exports = exports = EvKurentoPipeline1On1VideoRecording;