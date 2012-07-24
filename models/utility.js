function Utility () {};

Utility.prototype.sendMessageToAllPlayers = function(event,message,io,players) {
	for(var i = 0; i < players.length; i++){
		io.sockets.socket(players[i].id).emit(event, message);
	}
};

Utility.prototype.sendMessageToAllPlayersButPlayer = function(event,message,io,players,player) {
	for(var i = 0; i < players.length; i++){
		if(players[i].id != player.id){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}	
};

Utility.prototype.sendMessageToSpecificPlayer = function(event,message,io,player) {
	io.sockets.socket(player.id).emit(event,message);
};

Utility.prototype.sendMessageToTable = function(event,message,io,table) {
	for(var i = 0; i < table.players.length; i++){
		io.sockets.socket(table.players[i].id).emit(event, message);
	}	
};

Utility.prototype.sendMessageToAllFreePlayers = function(event,message,io,players) {
	for(var i = 0; i < players.length; i++){
		if(players[i].status === "online"){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}
};

module.exports = Utility;