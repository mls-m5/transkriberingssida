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
			<span>☻</span><input class="speaker_name" id="speaker_name1" title="name of speaker 1 (insert with shift+return)" value="M"></input>
			<span>☻</span><input class="speaker_name" id="speaker_name2" title="name of speaker 2 (insert with shift+return)" value="I"></input>
			<span>↶</span><input class="speaker_name" id="repeat_time" value="1"></input>s
			<button onclick="insertTime()" id="insert_time_button" title="Insert current time">✎⌚00:00</button>
			<button onclick="showHelp()">?</button>
			
		</div>

		<div id="time_container">
			<div id="time_display">
				
			</div>
		</div>

		<audio id="sound" controls></audio>
		<!-- <p>Tryck shift+space i textvyn för att spela/pausa, tryck på knappen under textvyn (eller snabbare tab, space) för att lägga in aktuell tid som en anteckning i dokumentet. Ctrl+b för att backa (en sekund åt gången). Shift + Enter skriver in namn på aktuell talare</p> -->
		<input type="file" id="audio_file" onchange="playFile(this)" />
		<div class="text_wrapper">
			<textarea id="the_text" cols="40" rows="5" onkeyup="textAreaAdjust(this)" ></textarea>
		</div>

		<script src="main.js"></script>
		<script src="background.js"></script>
	</body>
</html>
