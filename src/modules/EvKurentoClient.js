let kurento = require('kurento-client');
let config = require('../../config.js');
let EvKurentoClient = ((kurento,config)=>{

	let _kurentoClt = null;
	let _argv = {};
	let _pipeLines = [];
	/**
		Possible values: 
		- 0: No KC created and there is no request to create one.
		- 1: KC created and ready
		- 2: There is a creation KC request but it is not finished yet (waiting).
	*/
	let _ctrlKurentoCltCreation = 0; 


	/*
	kurento.KurentoClient(config.kurento.ws_uri,function(error,kc){
		_kurentoClt = kc;

	});
	*/


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

	/* By default it starts a kurento client object */
	//_getKurentoClt((error,kc)=>{ 
	//	console.log("Creating the Kurento-Client");
	//});




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
			_pipeLines.push(pl);
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
		getPipeLines: ()=>{
			return _pipeLines;
		},
		createPipeline: (callback)=>{
			_createPipeLine(callback)
		},
		getPipelineByIndex: (index)=>{

			if (typeof _pipeLines[index] != 'undefined' && _pipeLines[index]!=null && (_pipeLines[index].constructor.name == 'MediaPipeline')){
				return _pipeLines[index];
			}
			else{
				return null;
			}
		},
		createMediaElement: (pl,medEleType,options,callback)=>{
			_createMediaElement(pl,medEleType,options,callback);
		}
	}


})(kurento,config);


module.exports = exports = EvKurentoClient;