class EvKurentoPipeline1On1VideoRecording{
	_pipeline;
	_candidates = {};
	_sdpOffers = {};
	_WebRtcEndPoints = {};

	constructor(evKurentoClient,wss){
		this._evKurentoClient = evKurentoClient;
		this._wss = wss;
	}

	addIceCandidate = (clientId,candidate) => {
		console.log('in addIceCandidate of pipeline file');
		if (!Array.isArray(this._candidates[clientId])){
			_candidates[clientId] = [];
		}
		this._candidates[clientId].push(candidate);
		return true;
	}

	releaseCandidatesPool = (clientId) => {
		delete this._candidates[clientId];
		return true;
	}

	startPipeline = (caller,callee,callback) => {
		let msg = {};
		this._evKurentoClient.createPipeline((error,pl)=>{
			if(error){
				console.log(error);
				return callback(error);
			}

			//console.log(pl);
			//console.log("-------------------------");
			//callback(null,this);
			//return false;
			pl.create("WebRtcEndpoint",(error,callerWebRtcEndPoint)=>{
				if (error){
					console.log(error);
					return callback(error);
				}

				// Gets the icecandidates already saved
				//if (typeof this._candidates[caller.uid] != 'undefined' && typeof this._candidates[caller.uid] == 'Array'){
				if (this._candidates[caller.uid]){
					while(this._candidates[caller.uid].length){
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
						return callback(error);
					}

					console.log("Creating Callee WebRtcEndpoint...");
					//if (typeof this._candidates[callee.uid] != 'undefined' && typeof this._candidates[callee.uid] == 'Array'){
					if (this._candidates[callee.uid]){
						while(this._candidates[callee.uid].length){
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
	setSdpOffers = (sdpOffers) => {
		this._sdpOffers = sdpOffers;
	}

	setIceCandidates = (iceCandidates) => {
		this._candidates = iceCandidates;
	}
	//=====================================================

	releasePipeline = () => {
		if (this._pipeline){
			this._pipeline.release();
		}

		delete this._pipeline;
		return true;
	}

	generateSdpAnswer = (uid,callback) => {
		this._WebRtcEndPoints[uid].processOffer(this._sdpOffers[uid],(error,sdpAnswer)=>{
			console.log(`Generating sdpAnswer for ... ${uid}` );

			if (error){
				console.log(error);
				return callback(error,sdpAnswer);
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


module.exports = EvKurentoPipeline1On1VideoRecording;
