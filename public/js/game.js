var socket = io.connect('http://10.10.20.85:8080');

socket.on('userOnline', function (data) {
	socket.emit('connectToServer', { username : 'emrahayanoglu' });
});
socket.on('newUserOnline',function(data){
	console.log(data);
});
socket.on('tableList',function(data){
	console.log("tableList called");
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
});
socket.on('userConnectedToTable',function(data){
	console.log(data);
});
socket.on('gameStarted',function(data){
	console.log(data);
});
socket.on('numberChosen',function(data){
	console.log(data);
});
socket.on('gameFinished',function(data){
	console.log(data);
});
socket.on('gameRestarted',function(data){
	console.log(data);
});
socket.on('userDisconnectedFromTable',function(data){
	console.log("userDisconnectedFromTable");
});
socket.on('playerDisconnectedFromTable',function(data){
	console.log('playerDisconnectedFromTable');
	$.mobile.changePage("#roomPage");
});
socket.on('userDisconnectedFromGame',function(data){
	console.log(data);
});
socket.on('userSendChatMessage',function(data){
	console.log(data);
});
socket.on('userSentChatMessageToUser',function(data){
	console.log(data);
});
socket.on('errorEvent',function(data){

});

$('#roomPage').live('pageinit',function(event){

});

$('#gamePage').live('pageshow',function(event){
	$(".backToRoomPage").click(function(){
		socket.emit('userLeaveFromTable',{});
	})
});

