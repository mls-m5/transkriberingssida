
var playsign = "▶";
var pausesign = "⏸";
var audioElement = getById("audio");
var audioSlider = getById("audio_position");

function getById(id) {
	return document.getElementById(id);
}

function speed_change(obj) {
	audioElement = document.getElementById("sound");
	audioElement.playbackRate = obj.value;
	console.log("changing rate to " + obj.value);
}

function seekChange(obj) {
	seekTo(obj.value);
}

function playFile(obj) {
	var sound = document.getElementById('sound');
	var reader = new FileReader();
	reader.onload = (function(audio) {
		return function(e) {
			audio.src = e.target.result;
	};})(sound);
	reader.addEventListener('load', function() {
		document.getElementById("sound").play()
	});
	reader.readAsDataURL(obj.files[0]);
}

function insertText(text) {
	$textarea = $('#the_text');
	var cursorPos = $textarea.prop('selectionStart');
	var v = $textarea.val();
	var textBefore = v.substring(0,  cursorPos);
	var textAfter  = v.substring(cursorPos, v.length);

	$textarea.val(textBefore + text + textAfter);
	$textarea.prop('selectionStart', cursorPos + text.length);
}

function insertTime() {
	audioElement = document.getElementById("sound");
	
	insertText(Math.floor(audioElement.currentTime / 60) + ":" + Math.floor(audioElement.currentTime) + "\n");
	$("#the_text").focus();
}

let lastSpeaker = 1;
function insertSpeaker(number) {
	speakerInput = $("#speaker_name" + number);
	insertText("\n" + speakerInput.val() + ": ");
	lastSpeaker = number;

	the_text = getById("the_text");
	the_text.selectionEnd = the_text.selectionStart;

}

//Insert the name of the other speaker
function switchSpeaker() {
	if (lastSpeaker == 1) {
		insertSpeaker(2);
	}
	else {
		insertSpeaker(1);
	}
}

function togglePlay() {
	audioElement = document.getElementById("sound");
	if (audioElement.paused) {
		audioElement.currentTime -= Number($("#repeat_time").val());
		audioElement.play()
		is_playing = true;
		getById("toggle_play").innerHTML = pausesign;
	}
	else {
		audioElement.pause()
		is_playing = false;
		getById("toggle_play").innerHTML = playsign;
	}
}

function skipForward(time) {
	if (typeof time == "undefined"){
		time = 15;
	}
	audioElement = document.getElementById("sound");
	audioElement.currentTime += time;
}

function skipBackward(time) {
	if (typeof time == "undefined"){
		time = 15;
	}
	audioElement = document.getElementById("sound");
	audioElement.currentTime -= time;
}

audioElement.ontimeupdate = function() {
	audioSlider.value = audioElement.currentTime;
}

function seekTo(time) {
	audioElement.currentTime = time;
}

$("#the_text").keypress(function(event){
	if (event.ctrlKey) {
		console.log(event.key);
		if (event.key == "t") { //Funkar inte
			insertText("hej");
			
			event.preventDefault(); 
			return false;
		}
		else if(event.key == "b") {
			audioElement = document.getElementById("sound");
			audioElement.currentTime -= 1;
	
			event.preventDefault(); 
			return false;
		}
	}
	if (event.shiftKey) {
		if(event.key == " ") {
			togglePlay();
			
			event.preventDefault(); 
			return false;
		}
		if (event.keyCode == 13) {
			switchSpeaker();

			event.preventDefault();
			return false;
		}

	}
	if (event.shiftKey && event.ctrlKey) {
		if (event.key == "!") {
			insertSpeaker(1);
		}
		else if (event.key == "\"") {
			insertSpeaker(2);
		}
		else if (event.key = "a") {
			insertSpeaker("a");
		}
		else if (event.key = "b") {
			insertSpeaker("b");
		}


	}
});

$("#the_text").change(function(object) {
	localStorage.transcribed_text = $("#the_text").val();
});

$(window).on("load", function() {
	if (typeof localStorage.transcribed_text !== "undefined") {
		$("#the_text").val(localStorage.transcribed_text);
	}
});


