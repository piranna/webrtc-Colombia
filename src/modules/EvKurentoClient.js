let kurento = require('kurento-client');
let config = require('../../config.js');
let EvKurentoClient = ((kurento,config)=>{

	let _kurentoClt = null;
	let _argv = {};
	let _kurento = kurento;
	
	/**
		Possible values: 
		- 0: No KC created and there is no request to create one.
		- 1: KC created and ready
		- 2: There is a creation KC request but it is not finished yet (waiting).
	*/
	let _ctrlKurentoCltCreation = 0; 



	function _getKurentoClt(callback){

		_ctrlKurentoCltCreation = 2;
		kurento.KurentoClient(config.kurento.ws_uri,function(error,kc){

			if (error){
				console.log(error);
				_ctrlKurentoCltCreation = 0;
				callback(error);
				return error;
			}
			_ctrlKurentoCltCreation = 1;
			_kurentoClt = kc;
			callback(null,kc);
			return kc;

		});		

	}


	function _createPipeLine(callback){

		if (_kurentoClt === null){
			callback({error: true, msg: "No Kurento Client created"});
			return false;
		}
		_kurentoClt.create("MediaPipeline",(error,pl)=>{
			if (error){
				console.log(error);
				callback(error);
				return error;
			}
			callback(null,pl);
		})

	}

	function _createMediaElement(pl,medEleType,options,callback){
		if (typeof options != 'Function' && options != null && options != ''){
			pl.create(medEleType,options,(error,me)=>{
				if (error){
					console.log("Error creating Media Element");
					callback(error);
					return error;
				}
				callback(null,me);
			});
		}
		else if (typeof options == 'Function'){
			pl.create(medEleType,(error,me)=>{
				if (error){
					console.log("Error creating Media Element");
					callback(error);
					return error;
				}
				callback(null,me);
			});
		}
		else{
			pl.create(medEleType,(error,me)=>{
				if (error){
					console.log("Error creating Media Element");
					callback(error);
					return error;
				}
				callback(null,me);
			});
		}
	}


	return {
		getKurentoClt : (callback)=>{

			if (_ctrlKurentoCltCreation == 2){

				callback({error: true,msg: "There is a kurento client creation request on hold..."},null);
				return ({error: true,msg: "There is a kurento client creation request on hold..."});

			}

			if (_kurentoClt != null && _ctrlKurentoCltCreation==1){
				callback(null,_kurentoClt);
				return _kurentoClt;
			}
			else{
				_getKurentoClt(callback);
				return ({error: false,msg: "Creating a kurento client is on working, please wait for callback function execution..."})
			}
		},
		createPipeline: (callback)=>{
			_createPipeLine((error,pl)=>{
				callback(error,pl);
			})
		},
		createMediaElement: (pl,medEleType,options,callback)=>{
			_createMediaElement(pl,medEleType,options,(error,me)=>{
				callback(error,me);
			});
		},
		kurentolib: _kurento
	}


})(kurento,config);


module.exports = exports = EvKurentoClient;