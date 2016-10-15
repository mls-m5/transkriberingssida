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
				margin: 20px;
			}
			
			body , textarea{
				font-family: "Roboto", sans-serif;
			}
			
			body {
				background: rgb(180, 180, 240);
			}
			
			button{
				background: rgb(200,200,256);
				border: 0px;
				font-size: 20px;
				margin: 20px;
				padding: 5px;
				transition: background 0.3s;
			}
			button:hover {
				background: rgb(220,220,256);
			}
			button:active{
				background: white;
			}
			.speaker_name {
				width: 30px;
			}
			.time_input {
				width: 30px;
			}
		</style>
	</head>
	<body id="transcripbebody">
		<p>Tryck shift+space i textvyn för att spela/pausa, tryck på knappen under textvyn (eller snabbare tab, space) för att lägga in aktuell tid som en anteckning i dokumentet. Ctrl+b för att backa (en sekund åt gången)</p>
		<input type="file" id="audio" onchange="playFile(this)" />
		<audio id="sound" controls></audio>
		Uppspelningshastighet: 
		<input type="range" id="speed_range" value="1" min = "0.5" max="1.5" step="0.1" onchange="speed_change(this)">

		<button title="skip backward" onclick="skipBackward(15)">◀◀◀</button>
		<button title="skip backward" onclick="skipBackward(5)">◀◀</button>
		<button id="toggle_play" title="play/pause" onclick="togglePlay()">▶</button>
		<button title="skip forward" onclick="skipForward(5)">▶▶</button>
		<button title="skip forward" onclick="skipForward(15)">▶▶▶</button>

		<div class="text_wrapper">
			<textarea id="the_text" cols="40" rows="5"></textarea>
		</div>
		<button onclick="insertTime()">Lägg in aktuell tid</button>
		<span>Talare 1</span><input class="speaker_name" id="speaker_name1" value="J"></input>
		<span>Talare 2</span><input class="speaker_name" id="speaker_name2" value="H"></input>
		<span>Backa vid uppspelning</span><input class="speaker_name" id="repeat_time" value="1"></input>s
		
		<script src="main.js">
		</script>
	</body>
</html>
