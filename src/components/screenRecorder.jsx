import React, { Component } from 'react';
import "./screenRecorder.css";


export default function screenRecorder() {


  function pausee(rm) {
    return rm.pause();
}

const start = async () => {
    // stream is a MediaStream object.
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: "screen",
        },
    });
    // data = Blob array;
    const data = [];
    
    const mediaRecorder = new MediaRecorder(stream);

    // continous contruction of the blob array;
    mediaRecorder.ondataavailable = (e) => {
        data.push(e.data);
    };

    //console.log(stream.active);
    mediaRecorder.start(); // we need to start the recording.

    //mediaRecorder.state = pausee(mediaRecorder);

    console.log(mediaRecorder.state);

    

    // event listener to stop recording //
    var btn3 = document.getElementById("button3");
    btn3.addEventListener("click", () => {
        // the stream is finished.
        stream.getTracks().forEach( track => track.stop() ); // stop all tracks.
        //stream.active = false; this property is read only, cannot be directly affected.
        console.log(stream.active);
    })


    // event listener to pause and resume recording //
    var btn4 = document.getElementById("button4");
    btn4.addEventListener("click", () => {

        if (mediaRecorder.state === "recording") {
            //stream.getTracks().forEach( track => track.pause() ); // pause all tracks.
            mediaRecorder.pause();
            console.log("video paused");
            console.log(mediaRecorder.state);
        }
        else if (mediaRecorder.state === "paused") {
            // stream.getTracks().forEach( track => track.resume() ); // resume all tracks.
            mediaRecorder.resume();
            console.log("video resumed");
            console.log(mediaRecorder.state);
        }
    })

    //mediaRecorder.stop(); A sole stop doesn't stop all tracks.
    
    mediaRecorder.onstop = (e) => {
        console.log(stream.active);
        console.log(mediaRecorder.state);
        // When stopped display video.
        document.querySelector("video").src = URL.createObjectURL(
            new Blob(data, {
                type: data[0].type,
            })
        );
    };
};

  //render final
  return (
    <div>

      <h1>HOLA </h1>
      <div>
        <video id='myVideo' width="900" height="500" controls></video>
      </div>
       

       
       <div id="buttons">
           {/* <button className="btn" id="button2" onClick={this.start}>Click to begin!</button> */}
           <button className="btn" id="button3">Click to stop!</button>
           <button className="btn" id="button4">Click to pause/resume!</button>
       </div>

    </div>

    
 
        

  )
}
