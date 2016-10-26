<!DOCTYPE html>
<html>


	<head>
		<meta charset="utf-8">
		<title>Transkribering</title>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body id="transcripbebody">
		<div class="header">

			<button title="skip backward" onclick="skipBackward(15)">◀◀◀</button>
			<button title="skip backward" onclick="skipBackward(5)">◀◀</button>
			<button id="toggle_play" title="play/pause" onclick="togglePlay()">▶</button>
			<button title="skip forward" onclick="skipForward(5)">▶▶</button>
			<button title="skip forward" onclick="skipForward(15)">▶▶▶</button>
			<button title="open audio file" onclick="audioFileElement.click()">📼</button>

			<input type="range" id="speed_range" value="1" min = "0.5" max="1.5" step="0.1" onchange="speed_change(this)">
			<span id="speed_label">1x</span>
			<button onclick="insertTime()" title="Insert current time">✎⌚</button>
			<span>☻</span><input class="speaker_name" id="speaker_name1" value="M"></input>
			<span>☻</span><input class="speaker_name" id="speaker_name2" value="I"></input>
			<span>↶</span><input class="speaker_name" id="repeat_time" value="1"></input>s
			<button onclick="showHelp()">?
			</button>
			
		</div>

		<div id="time_container">
			<div id="time_display">
				
			</div>
		</div>

		<audio id="sound" controls></audio>
		<!-- <p>Tryck shift+space i textvyn för att spela/pausa, tryck på knappen under textvyn (eller snabbare tab, space) för att lägga in aktuell tid som en anteckning i dokumentet. Ctrl+b för att backa (en sekund åt gången). Shift + Enter skriver in namn på aktuell talare</p> -->
		<input type="file" id="audio_file" onchange="playFile(this)" />
		<div class="text_wrapper">
			<textarea id="the_text" cols="40" rows="5"></textarea>
		</div>

		<script src="main.js">
		</script>
	</body>
</html>
