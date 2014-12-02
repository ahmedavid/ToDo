<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		#box{
			width: 250px;
			height: 250px;
			background: yellow;
		}
	</style>
</head>
<body>
<input type="text" id="input">
<input type="text" id="input2">
<button id="button">Go</button>
	
	<script>
		changeRed = function(){
			console.log("Change Red on click");
			var box = document.getElementById("input");
			box.style.background = "red";
		}
		changeGreen = function(){
			console.log("Change Green on mouseover");
			var box = document.getElementById("input");
			box.style.background = "green";
		}		
		changePurple = function(){
			console.log("Change Purple on blur");
			var box = document.getElementById("input");
			box.style.background = "purple";
		}			
		changeWhite = function(){
					console.log("Change Purple on blur");
					var box = document.getElementById("input");
					box.style.background = "white";
				}					
				var button = document.getElementById("input");
		//button.addEventListener("click", changeRed);
		//button.addEventListener("mouseover", changeGreen);
		button.onblur = changePurple;
		button.onfocus = changeWhite;

	</script>
</body>
</html>