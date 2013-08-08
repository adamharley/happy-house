var interval;
var soundTimeout;


function tick() {
	if (typeof currentFrame == 'undefined') {
		currentFrame = 0;
	}
	
	currentFrame += 1;
	loadImageFrame(currentFrame);
	loadSoundFrame(currentFrame);
	$("#frame-counter").html(currentFrame)
}


function checkEvent(n) {
	switch (n) {
		case 14: // start0
			if (Math.floor((Math.random()*10)+1) == 10) {
				loadScene("hello2");
			} else {
				loadScene("start0");
			}
			break;
		case 44: // s1
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("go");
			} else {
				loadScene("sitA");
			}
			break;
		case 73: // s2
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 102: // s3
			if (Math.floor((Math.random()*15)+1) == 15) {
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
			switch (Math.floor((Math.random()*15)+1)) {
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
			switch (Math.floor((Math.random()*15)+1)) {
				case 5:
					loadScene("lunch"+Math.floor((Math.random()*3)+1));
					break;
				case 10:
					loadScene("sB2A");
					break;
				default:
					loadScene("sitB");
			}
			break;
		case 233: // sitC
			switch (Math.floor((Math.random()*25)+1)) {
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
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("gloomB");
			}
			break;
		case 311: // w-4
			if (Math.floor((Math.random()*15)+1) == 15) {
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
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("gloomB");
			} else {
				loadScene("w-1");
			}
			break;
		case 403: // nobiA
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("gloomB");
			} else {
				loadScene("g-1");
			}
			break;
		case 426: // return
			loadScene("sitA");
			break;
		case 442: // look
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 544: // lunch
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;	
		case 555: // sleepA
			switch (Math.floor((Math.random()*15)+1)) {
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
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1269: // lunch1
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1343: // lunch2
			if (Math.floor((Math.random()*15)+1) == 15) {
				loadScene("sB2A");
			} else {
				loadScene("sitB");
			}
			break;
		case 1422: // lunch3
			if (Math.floor((Math.random()*15)+1) == 15) {
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


function loadSoundFrame(n) {
	var frame = data.soundFrames[n];
	
	if (typeof frame == "undefined") {
		return;
	}
	
	console.log("Frame "+n+": Playing sound "+frame[0]);
	
	if (typeof frame[1] == "undefined") {
		createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY);
	} else { // Looped
		if (frame[0] == 'Sr-twkl2') { // Offset to avoid popping noise
			var sound = createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY, 4, 4, -1);
		} else {
			var sound = createjs.Sound.play(frame[0], createjs.Sound.INTERRUPT_ANY, 0, 0, -1);
		}
		
		var duration = frame[1] - n;
		soundTimeout = setTimeout(function() {
			console.log( "Frame "+frame[1]+": " + ( sound.stop() ? "Stopped sound" : "Did not stop sound" ) + " " + frame[0] );
		}, duration * 200);
		
		console.log("Frame "+n+": Looping sound for "+duration+" frames");
	}
}


function loadImageFrame(n) {
	if ( checkEvent(n-1) ) {
		return;
	}
	
	var frame = data.imageFrames[n-1];
	
	$(".channel").removeClass("updated");
	
	$.each(frame, function(channel, sprite) {
		var image = data.images[sprite[0]];
		
		if ( $("#channel-"+channel).length == 0 ) {
			$("#stage").append($("<div id='channel-"+channel+"' class='channel' style='z-index: "+channel+";'></div>"));
		} else {
			$("#channel-"+channel)
				.off("click");
		}
		
		if (typeof image == 'undefined') {
			switch(sprite[0]) {
				case 288: // Quit button
					$("#channel-"+channel)
						.css({
							"background-image": "none",
							"left": sprite[1],
							"top": sprite[2],
							"width": 52,
							"height": 22
						})
						.addClass("updated")
						.show()
						.on("click",function(){
							loadScene("end1A");
						});
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
						.addClass("updated")
						.show()
						.on("click",function(){
							loadScene("end1B");
						});
					break;
				case 291: // Black background
					break;
				default:
					console.log("Frame "+n+": Could not find cast member "+sprite[0]);
			}
		} else {
			switch (sprite[0]) {
				case 12: // Basket top
					$("#channel-"+channel)
						.on("click",function(){
							loadScene("hello1");
						});
					break;
				case 14: // Basket full
					$("#channel-"+channel)
						.on("click",function(){
							loadScene("s"+Math.floor((Math.random()*3)+1));
						});
					break;
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
						});
					break;
				case 118: // Sleeping hamster
					$("#channel-"+channel)
						.on("click",function(){
							if (Math.floor((Math.random()*15)+1) == 15) {
								loadScene("gloomA");
							} else {
								loadScene("akubi");
							}
						});
					break;
			}
			
			$("#channel-"+channel)
				.css({
					"background-image": "url('images/member_"+sprite[0]+".png')",
					"left": sprite[1],
					"top": sprite[2],
					"width": image[0],
					"height": image[1]
				})
				.addClass("updated")
				.show();
		}
	});
	
	$(".channel:not(.updated)")
		.hide();
	
//	console.log("Frame "+n+": Loaded");
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
		interval = setInterval(tick,200);
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