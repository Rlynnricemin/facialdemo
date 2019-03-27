(function exampleCode() {
  "use strict";

	var _faceDetectionRoi = new brfv4.Rectangle();
  var firinit = false // 是否首次加载
	var fircut = false // 是否首次截图
  var isTurnHead = {
	  status: false,
	  prepercent: ''
	} // 是否摇头
	var isOpenmouth = {
		status: false
	}


  var detection = 0; // 0 正视前方 1 正视左右摇头  2正视张开嘴巴 3眨眼睛

  brfv4Example.initCurrentExample = function(brfManager, resolution) {

		brfManager.init(resolution, resolution, brfv4Example.appId);
		

    // Sometimes you want to restrict the position and pose of a face.

    // In this setup we will restrict pick up of the face to the center of the image
    // and we will let BRFv4 reset if the user turns his head too much.

    // We limit the face detection region of interest to be in the central
    // part of the overall analysed image (green rectangle).
    _faceDetectionRoi.setTo(
      resolution.width * 0.125, resolution.height * 0,
      resolution.width * 0.75, resolution.height * 1
    );
    brfManager.setFaceDetectionRoi(_faceDetectionRoi);

    // We can have either a landscape area (desktop), then choose height or
    // we can have a portrait area (mobile), then choose width as max face size.

    var maxFaceSize = _faceDetectionRoi.width;
    // if(_faceDetectionRoi.width < _faceDetectionRoi.height) {
    //   maxFaceSize = _faceDetectionRoi.width;
    // }
    // Use the usual detection distances to be able to tell the user what to do.
		// 使用通常的检测距离来告诉用户要做什么
    brfManager.setFaceDetectionParams(maxFaceSize * 0.10, maxFaceSize * 8, 12, 8);

    // Set up the pickup parameters for the face tracking:
    // startMinFaceSize, startMaxFaceSize, startRotationX/Y/Z

    // Faces will only get picked up, if they look straight into the camera
    // and have a certain size (distance to camera).

    brfManager.setFaceTrackingStartParams(maxFaceSize * 0.1, maxFaceSize * 8, 15, 15, 15);

    // Set up the reset conditions for the face tracking:
    // resetMinFaceSize, resetMaxFaceSize, resetRotationX/Y/Z

    // Face tracking will reset to face detection, if the face turns too much or leaves
    // the desired distance to the camera.

    brfManager.setFaceTrackingResetParams(maxFaceSize * 0.1, maxFaceSize * 8, 25, 25, 25);
	};
	
	var getRandom = function (exp) {
		let result = Math.random()*2.9+1;
		if (exp && Math.floor(result) === exp) {
			if (exp === 3 && Math.floor(result) === exp) {
				result = 2
			} else {
				result = result > exp ? (exp + 1) : (exp - 1);
			}
		} else {
			result = Math.floor(result)
		}
		return result
	}

  brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {
	if (!firinit) {
		firinit = true
		window.brfv4Example.callback('init')
		return
	}

	if (brfv4Example.stopCheckImg === true && !fircut && detection === 0) {
		// 正视人脸时，时间到了且没截图人脸
		brfv4Example.callback('event01', 'error')
	}

	if (brfv4Example.stopCheckImg === true && fircut && detection === 0) {
		// 正视人脸时，倒计时到了且已经截图了
		detection = getRandom()
		brfv4Example.callback('event01', 'success', detection)
	}

	brfManager.update(imageData);
	// console.log('window.brfv4Example.stopCheckImg', window.brfv4Example.stopCheckImg)

    draw.clear();
    // 画绿色的边框线
    draw.drawRect(_faceDetectionRoi,					false, 2.0, 0x8aff00, 0.5);

    // 画中间的线框
    draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);

    var mergedFaces = brfManager.getMergedDetectedFaces();
    // 画中间黄色的线框
    // draw.drawRects(mergedFaces,							false, 2.0, 0xffd200, 1.0);

    var faces = brfManager.getFaces();
		var oneFaceTracked = false;
		

    for(var i = 0; i < faces.length; i++) {
		
			var face = faces[i];
			

			// draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, 0x8aff00, 0.4);
			draw.drawVertices(	face.vertices, 2.0, false, 0x8aff00, 0.4);
    if( face.state === brfv4.BRFState.FACE_TRACKING_START || face.state === brfv4.BRFState.FACE_TRACKING) {
		if (detection === 0) {
			if (!fircut) {
				fircut = true
				// 保留图像
				let img = document.createElement("img");
				img.src = document.getElementById('_imageData').toDataURL("image/png");
				brfv4Example.cutImage = img
				// document.body.appendChild(img);//写入到Dom
			}
		}
		if (detection === 1) {
			// 检测摇头
			// Read the rotation of the face and draw it
    		// green if the face is frontal or
			// red if the user turns the head too much.
			var maxRot = brfv4.BRFv4PointUtils.toDegree(
				Math.max(
					Math.abs(face.rotationX),
					Math.abs(face.rotationY),
					Math.abs(face.rotationZ)
				)
			);

			var percent = maxRot / 20.0;

			
			// brfv4Example.stopCheckImg &&
			let ytresult = brfv4Example.stopCheckImg !== false && isTurnHead.prepercent && !isTurnHead.status && Math.abs(isTurnHead.prepercent - percent) > 0.03
			if (ytresult) {
				isTurnHead.status = true
				detection = getRandom(1)
				brfv4Example.callback('event02', 'success', detection)
			}
			if (brfv4Example.stopCheckImg === true && !ytresult) {
				brfv4Example.callback('event02', 'error')
			}

			isTurnHead.prepercent = percent
    	// if(percent < 0.0) { percent = 0.0; }
			// if(percent > 1.0) { percent = 1.0; }

    	// 当percent越接近1证明转头越厉害
			// 当pecent越接近0.1越居中
			// var color =
			// 	(((0xff * percent) & 0xff) << 16) +
			// 	(((0xff * (1.0 - percent) & 0xff) << 8));

    		// 页面的辅助线
    		// draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
    		// draw.drawVertices(	face.vertices, 2.0, false, color, 0.4);

    		oneFaceTracked = true;
		} else if (detection === 2) {
			// 检测张开嘴巴
			// Yawn Detection - Or: How wide open is the mouth?
			setPoint(face.vertices, 39, p1); // left eye inner corner
			setPoint(face.vertices, 42, p0); // right eye outer corner
	
			var eyeDist = calcDistance(p0, p1);
	
			setPoint(face.vertices, 62, p0); // mouth upper inner lip
			setPoint(face.vertices, 66, p1); // mouth lower inner lip
	
			var mouthOpen = calcDistance(p0, p1);
			var yawnFactor = mouthOpen / eyeDist;
	
			yawnFactor -= 0.2; // remove smiling
	
			if(yawnFactor < 0) yawnFactor = 0;
	
			yawnFactor *= 2.0; // scale up a bit
	
			if(yawnFactor > 1.0) yawnFactor = 1.0;
	
			if(yawnFactor < 0.0) { yawnFactor = 0.0; }
			if(yawnFactor > 1.0) { yawnFactor = 1.0; }
			
			// brfv4Example.stopCheckImg &&
			let yawnresult = yawnFactor > 0.05 && !isOpenmouth.status 
			if (yawnresult) {
				isOpenmouth.status = true
			}
			if (isOpenmouth.status && brfv4Example.stopCheckImg !== false ) {
				detection = getRandom(2)
				brfv4Example.callback('event03', 'success', detection)
			}
			if (brfv4Example.stopCheckImg === true && !yawnresult) {
				brfv4Example.callback('event03', 'error')
			}
			// Let the color show you how much you yawn.
	
			// var color =
			// 			(((0xff * (1.0 - yawnFactor) & 0xff) << 16)) +
			// 			(((0xff * yawnFactor) & 0xff) << 8);
	
			// Face Tracking results: 68 facial feature points.
	
			// draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
			// draw.drawVertices(	face.vertices, 2.0, false, color, 0.4);
	
			// brfv4Example.dom.updateHeadline("BRFv4 - Advanced - A Simple Yawn Detection.\n" +
			// 	"Detects how wide open the mouth is: " + (yawnFactor * 100).toFixed(0) + "%");
		} else if (detection === 3) {
				var v = face.vertices;
				if(_oldFaceShapeVertices.length === 0) storeFaceShapeVertices(v);
				var k, l, yLE, yRE;
				// Left eye movement (y)
				for(k = 36, l = 41, yLE = 0; k <= l; k++) {
					yLE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}
				yLE /= 6;
				// Right eye movement (y)
				for(k = 42, l = 47, yRE = 0; k <= l; k++) {
					yRE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}
				yRE /= 6;
				var yN = 0;
				// Compare to overall movement (nose y)
				yN += v[27 * 2 + 1] - _oldFaceShapeVertices[27 * 2 + 1];
				yN += v[28 * 2 + 1] - _oldFaceShapeVertices[28 * 2 + 1];
				yN += v[29 * 2 + 1] - _oldFaceShapeVertices[29 * 2 + 1];
				yN += v[30 * 2 + 1] - _oldFaceShapeVertices[30 * 2 + 1];
				yN /= 4;
				var blinkRatio = Math.abs((yLE + yRE) / yN);
				if((blinkRatio > 12 && (yLE > 0.4 || yRE > 0.4))) {
					// console.log("blink " + blinkRatio.toFixed(2) + " " + yLE.toFixed(2) + " " +
					// 	yRE.toFixed(2) + " " + yN.toFixed(2));
					blink();
				}
				if(_blinked && brfv4Example.stopCheckImg !== false) {
					detection = getRandom(3)
					brfv4Example.callback('event04', 'success', detection)
				}
				if (brfv4Example.stopCheckImg === true && !_blinked) {
					brfv4Example.callback('event04', 'error')
				}
				// draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
				// draw.drawVertices(	face.vertices, 2.0, false, color, 0.4);

				storeFaceShapeVertices(v);
		}
      }
    }

    // Check, if the face is too close or too far way and tell the user what to do.

    if(!oneFaceTracked && mergedFaces.length > 0) {

	  var mergedFace = mergedFaces[0];
	  //   console.log(mergedFace.width / _faceDetectionRoi.width)

	  if(mergedFace.width < _faceDetectionRoi.width * 0.30) { // startMinFaceSize
        brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - restrict to frontal and center\n" +
					"Only track a face if it is in a certain distance. Come closer.");

      } else if(mergedFace.width > _faceDetectionRoi.width * 0.70) { // startMaxFaceSize
        brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - restrict to frontal and center\n" +
					"Only track a face if it is in a certain distance. Move further away.");
      }

    } else {
      brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - restrict to frontal and center\n" +
				"Only track a face if it is in a certain distance to the camera and is frontal.");
    }
  };

  brfv4Example.dom.updateHeadline("BRFv4 - basic - face tracking - restrict to frontal and center\n" +
		"Only track a face if it is in a certain distance to the camera and is frontal.");

  brfv4Example.dom.updateCodeSnippet(exampleCode + "");

  var p0				= new brfv4.Point();
	var p1				= new brfv4.Point();
	
	function blink() {
		_blinked = true;
		// if(_timeOut > -1) { clearTimeout(_timeOut); }
		// _timeOut = setTimeout(resetBlink, 150);
	}

	function resetBlink() {
		_blinked = false;
	}

	function storeFaceShapeVertices(vertices) {
		for(var i = 0, l = vertices.length; i < l; i++) {
			_oldFaceShapeVertices[i] = vertices[i];
		}
	}

  var setPoint		= brfv4.BRFv4PointUtils.setPoint;
	var calcDistance	= brfv4.BRFv4PointUtils.calcDistance;
	var _oldFaceShapeVertices = [];
	var _blinked		= false;
	var _timeOut		= -1;
})();