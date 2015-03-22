var interval;
var soundTimeout;
var framesPerSecond = 5;


function getRand(n) {
	return Math.floor((Math.random()*n)+1);
}


function getRandMatch(n) {
	return getRand(n) == n;
}


function tick() {
	if (typeof currentFrame == 'undefined') {
		currentFrame = 0;
	}
	
	currentFrame++;
	
	checkFPS(currentFrame);
	
	if (!checkEvent(currentFrame - 1)) {
		loadImageFrame(currentFrame);
		loadSoundFrame(currentFrame);
	}
	
	$("#frame-counter").html(currentFrame)
}


function loadSoundFrame(n) {
	var frame = data.soundFrames[n];
	
	if (typeof frame == "undefined") {
		return;
	}
	
	console.log("Frame "+n+": Playing sound "+frame[0]);
	
	if (typeof frame[1] == "undefined") {
		if (frame[0] == 'Sr-twkl2') { // Offset to avoid popping noise
			createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY, 4, 4);
		} else {
			createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY);
		}
	} else { // Looped
		var sound = createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY, 0, 0, -1);
		
		var duration = frame[1] - n;
		soundTimeout = setTimeout(function() {
			console.log( "Frame "+frame[1]+": " + ( sound.stop() ? "Stopped sound" : "Did not stop sound" ) + " " + frame[0] );
		}, duration * (1000 / framesPerSecond));
		
		console.log("Frame "+n+": Looping sound for "+duration+" frames");
	}
}


function loadImageFrame(n) {
	var frame = data.imageFrames[n-1];
	
	$(".channel").hide();
	
	$.each(frame, function(channel,sprite) {
		loadImage(n,channel,sprite);
	});
	
//	console.log("Frame "+n+": Loaded");
}


function loadImage(n, channel, sprite) {
	var imageName = sprite[0];
	var image = data.images[imageName];
	
	if ( $("#channel-"+channel).length == 0 ) {
		$("#stage").append($("<div id='channel-"+channel+"' class='channel' style='z-index: "+channel+";'></div>"));
	} else {
		$("#channel-"+channel)
			.off("click")
			.removeClass("clickable");
	}
	
	if (typeof image == 'undefined') {
		switch(imageName) {
			case 288: // Quit button
				$("#channel-"+channel)
					.css({
						"background-image": "none",
						"left": sprite[1],
						"top": sprite[2],
						"width": 52,
						"height": 22
					})
					.show()
					.on("click",function(){
						loadScene("end1A");
					})
					.addClass("clickable");
				break;
			case 289: // Basket button? (found in start0, end1 and hello2)
				break;
			case 290: // Open button
				$("#channel-"+channel)
					.css({
						"background-image": "none",
						"left": sprite[1],
						"top": sprite[2],
						"width": 52,
						"height": 22
					})
					.show()
					.on("click",function(){
						loadScene("end1B");
					})
					.addClass("clickable");
				break;
			case 291: // Black background
				break;
			default:
				console.log("Frame "+n+": Could not find cast member "+imageName);
		}
	} else {
		switch (imageName) {
			case 12: // Basket top
				$("#channel-"+channel)
					.on("click",function(){
						loadScene("hello1");
					})
					.addClass("clickable");
				break;
			case 14: // Basket full
				$("#channel-"+channel)
					.on("click",function(){
						loadScene("s"+getRand(3));
					})
					.addClass("clickable");
				break;
			case 18: // Bowl
			case 19:
				$("#channel-"+channel)
					.on("click",function(){
						if ( currentFrame >= data.scenes.sitA && currentFrame < data.scenes.sB2A || currentFrame >= data.scenes.sleepA && currentFrame < data.scenes.akubi ) {
							loadScene("food1");
						} else if ( currentFrame >= data.scenes.sitB && currentFrame < data.scenes.sitC ) {
							loadScene("food2");
						} else if ( currentFrame >= data.scenes.sitC && currentFrame < data.scenes.walkA ) {
							loadScene("food3");
						}
					})
					.addClass("clickable");
				break;
			case 46: // Walking left hamster
			case 47:
			case 48:
			case 49:
				$("#channel-"+channel)
					.on("click",function(){
						clearInterval(interval);
						
						var sequence = [1,2,3,4,3,4,3,5];
						
						$.each(sequence, function(i, image) {
							setTimeout(
								function() {
									sprite[0] = image;
									loadImage(n, channel, sprite);
								},
								200 * (i + 1)
							);
						});
						
						setTimeout(
							function() { 
								interval = setInterval(tick, 1000 / framesPerSecond);
							},
							200 * (sequence.length + 1)
						);
					})
					.addClass("clickable");
				break;
			case 61: // Walking right hamster
			case 62:
			case 63:
			case 64:
				$("#channel-"+channel)
					.on("click",function(){
						clearInterval(interval);
						
						var sequence = [6,7,8,9,8,9,8,10];
						
						$.each(sequence, function(i, image) {
							setTimeout(
								function() {
									sprite[0] = image;
									loadImage(n, channel, sprite);
								},
								200 * (i + 1)
							);
						});
						
						setTimeout(
							function() { 
								interval = setInterval(tick, 1000 / framesPerSecond);
							},
							200 * (sequence.length + 1)
						);
					})
					.addClass("clickable");
				break;
			case 77: // SitA hamster
			case 78:
				$("#channel-"+channel)
					.on("click",function(){
						var rand = getRand(5);
						
						if (rand <= 2) {
							loadScene("sA2B");
						} else if (rand <= 4) {
							loadScene("sitC");
						} else {
							loadScene("go");
						}
					})
					.addClass("clickable");
				break;
			case 90: // SitB hamster
			case 91:
				$("#channel-"+channel)
					.on("click",function(){
						if (getRandMatch(5)) {
							loadScene("sB2A");
						} else {
							var rand = getRand(4);
							loadScene( (rand == 4) ? "lunch" : "lunch"+getRand(3) );
						}
					})
					.addClass("clickable");
				break;
			case 116: // SitC hamster
			case 117:
				$("#channel-"+channel)
					.on("click",function(){
						if (getRandMatch(5)) {
							loadScene("sleepA");
						} else {
							loadScene("go");
						}
					})
					.addClass("clickable");
				break;
			case 118: // Sleeping hamster
				$("#channel-"+channel)
					.on("click",function(){
						if (getRandMatch(15)) {
							loadScene("gloomA");
						} else {
							loadScene("akubi");
						}
					})
					.addClass("clickable");
				break;
		}
		
		$("#channel-"+channel)
			.css({
				"background-image": "url('images/member_"+imageName+".png')",
				"left": sprite[1],
				"top": sprite[2],
				"width": image[0],
				"height": image[1]
			})
			.show();
	}
}


