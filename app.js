const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 5,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions. the higher then the more sure the app will be it's your hand
  }
//getting users webcam
navigator.getUserMedia = 
    navigator.getUserMedia || 
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.msGetUserMEdia;
//Selecting elements from HTML
const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
//Training AI to the model loaded from the handtrack.js
let model;

handTrack.startVideo(video).then(status => {
    //checking for status to be true
    if(status) {
        //stream is the information from the camera
        navigator.getUserMedia({video:{} }, stream => {
            video.srcObject = stream;
            setInterval(runDetection, 100)
            
        },
        err => console.log(err)
        );
    }
});
//Detecting the hand gesture
function runDetection(){
    model.detect(video)
        //predictions is all information about hands appearing in the camera
        .then(predictions => {
            console.log(predictions);
            //marking the hand on the screen
            model.renderPredictions(predictions, canvas, context, video);
            if(predictions.length > 0){
                audio.play();
            }
        }) 
}

handTrack.load(modelParams).then(lmodel => {
        model = lmodel;
})