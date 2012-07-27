var canvasId = "gameCanvas";
window.onload = function(){
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext("2d");

	context.clearRect(0,0,canvas.width,canvas.height);

	context.beginPath();
    context.moveTo(100, 150);
    context.lineTo(450, 50);
    context.stroke();
};
