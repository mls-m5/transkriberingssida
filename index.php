<!DOCTYPE html>
<html>


	<head>
		<meta charset="utf-8">
		<title>Transkribering</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<style>
			textarea {
				width:100%;
				height:400px;
			}
		</style>
	</head>
	<body id="transcripbebody">
		<p>Tryck shift+space i textvyn för att spela/pausa, tryck på knappen under textvyn (eller snabbare tab, space) för att lägga in aktuell tid som en anteckning i dokumentet. Ctrl+b för att backa (en sekund åt gången)</p>
		<input type="file" id="audio" onchange="playFile(this)" />
		<audio id="sound" controls></audio>
		Uppspelningshastighet: 
		<input type="range" id="speed_range" value="1" min = "0.5" max="1.5" step="0.1" onchange="speed_change(this)">
		<textarea id="the_text" cols="40" rows="5"></textarea>
		<button onclick="insertTime()">Lägg in aktuell tid</button>
		
		<script>
			function speed_change(obj) {
				audioElement = document.getElementById("sound");
				audioElement.playbackRate = obj.value;
				console.log("changing rate to " + obj.value);
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
						audioElement = document.getElementById("sound");
				
						if (audioElement.paused) {
							audioElement.play()
							is_playing = true;
						}
						else {
							audioElement.pause()
							is_playing = false;
						}
						
    					event.preventDefault(); 
						return false;
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
		</script>
	</body>
</html>
