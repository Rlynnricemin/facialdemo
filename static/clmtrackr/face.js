
(function(){
window.startFaceinit = function (callback) {
    var vid = document.getElementById('videoel');
    var vid_width = vid.width;
    var vid_height = vid.height;
    var overlay = document.getElementById('overlay');
    var overlayCC = overlay.getContext('2d');

    var ctrack = new clm.tracker({useWebGL : true});
    ctrack.init();
    var trackingStarted = false;
    var mediaStreamTrack;
    var rendercallback = callback;

    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.top = '0px';
    // document.getElementById('container').appendChild( stats.domElement );

    function enablestart() {
        var startbutton = document.getElementById('startbutton');
        startbutton.value = "start";
        startbutton.disabled = null;
    }

    var insertAltVideo = function(video) {
        if (supports_video()) {
            if (supports_webm_video()) {
                video.src = "./media/cap12_edit.webm";
            } else if (supports_h264_baseline_video()) {
                video.src = "./media/cap12_edit.mp4";
            } else {
                return false;
            }
            return true;
        } else return false;
    }

    function adjustVideoProportions() {
        // resize overlay and video if proportions are not 4:3
        // keep same height, just change width
        var proportion = vid.videoWidth/vid.videoHeight;
        vid_width = Math.round(vid_height * proportion);
        vid.width = vid_width;
        overlay.width = vid_width;
        rendercallback(vid_width)
    }

    function gumSuccess( stream ) {
        // add camera stream if getUserMedia succeeded
        if ("srcObject" in vid) {
            vid.srcObject = stream;
        } else {
            vid.src = (window.URL && window.URL.createObjectURL(stream));
        }
        mediaStreamTrack = typeof vid.srcObject.stop !== 'undefined' ? vid.srcObject : vid.srcObject.getTracks()[0];
        vid.onloadedmetadata = function() {
            adjustVideoProportions();
            vid.play();
        }
        vid.onresize = function() {
            adjustVideoProportions();
            if (trackingStarted) {
                ctrack.stop();
                ctrack.reset();
                ctrack.start(vid);
            }
        }
    }

    function gumFail() {
        // fall back to video if getUserMedia failed
        insertAltVideo(vid);
        // document.getElementById('gum').className = "hide";
        // document.getElementById('nogum').className = "nohide";
        alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    // check for camerasupport
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia({video : true}, gumSuccess, gumFail);
    } else {
        insertAltVideo(vid);
        // document.getElementById('gum').className = "hide";
        // document.getElementById('nogum').className = "nohide";
        alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
    }

    vid.addEventListener('canplay', enablestart, false);

    function startVideo(callback) {
        // start video
        vid.play();
        // start tracking
        ctrack.start(vid);
        trackingStarted = true;
        // start loop to draw face
        drawLoop();
    }

    function stopVideo() {
        ctrack.stop();
        ctrack.reset();
        vid.pause();
        mediaStreamTrack.stop()
    }
    window.startVideo = startVideo
    window.stopVideo = stopVideo

    function drawLoop() {
        requestAnimFrame(drawLoop);
        overlayCC.clearRect(0, 0, vid_width, vid_height);
        //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
        var pos = ctrack.getCurrentPosition()
        if (pos) {
            ctrack.draw(overlay);
        }
    }

    // update stats on every iteration
    // document.addEventListener('clmtrackrIteration', function(event) {
    //     stats.update();
    // }, false);

    // function switchMode(el) {
    //     var mode = parseInt(el.target.value, 10);
    //     if (mode == 0) {
    //         ctrack.setResponseMode("single",["raw"]);
    //     } else if (mode == 1) {
    //         ctrack.setResponseMode("single",["lbp"]);
    //     } else if (mode == 2) {
    //         ctrack.setResponseMode("single",["sobel"]);
    //     } else if (mode == 3) {
    //         ctrack.setResponseMode("cycle",["raw", "lbp"]);
    //     } else if (mode == 4) {
    //         ctrack.setResponseMode("cycle",["sobel", "lbp"]);
    //     } else if (mode == 5) {
    //         ctrack.setResponseMode("blend",["raw", "lbp"]);
    //     } else if (mode == 6) {
    //         ctrack.setResponseMode("blend",["sobel", "lbp"]);
    //     }
    // };
    // document.getElementById('selectmode').addEventListener('change', switchMode, false);
}
})()