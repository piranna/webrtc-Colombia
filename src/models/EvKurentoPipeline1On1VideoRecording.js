
//const RECORDING_PATH = "file:///tmp/"
//const RECORDING_PATH = "file:///Users/macuser/Desktop/videos/";
const RECORDING_PATH = "file:///home/sientifica/videos/";
const RECORDING_EXT = ".ogg";


class EvKurentoPipeline1On1VideoRecording{
	

	constructor(evKurentoClient,wss){
		this._evKurentoClient = evKurentoClient;
		this._wss = wss;
		this._pipeline = {};
		this._candidates = {};
		this._sdpOffers = {};
		this._WebRtcEndPoints = {};
		this._recorder = {};
		this.caller = {};
		this.callee = {};


		this.addIceCandidate = this.addIceCandidate.bind(this);
		this.releaseCandidatesPool = this.releaseCandidatesPool.bind(this);
		this.startPipeline = this.startPipeline.bind(this);
		this.setSdpOffers = this.setSdpOffers.bind(this);
		this.setIceCandidates = this.setIceCandidates.bind(this);
		this.releasePipeline = this.releasePipeline.bind(this);
		this.generateSdpAnswer = this.generateSdpAnswer.bind(this);

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

	addIceCandidate (clientId,candidate){
		console.log('in addIceCandidate of pipeline file');
		if (!Array.isArray(this._candidates[clientId])){
			_candidates[clientId] = [];
		}
		this._candidates[clientId].push(candidate);
		return true;
	}

	releaseCandidatesPool(clientId){
		delete this._candidates[clientId];
		return true;
	}

	startPipeline (callback){
		let caller = this.caller;
		let callee = this.callee;

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
						candidate
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
							candidate
						}
						this._wss.emmitMessageToSingleSocket ('message',msgObj,callee.socketid);
					});


					//Creating composite hub
					pl.create("Composite",(error,composite)=>{

						if (error) {
							pl.release();
							return callback(error);
						}

						//Creating a HubPort for Caller Stream
						composite.createHubPort((error,callerHubPort)=>{

							if (error) {
								pl.release();
								return callback(error);
							}

							//Creating a HubPort for Callee Stream
							composite.createHubPort((error,calleeHubPort)=>{

								if (error) {
									pl.release();
									return callback(error);
								}


								//Creating a RecorderEndpoint to record mixed audio/video from caller and callee
								//pl.create("RecorderEndpoint",{uri:`${RECORDING_PATH}caller${RECORDING_EXT}`},(error,recorder)=>{
								let fileName = `${Date.now()}-${this.caller.uid}-${this.callee.uid}`;
								pl.create("RecorderEndpoint",{uri:`${RECORDING_PATH}${fileName}${RECORDING_EXT}`},(error,recorder)=>{									
									if (error) {
										pl.release();
										return callback(error);
									}

									//Creating a HubPort for RecorderEnpoint
									composite.createHubPort((error,recorderHubPort)=>{
										
										//It connects callerWebRtcEndpoint to calleeWebRtcEndpoint
										callerWebRtcEndPoint.connect(calleeWebRtcEndPoint,(error)=>{
											if (error) {
												pl.release();
												return callback(error);
											}

											//It connects callerWebRtcEndpoint to its hubport
											callerWebRtcEndPoint.connect(callerHubPort,(error)=>{

												if (error){
													pl.release();
													return callback(error);
												}

												//It connects calleeWebRtcEndpoint to callerWebRtcEndpoint
												calleeWebRtcEndPoint.connect(callerWebRtcEndPoint,(error)=>{
													if (error) {
														pl.release();
														return callback(error);
													}
													//It connects calleeWebRtcEndpoint to its hubport
													calleeWebRtcEndPoint.connect(calleeHubPort,(error)=>{

														//It connects recorderHubPort output to recorderEndpoint to record the video
														recorderHubPort.connect(recorder,(error)=>{
															recorder.record();
															this._pipeline = pl;
															this._WebRtcEndPoints[callee.uid] = calleeWebRtcEndPoint;
															this._WebRtcEndPoints[caller.uid] = callerWebRtcEndPoint;
															this._recorder = recorder;
															callback(null,this);
														});
													});
												});
											})
											
										});

									})
								})
							});					

						})
					});

						

					/*
					pl.create("RecorderEndpoint", `${RECORDING_PATH}caller${RECORDING_EXT}`,(error, callerRecorder)=>{
						if (error){
							console.log(error);
							return callback(error);
						}

						pl.create("RecorderEndpoint",`${RECORDING_PATH}callee${RECORDING_EXT}`,(error, calleeRecorder)=>{
							if (error){
								console.log(error);
								return callback(error);
							}

							//Connects the endpoints
							callerWebRtcEndPoint.connect(calleeWebRtcEndPoint,(error)=>{
								if (error) {
									pl.release();
									return callback(error);
								}

								callerWebRtcEndPoint.connect(callerRecorder, "AUDIO", (error)=>{
									if (error) {
										pl.release();
										return callback(error);
									}

									calleeWebRtcEndPoint.connect(callerWebRtcEndPoint,(error)=>{
										if (error) {
											pl.release();
											return callback(error);
										}

										calleeWebRtcEndPoint.connect(calleeRecorder, "AUDIO", (error)=>{
											if (error) {
												pl.release();
												return callback(error);
											}

											callerRecorder.record();
											calleeRecorder.record();

											this._pipeline = pl;
											this._WebRtcEndPoints[callee.uid] = calleeWebRtcEndPoint;
											this._WebRtcEndPoints[caller.uid] = callerWebRtcEndPoint;

											callback(null,this);
										});
									});
								});
							});
						})
					})
					*/
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

		this._recorder.stopAndWait();
		if (this._pipeline){
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