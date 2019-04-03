
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

    // function enablestart() {
    //     var startbutton = document.getElementById('startbutton');
    //     startbutton.value = "start";
    //     startbutton.disabled = null;
    // }

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
        var proportion;
        if (vid.videoWidth > vid.videoHeight) {
            proportion = vid.videoWidth/vid.videoHeight;
            vid_width = Math.round(vid_height * proportion);
            vid.width = vid_width;
        } else {
            proportion = vid.videoWidth/vid.videoHeight;
            vid_height = Math.round(vid_width / proportion);
            vid.height = vid_height;
        }
        overlay.width = vid_width;
        rendercallback(vid_width, vid.height)
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
            startVideo()
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

    function restart() {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
        } else if (navigator.getUserMedia) {
            navigator.getUserMedia({video : true}, gumSuccess, gumFail);
        }
    }
    window.restart = restart

    // vid.addEventListener('canplay', enablestart, false);

    function startVideo() {
        // start video
        vid.play();
        // start tracking
        ctrack.start(vid);
        trackingStarted = true;
        // start loop to draw face
        drawLoop();
        // if (mediaStreamTrack) {
        //     window.mediaStreamTrack = mediaStreamTrack
        //     // mediaStreamTrack.start()
        // }
    }

    function stopVideo() {
        ctrack.stop();
        ctrack.reset();
        vid.pause();
        mediaStreamTrack.stop()
        console.log(mediaStreamTrack)
    }
    window.startVideo = startVideo
    window.stopVideo = stopVideo
    var firstime = 0;
    function drawLoop() {
        requestAnimFrame(drawLoop);
        overlayCC.clearRect(0, 0, vid_width, vid_height);
        //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
        var pos = ctrack.getCurrentPosition()
        if (pos) {
            ctrack.draw(overlay);
            if (chekcingmouse(pos) > 23) {
                console.log('张开嘴巴')
                stopVideo()
            }
            // if (checkshakehead(pos) > 15) {
            //     console.log('在摇头')
            //     stopVideo()
            // }
        }
    }

    var minmouth = 0, preface = 0;
    function chekcingmouse(pos) {
      var cur = pos[57][1] - pos[60][1]
      minmouth = minmouth < cur ? cur : minmouth
      return minmouth
    }

    function checkshakehead(pos) {
        if (preface === 0) {
            preface = pos[2][0]
        }
        var maxlen = Math.abs(pos[2][0] - preface)
        return maxlen
    }
}
})()