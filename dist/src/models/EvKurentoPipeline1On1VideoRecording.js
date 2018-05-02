'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EvKurentoPipeline1On1VideoRecording = function () {
	function EvKurentoPipeline1On1VideoRecording(evKurentoClient, wss) {
		_classCallCheck(this, EvKurentoPipeline1On1VideoRecording);

		this._pipeline = {};
		this._candidates = {};
		this._sdpOffers = {};
		this._evKurentoClient = evKurentoClient;
		this._wss = wss;
		this._WebRtcEndPoints = {};

		this.addIceCandidate = this.addIceCandidate.bind(this);
		this.releaseCandidatesPool = this.releaseCandidatesPool.bind(this);
	}

	_createClass(EvKurentoPipeline1On1VideoRecording, [{
		key: 'addIceCandidate',
		value: function addIceCandidate(clientId, candidate) {
			if (typeof this._candidates[clientId] == 'undefined' || this._candidates[clientId] == null || this._candidates[clientId].constructor.name != 'Array') {
				_candidates[clientId] = [];
			}
			this._candidates[clientId].push(candidate);
			return true;
		}
	}, {
		key: 'releaseCandidatesPool',
		value: function releaseCandidatesPool(clientId) {
			this._candidates[clientId] = null;
			Reflect.deleteProperty(this._candidates, clientId);
			delete this._candidates[clientId];
			return true;
		}
	}, {
		key: 'startPipeline',
		value: function startPipeline(caller, callee, callback) {
			var _this = this;

			this._evKurentoClient.createPipeline(function (error, pl) {

				if (error) {
					console.log(error);
					callback(error);
					return false;
				}

				//console.log(pl);
				//console.log("-------------------------");
				//callback(null,this);
				//return false;

				pl.create("WebRtcEndpoint", function (error, callerWebRtcEndPoint) {

					if (error) {
						console.log(error);
						callback(error);
						return false;
					}
					// Gets the icecandidates already saved
					if (typeof _this._candidates[caller.uid] != 'undefined' && typeof _this._candidates[caller.uid] == 'Array') {
						while (_this._candidates[caller.uid].length) {
							var candidate = _this._candidates[caller.uid].shift();
							callerWebRtcEndPoint.addIceCandidate(candidate);
						}
					}
					// Defines a event handler for OnIceCandidate
					callerWebRtcEndPoint.on("OnIceCandidate", function (event) {
						var candidate = evKurentoClient.kurentolib.getComplexType('IceCandidate')(event.candidate);
						msgObj = {
							type: 'icecandidate',
							code: 200,
							msg: error,
							candidate: candidate
						};
						_this._wss.emmitMessageToSingleSocket('message', msgObj, caller.socketid);
					});

					pl.create("WebRtcEndpoint", function (error, calleeWebRtcEndPoint) {
						if (error) {
							console.log(error);
							callback(error);
							return false;
						}
						if (typeof _this._candidates[callee.uid] != 'undefined' && typeof _this._candidates[callee.uid] == 'Array') {
							while (_this._candidates[callee.uid].length) {
								var _candidate = _this._candidates[callee.uid].shift();
								calleeWebRtcEndPoint.addIceCandidate(_candidate);
							}
						}
						// Defines a event handler for OnIceCandidate
						calleeWebRtcEndPoint.on("OnIceCandidate", function (event) {
							var candidate = evKurentoClient.kurentolib.getComplexType('IceCandidate')(event.candidate);
							msgObj = {
								type: 'icecandidate',
								code: 200,
								msg: error,
								candidate: candidate
							};
							_this._wss.emmitMessageToSingleSocket('message', msgObj, callee.socketid);
						});
						//Connects the endpoints
						callerWebRtcEndPoint.connect(calleeWebRtcEndPoint, function (error) {
							if (error) {
								pl.release();
								return callback(error);
							}

							calleeWebRtcEndPoint.connect(callerWebRtcEndPoint, function (error) {
								if (error) {
									pl.release();
									return callback(error);
								}
							});

							_this._pipeline = pl;
							_this._WebRtcEndPoints[callee.uid] = calleeWebRtcEndPoint;
							_this._WebRtcEndPoints[caller.uid] = callerWebRtcEndPoint;
							callback(null, _this);
						});
					});
				});
			});
		}

		//=====================================================

	}, {
		key: 'setSdpOffers',
		value: function setSdpOffers(sdpOffers) {
			this._sdpOffers = sdpOffers;
		}
	}, {
		key: 'setIceCandidates',
		value: function setIceCandidates(iceCandidates) {
			this._candidates = iceCandidates;
		}
	}]);

	return EvKurentoPipeline1On1VideoRecording;
}();

module.exports = exports = EvKurentoPipeline1On1VideoRecording;