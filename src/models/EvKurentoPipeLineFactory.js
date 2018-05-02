let EvKurentoPipeline1On1VideoRecording = require('./EvKurentoPipeline1On1VideoRecording');

class EvKurentoPipeLineFactory{

	createPipeline(pipelineType,evKurentoClt,wss){

		let pl;

		switch (pipelineType){

			case '1ON1_VIDEO_RECORDING': 
				pl = new EvKurentoPipeline1On1VideoRecording(evKurentoClt,wss);
				return pl;
				break;

			default:
				pl = new EvKurentoPipeline1On1VideoRecording(evKurentoClt,wss);
				return pl;
				break;

		}

	}

}



module.exports = exports = EvKurentoPipeLineFactory;