function loadScene(n) {
	clearInterval(interval);
	clearTimeout(soundTimeout);
	createjs.Sound.stop();
	
	if (typeof data.scenes[n] == "undefined") {
		console.log("Scene "+n+": Not found");
	} else {
		console.log("Scene "+n+": Loaded");
		
		currentFrame = data.scenes[n];
		loadImageFrame(currentFrame);
		loadSoundFrame(currentFrame);
		interval = setInterval(tick, 1000 / framesPerSecond);
	}
}


function checkEvent(n) {
	switch (n) {
		case 14: // start0
			if (getRandMatch(10)) {
				loadScene("hello2");
			} else {
				loadScene("start0");
			}
			break;
		case 44: // s1
			if (getRandMatch(15)) {
				loadScene("go");
			} else {
				loadScene("sitA");
			}
			break;
		case 73: // s2
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 102: // s3
			if (getRandMatch(15)) {
				loadScene("gloomA");
			} else {
				loadScene("sleepA");
			}
			break;
		case 110: // end1
			loadScene("hello2");
			break;
		case 130: // eAN - quit dialog
			loadScene("eAN");
			break;
		case 136: // end1A - quit selected
			loadScene("end2A");
			break;
		case 141: // end1B - open selected
			loadScene("start0");
			break;
		case 151: // end2A
			loadScene("end2A");
//			loadScene("mmd.logo");
			break;
		case 155: // mmd.logo
			clearInterval(interval); // Quit
			break;
		case 161: // st_dmy
			break;
		case 177: // sitA
			switch (getRand(15)) {
				case 5:
					loadScene("sitC");
					break;
				case 10:
					loadScene("sA2B");
					break;
				default:
					loadScene("sitA");
			}
			break;
		case 192: // sA2B
			loadScene("sitB");
			break;
		case 207: // sB2A
			loadScene("sitA");
			break;
		case 220: // sitB
			switch (getRand(15)) {
				case 5:
					var rand = getRand(4);
					loadScene( (rand == 4) ? "lunch" : "lunch"+getRand(3) );
					break;
				case 10:
					loadScene("sB2A");
					break;
				default:
					loadScene("sitB");
			}
			break;
		case 233: // sitC
			switch (getRand(25)) {
				case 5:
					loadScene("nobiA");
					break;
				case 10:
					loadScene("walkA");
					break;
				case 15:
					loadScene("akubi");
					break;
				case 20:
					loadScene("gloomA");
					break;
				default:
					loadScene("sitC");
			}
			break;
		case 245: // walkA
			if (getRandMatch(5)) {
				loadScene("gloomB");
			}
			break;
		case 311: // w-4
			if (getRandMatch(2)) {
				loadScene("return");
			}
			break;
		case 348: // w-7
			loadScene("walkA");
			break;
		case 369: // go
			loadScene("g-1");
			break;
		case 376: // g-1
			if (getRandMatch(15)) {
				loadScene("gloomB");
			} else {
				loadScene("w-1");
			}
			break;
		case 403: // nobiA
			if (getRandMatch(15)) {
				loadScene("gloomB");
			} else {
				loadScene("g-1");
			}
			break;
		case 426: // return
			loadScene("sitA");
			break;
		case 442: // look
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 544: // lunch
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;	
		case 555: // sleepA
			switch (getRand(15)) {
				case 5:
					loadScene("akubi");
					break;
				case 10:
					loadScene("gloomA");
					break;
				default:
					loadScene("sleepA");
			}
			break;
		case 636: // akubi
			loadScene("gloomA");
			break;
		case 674: // gloomA
			loadScene("sitA");
			break;
		case 786: // gloomB
			loadScene("w-2");
			break;
		case 816: // food1
			loadScene("eatA");
			break;
		case 845: // food2
			loadScene("eatA");
			break;
		case 874: // food3
			loadScene("eatA");
			break;
		case 1189: // eatA
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1269: // lunch1
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1343: // lunch2
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1422: // lunch3
			if (getRandMatch(15)) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1508: // hello1 (basket closed)
			loadScene("eAN");
			break;
		case 1605: // hello2 (waiting for basket open)
			loadScene("start0");
			break;
		default:
			return false;
	}
	
	return true;
}
    
