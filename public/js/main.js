import $ from 'jquery';
//import io from 'socket.io';


$(document).ready(()=>{

	const constraints = {

		video: true,
		audio: true,

	};

	console.log("MMMM...");
	//console.log(navigator.mediaDevices);

	navigator.mediaDevices.getUserMedia(constraints)
	.then((stream)=>{

		const videoObj = document.getElementById('vOwn');
		videoObj.srcObject = stream;
		//console.log(stream);

	})
	.catch((err)=>{
	  /* handle the error */
	  console.log("Error cargando el stream de datos...");
	  let errCont = document.getElementById("msgContainer");
	  errCont.innerHTML = err;
	});

})
