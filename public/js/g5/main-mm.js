'use strict';
import SignalingComponent from './classes/SignalingComponent';
import LocalMediaStreamManager from './classes/LocalMediaStreamManager';


let signaling = new SignalingComponent("https://192.168.1.7:12000");
let localStreamManager = new LocalMediaStreamManager();

/* DOM ELEMENTS */
let localVideo = {} ;//document.querySelector('#localVideo');      



$(document).ready(()=>{

    localVideo = document.querySelector('#localVideo');      
    $(".btn-start-chat").on('click',(e)=>{
      console.log(e);
    });

    $(".user-list ul").on('click','span',(e)=>{

      console.log(e);

    });


    $(".btn-start-local-video").on('click',(e)=>{

      e.preventDefault();
      //console.log(localStreamManager.localMediaStream.id);
      if (typeof localStreamManager.localMediaStream != 'undefined '){
        localVideo.src = window.URL.createObjectURL(localStreamManager.localMediaStream);
      }else
        console.log("Aun no está disponible el stream de video");

    })
});





