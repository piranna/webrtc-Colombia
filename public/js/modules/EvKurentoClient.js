/**
* This module handles all functions requiered to implement 
* kurento communitacion in browser client side.
* 
* @param {kurentoUtils} kurentoUtils - this is the Kurento Utils library, repo: github:Kurento/kurento-utils-js 
*/
const evKurentoClient = ((kurentoUtils)=>{

	const _kurentoUtils = kurentoUtils;
	let _webRtcPeer = {};
	let _socket = {};
	let _sdpOffer = {};
	let _clientCallStatus = {};
	let _cltIdentity = {};
	let _clientsList = {};

	function _OnIceCandidate (candidate){

		if (navigator.mozGetUserMedia) {
			console.log("--Firefox");
		}
		else if (navigator.webkitGetUserMedia && window.webkitRTCPeerConnection){
			console.log("--Chrome");
		}
		else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
  			console.log('--Edge');
  		}
  		else{
  			console.log('--Safari');
  		}
		console.log(candidate);
		let msgObj = {
			topic: 'icecandidate',
			info: {
				uid: _cltIdentity.uid,
				candidate: candidate
			}
		}
		_socket.emit("message",msgObj);
	}


	function _startCommunication(sdpAnswer,callback){

		_webRtcPeer.processAnswer(sdpAnswer,(error)=>{
			if (error){
				console.log(error);
				callback(error);
			}
			else
				callback(null);
		});

	}


	function _createSdpOffer (__callback){

			if (typeof _webRtcPeer.constructor.name == 'undefined' || _webRtcPeer.constructor.name != 'WebRtcPeerSendrecv'){
				__callback({error:true,msg:'No WebRTCPeer created'});
				return false;
			}
			_webRtcPeer.generateOffer((error, offerSdp) => {
				if (error) {
					console.error(error);
					__callback({error:true,msg:error});
					return false;
				}
				_sdpOffer = offerSdp;
				console.log(offerSdp);
				__callback(null,offerSdp);
				return offerSdp;
			});
	}


	function _startLocal(_options,_callback){

		_options.onicecandidate = _OnIceCandidate;
		_webRtcPeer = _kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(_options,(error)=>{
			if (error) {
				console.error(error);
				_callback({error:true,msg:error},null);
				return error;
			}
			_callback(null,_webRtcPeer);
		});

	}

	function _clearWebRtcComponents(callback){

		console.log("Releasing webrtc components");
		_webRtcPeer.dispose();
		_webRtcPeer,_sdpOffer = null;
		_clientCallStatus.setStatus("READY");
		callback({error:false,msg:`Webrtc components released`});

	}
	
	return {

		/**
		* It creates a new WbRtcPeer (kurentoUtils.WebRtcPeerSendrecv) ready to 
		* serves as MediaElements and Stream handler
		* 
		* @param {Object} options: 	kurentoUtils.WebRtcPeer options param
		* @param {Function} callback: 	callback function, it receives error object (null if everything goes ok) 
		*								and WebRtcPeer object
		*
		*/
		startLocal:(options,callback)=>{

			_startLocal(options,(error,webRtcPeer)=>{
				callback(error,webRtcPeer);
			})
			
		},
		call:(cltDest,sdpOffer,callback)=>{
			console.log(_clientCallStatus.getStatus());
			if (_clientCallStatus.getStatus() != 'READY'){
				callback({error:true,msg:`${_clientCallStatus.getStatus().getFullStatu().msg}`});
				return false;
			}

			let msgObj = {
				topic: 'call',
				info: {
					callerId: _cltIdentity.uid,
					calleeId: cltDest.uid,
					sdpOffer: sdpOffer,
				}
			}
			_socket.emit("message",msgObj);
			_clientCallStatus.setStatus("BUSY");
			callback({error:false,msg:`Call request has been sent ok to client ${cltDest.name} (identifyed by ${cltDest.uid})`});
		},
		createSdpOffer: (callback)=>{
			_createSdpOffer((error,sdpOffer)=>{
				callback(error,sdpOffer);
			});
		},
		stopCall:(callback)=>{
			_clearWebRtcComponents((response)=>{
				callback(response);
			});
		},
		onIncomingCall: (callerUid,sdpOffer,callback)=>{

			console.log("EvKurentoClient.onIncomingCall");
			let caller = _clientsList.getClientByUID(callerUid);
			let msgObj = {};
			//It checks if the local client is available (READY)
			if (_clientCallStatus.getStatus() != 'READY'){
				msgObj = {
					topic: 'rejectedCall',
					info: {
						calleeId: _cltIdentity.uid,
						callerId: callerUid,
						msg: `Client ${_cltIdentity.name} is ${_clientCallStatus.getStatus()}`,
					}
				}
				_socket.emit("message",msgObj);
				callback({error:true,msg:`An incoming call was rejected`});
				return false;
			}
			// Confirm if user accepts the incoming call
			if (!confirm(`Incoming call from ${caller.name}`)){
				msgObj = {
					topic: 'rejectedCall',
					info: {
						calleeId: _cltIdentity.uid,
						callerId: callerUid,
						msg: `Client ${_cltIdentity.name} has rejected the call`,
					}
				}
				_socket.emit("message",msgObj);
				callback({error:true,msg:`An incoming call was rejected`});
				return false;
			}
			//
			// Set as busy estate
			//
			_clientCallStatus.setStatus("BUSY");

			//
			// Start WebRTC components
			//
			let webRtcPeerOptions = {
				localVideo: document.getElementById('vOwn'),
				remoteVideo: document.getElementById('vForeign'),
			}
			_startLocal(webRtcPeerOptions,(error,webRtcPeer)=>{
				//callback(error,webRtcPeer);
				if (error){
					msgObj = {
						topic: 'rejectedCall',
						info: {
							calleeId: _cltIdentity.uid,
							callerId: callerUid,
							msg: `Call rejected by a technicall issue: ${error.msg}`,
						}
					}
					_clientCallStatus.setStatus("READY");
					_socket.emit("message",msgObj);
					callback({error:true,msg:`An incoming call was rejected`});
					return false;
				}
				//=========================================================
				_createSdpOffer ((error,sdpOffer)=>{
					if (error){
						msgObj = {
							topic: 'rejectedCall',
							info: {
								calleeId: _cltIdentity.uid,
								callerId: callerUid,
								msg: `Call rejected by a technicall issue: ${error.msg}`,
							}
						}
						_clientCallStatus.setStatus("READY");
						_socket.emit("message",msgObj);
						callback({error:true,msg:`An incoming call was rejected`});
						return false;
					}

					msgObj = {
						topic: 'callResponse',
						info: {
							calleeId: _cltIdentity.uid,
							callerId: caller.uid,
							sdpOffer: sdpOffer,
							plType: '1ON1_VIDEO_RECORDING'//This defines the type of kurento pipeline must generate in server side
						}
					}
					_socket.emit("message",msgObj);
					callback({error:false,msg:`Call response has been sent ok to client ${caller.name} (identifyed by ${caller.uid})`});
				});
			})

			
		

		},
		onStopCall:(callback)=>{
			_clearWebRtcComponents((response)=>{
				callback(response);
			})
		},
		onRejectedCall:(data,callback)=>{

			_clearWebRtcComponents((response)=>{
				console.log(response);
			})
			alert(`${data.msg}`);

		},
		onStartCommunication:(sdpAnswer,callback)=>{
			_startCommunication(sdpAnswer,(error)=>{
					if(error){
						callback(error);
						return false;
					}
					callback(null);
			});
		},

		/*
		*
			Setters to some object dependencies
		*
		*/

		/**
		* Setter for local (client) identity
		* @param {models/EvClientIdentity} cltIdentity - 
		*/		
		setCltIdentity: (cltIdentity)=>{
			_cltIdentity = cltIdentity;
		},
		/**
		* Setter for websocket
		* @param {socket.io/socket} socket - socket object instantiated from socket.io (socket-client) library
		*/
		setSocket: (socket)=>{
			_socket = socket;
		},
		/**
		* Setter client calling status
		* @param {models/EvClientCallStatus} clientCallStatus -
		*/
		setClientCallStatus: (clientCallStatus)=>{
			_clientCallStatus = clientCallStatus;
		},
		/**
		* Setter for client list (registered clients)
		* @param {models/EvClients} clientsList -
		*/
		setClientsList: (clientsList)=>{
			_clientsList = clientsList;
		}
	}
	
})(kurentoUtils);

export default evKurentoClient;