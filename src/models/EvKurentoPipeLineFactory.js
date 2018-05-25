let EvKurentoPipeline1On1VideoRecording = require('./EvKurentoPipeline1On1VideoRecording');
let EvKurentoPipeline1On1Video = require('./EvKurentoPipeline1On1Video');

class EvKurentoPipeLineFactory{

	createPipeline(pipelineType,evKurentoClt,wss){

		let pl;

		switch (pipelineType){

			case '1ON1_VIDEO': 
				pl = new EvKurentoPipeline1On1Video(evKurentoClt,wss);
				return pl;
				break;

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