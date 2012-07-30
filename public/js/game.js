$(document).ready(function(){
	$(".backToRoomPage").click(function(){
		socket.emit('userLeaveFromTable',{});
		isCardShown = false;
		for(var i = 0; i < 9; i++){
			for(var j = 0; j < 3; j++){
				var className = (j + 1) + "_row_" + (i + 1) + "_column";
				$("." + className).empty();
			}
		}
		$("#gameFinishedSpan").text("");
	});
});

var socket = io.connect('http://localhost:8080');
var isCardShown = false;

socket.on('userOnline', function (data) {
	socket.emit('connectToServer', { username : 'emrahayanoglu' });
});
socket.on('newUserOnline',function(data){
	//Write on the user log that a new user has come to room
});
socket.on('tableList',function(data){
	var html = "";
	for(var i = 0; i < data.tableList.length; i++){
		html += "<li><a href='#' class='showGamePage' data-id='"+ data.tableList[i].id +"'>"+ data.tableList[i].name +" &nbsp;&nbsp;&nbsp;&nbsp;"
			 + data.tableList[i].players.length +"/"+ data.tableList[i].playerLimit +"</a></li>"
	}
	$('#roomList').empty();
	$('#roomList').append(html);
	$('#roomList').listview('refresh');
	$('.showGamePage').click(function(){
		var selectedTableId = $(this).attr('data-id');
		socket.emit('connectToTable', {tableID: selectedTableId});
		$.mobile.changePage("#gamePage");
	});

	$("#onlineUserCount").empty();
	$("#onlineUserCount").text("-- " + data.playerCount + " Online Users --");
});
socket.on('userConnectedToTable',function(data){
	//Write on the user log that a new user has come to table
});
socket.on('gameStarted',function(data){
	console.log("A new game is started");
	console.log(data);
	//Draw card and start playing
});
socket.on('numberChosen',function(data){
	console.log(data);
	//Draw chosen number and if number is on the card, then fill the chosen number on the card
	$("#chosenNumberSpan").text(data.chosenNumber);
	if(!isCardShown){
		for(var i = 0; i < data.userCard.length; i++){
			for(var j = 0; j < data.userCard[i].length; j++){
				var className = (j + 1) + "_row_" + (i + 1) + "_column";
				$("." + className).empty();
				$("." + className).append(data.userCard[i][j]);
			}
		}
		isCardShown = true;
	}
	else{
		for(var i = 0; i < data.userCard.length; i++){
			for(var j = 0; j < data.userCard[i].length; j++){
				var className = (j + 1) + "_row_" + (i + 1) + "_column";
				if(parseInt($("." + className).text()) == data.chosenNumber){
					$("." + className).empty();
					$("." + className).append("Secili " + data.userCard[i][j]);
					break;
				}
			}
		}		
	}
});
socket.on('gameFinished',function(data){
	$("#gameFinishedSpan").text("Game is Finished");
});
socket.on('bingoWinner',function(data){
	$("#gameFinishedSpan").text("You are the Bingo Winner");
});
socket.on('gameRestarted',function(data){
	console.log(data);
});
socket.on('userDisconnectedFromTable',function(data){
	//Write on the user log that a user has disconnected from table
});
socket.on('playerDisconnectedFromTable',function(data){
	$.mobile.changePage("#roomPage");
});
socket.on('userDisconnectedFromGame',function(data){
	//Write on the user log that a user has disconnected
});
socket.on('userSendChatMessage',function(data){
	console.log(data);
});
socket.on('userSentChatMessageToUser',function(data){
	console.log(data);
});
socket.on('errorEvent',function(data){

});

