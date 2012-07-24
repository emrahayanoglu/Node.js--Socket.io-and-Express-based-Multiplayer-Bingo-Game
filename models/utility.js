function Utility () {};

Utility.prototype.sendEventToAllPlayers = function(event,message,io,players) {
	for(var i = 0; i < players.length; i++){
		io.sockets.socket(players[i].id).emit(event, message);
	}
};

Utility.prototype.sendEventToAllPlayersButPlayer = function(event,message,io,players,player) {
	for(var i = 0; i < players.length; i++){
		if(players[i].id != player.id){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}	
};

Utility.prototype.sendEventToSpecificPlayer = function(event,message,io,player) {
	io.sockets.socket(player.id).emit(event,message);
};

Utility.prototype.sendEventToTable = function(event,message,io,table) {
	for(var i = 0; i < table.players.length; i++){
		io.sockets.socket(table.players[i].id).emit(event, message);
	}	
};

Utility.prototype.sendEventToAllFreePlayers = function(event,message,io,players) {
	for(var i = 0; i < players.length; i++){
		if(players[i].status === "available"){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}
};

module.exports = Utility;