function checkFPS(n) {
	switch (n) {
		case 25: // open sequence
		case 54:
		case 83:
			framesPerSecond = 30;
			
			clearInterval(interval);
			interval = setInterval(tick, 1000 / framesPerSecond);
			break;
		case 1056: // run sequence
			framesPerSecond = 15;
			
			clearInterval(interval);
			interval = setInterval(tick, 1000 / framesPerSecond);
			break;
		case 44: // sequence end
		case 73:
		case 102:
		case 1068:
			framesPerSecond = 5;
			
			clearInterval(interval);
			interval = setInterval(tick, 1000 / framesPerSecond);
			break;
	}
}


$(document).ready(function() {
	/* Debug */
	$.each(data.scenes, function(key, value) {   
		 $('#scene-select select')
			  .append($('<option>', { value : key })
			  .text(key)); 
	});
	
	$("#scene-select select").on("change",function(){
		loadScene($(this).val());
	});
	
	if (window.location.hash == '#debug') {
		$("#debug").show();
	};
	
	/* Simple / iOS display */
	if (window.location.hash == '#simple' || window.navigator.standalone) {
		$(".container-fluid > *:not(#stage)").hide();
		$("#stage").css("box-shadow","none");
		$("#stage").css("margin-top","-77.5px");
		$("body").css("background","#000");
	};
	
	/* Mute control */
	$("#mute-toggle").click(function(){
		createjs.Sound.setMute(!createjs.Sound.getMute());
	});
	
	
	/* Preload */
	var queue = new createjs.LoadQueue();
	queue.installPlugin(createjs.Sound);
	
	$.each(data.images, function(key){
		if (jQuery.inArray(key,[50,60,65,76,79,87,110,115,120,127,132,142,149,181,206,207,208,209,210,216,217]) !== -1) {
			queue.loadFile({src:"images/member_"+key+".png"});
		}
	});
	
	$.each(data.sounds, function(key,value){
		queue.loadFile({"id":value, "src":"sounds/"+value+".wav"});
	});
	
	
	/* Load first scene */
	loadScene("start0");
});