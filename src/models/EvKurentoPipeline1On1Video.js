class EvKurentoPipeline1On1Video{

	constructor(evKurentoClient,wss){
		this._pipeline = {};
		this._candidates = {};
		this._sdpOffers = {};
		this._evKurentoClient = evKurentoClient;
		this._wss = wss;
		this._WebRtcEndPoints = {};
		this.caller = {};
		this.callee = {};		

		this.addIceCandidate = this.addIceCandidate.bind(this);
		this.releaseCandidatesPool = this.releaseCandidatesPool.bind(this);
		this.generateSdpAnswer = this.generateSdpAnswer.bind(this);
		this.startPipeline = this.startPipeline.bind(this);
		this.generateSdpAnswer = this.generateSdpAnswer.bind(this);
		this.releasePipeline = this.releasePipeline.bind(this);
		this.setIceCandidates = this.setIceCandidates.bind(this);
		this.setSdpOffers = this.setSdpOffers.bind(this);
	}

	setCaller(caller){
		this.caller = caller;
	}
	setCallee(callee){
		this.callee = callee;
	}
	getUsers(){
		return {
			caller: this.caller,
			callee: this.callee
		}
	}
	addIceCandidate(clientId,candidate){
		console.log('in addIceCandidate of pipeline file');
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
	startPipeline(callback){
		let msg = {};
		let caller = this.caller;
		let callee = this.callee;
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
				//if (typeof this._candidates[caller.uid] != 'undefined' && typeof this._candidates[caller.uid] == 'Array'){
				if (this._candidates[caller.uid]){	
					while(this._candidates[caller.uid].length > 0){
						console.log('in while loop adding candidates for ' + caller.uid);
						let candidate = this._candidates[caller.uid].shift();
						callerWebRtcEndPoint.addIceCandidate(candidate);
					}
				}
				// Defines a event handler for OnIceCandidate
				console.log("Creating Caller WebRtcEndpoint...");
				callerWebRtcEndPoint.on("OnIceCandidate",(event)=>{
					console.log(`A new ICE Candidate for caller has arrived, sending it out to ${caller.uid}`);
					console.log(event.candidate);
					console.log("--------------");
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
					console.log("Creating Callee WebRtcEndpoint...");
					//if (typeof this._candidates[callee.uid] != 'undefined' && typeof this._candidates[callee.uid] == 'Array'){
					if (this._candidates[callee.uid]){	
						while(this._candidates[callee.uid].length > 0){
							let candidate = this._candidates[callee.uid].shift();
							console.log('in while loop adding candidates for ' + callee.uid);
							calleeWebRtcEndPoint.addIceCandidate(candidate);
						}
					}
					// Defines a event handler for OnIceCandidate
					calleeWebRtcEndPoint.on("OnIceCandidate",(event)=>{
						console.log(`A new ICE Candidate for callee has arrived, sending it out to ${callee.uid}`);
						console.log(event.candidate);
						console.log("--------------");
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
			console.log(`Generating sdpAnswer for ... ${uid}` );
			
			if (error){
				console.log(error);
				callback(error,sdpAnswer);
				return false;
			}
			callback (null,sdpAnswer);
			// this._WebRtcEndPoints[uid].gatherCandidates((error)=>{
			// 	console.log(`GatherCandidates for ${uid}...`);
			// 	if (error) {
			// 		console.log(`Error gathering ICE Candidates for ${uid}`)
			// 		console.log(error);
			// 	}
			// });
		});
		this._WebRtcEndPoints[uid].gatherCandidates((error)=>{
			console.log(`GatherCandidates for ${uid}...`);
	        if (error) {
	        	console.log(`Error gathering ICE Candidates for ${uid}`)
	        	console.log(error);
	        }
		});

		
	}
}
module.exports = exports = EvKurentoPipeline1On1Video;
