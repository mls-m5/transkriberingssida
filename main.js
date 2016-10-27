
function getById(id) {
	return document.getElementById(id);
}

var playsign = "▶";
var pausesign = "⏸";
var clocksign = "⌚";
var pensign = "✎";
var audioFileElement = getById("audio_file");
var audioElement = getById("sound");
var timeDisplay = $("#time_display");
var timeContainer = $("#time_container");


function speed_change(obj) {
	audioElement = document.getElementById("sound");
	audioElement.playbackRate = obj.value;
	var label = getById("speed_label");
	label.innerHTML = Math.round(obj.value * 10) / 10;
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
	audioElement = getById("sound");
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
	
	insertText(Math.floor(audioElement.currentTime / 60) + ":" + Math.floor(audioElement.currentTime) % 60 + "\n");
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

function formatSpeaker(number, bold) {
	speakerInput = getById("speaker_name" + number);
	if (bold) {
		speakerInput.style.fontWeight = "bold";
	}
	else {
		speakerInput.style.fontWeight = "";
	}
}

//Insert the name of the other speaker
function switchSpeaker() {
	if (lastSpeaker == 1) {
		insertSpeaker(2);
		formatSpeaker(2, true);
		formatSpeaker(1, false);
	}
	else {
		insertSpeaker(1);
		formatSpeaker(1, true);
		formatSpeaker(2, false);
	}
}

function togglePlay() {
	saveText();
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
	timeDisplay.width(timeContainer.width() * audioElement.currentTime / audioElement.duration);
	var button = getById("insert_time_button");
	var seconds = Math.floor(audioElement.currentTime);
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
		if (seconds < 10) {
		seconds = "0" + seconds;
	}
	button.innerHTML = pensign + clocksign + minutes + ":" + seconds;
}

function seekTo(time) {
	audioElement.currentTime = time;
}

function showHelp() {
	alert("Tryck shift+space i textvyn för att spela/pausa, tryck på knappen under textvyn (eller snabbare tab, space) för att lägga in aktuell tid som en anteckning i dokumentet. Shift + Enter skriver in namn på aktuell talare, och växlar mellan talare");
}

function textAreaAdjust(o) {
  // o.style.height = "1px";
  // o.style.height = (25+o.scrollHeight)+"px";
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

$("#time_container").click(function(e) {
	var tc = timeContainer;
	var width = tc.width();

	audioElement.currentTime = audioElement.duration * e.pageX / width;
});

function saveText() {
	localStorage.transcribed_text = $("#the_text").val();
}

$("#the_text").change(function(object) {
	saveText();
});

$(window).on("load", function() {
	if (typeof localStorage.transcribed_text !== "undefined") {
		$("#the_text").val(localStorage.transcribed_text);
	}
});

var the_text = container.querySelector('the_text');
if (the_text.addEventListener) {
  the_text.addEventListener('input', function() {
    // event handling code for sane browsers
    saveText();
  }, false);
} else if (the_text.attachEvent) {
  the_text.attachEvent('onpropertychange', function() {
    // IE-specific event handling code
    saveText();
  });
}

