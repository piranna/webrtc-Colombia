import $ from 'jquery';

class LocalMediaStreamManager {
	
	constructor(){

		this.localMediaStream = {};
		this.localVideo = document.querySelector('#localVideo');
		navigator.mediaDevices.getUserMedia({
  			audio: false,
  			video: true
		}).then((stream)=>{

			this.localMediaStream = stream;
			//localVideo.src = window.URL.createObjectURL(stream);
			
		}).catch((e) => {
  			alert('getUserMedia() error: ' + e.name);
		});

	}

}

export default LocalMediaStreamManager;