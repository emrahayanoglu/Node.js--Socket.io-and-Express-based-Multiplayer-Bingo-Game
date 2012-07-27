Game = require('./game.js');
Table = require('./table.js');
var uuid = require('node-uuid');

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

Utility.prototype.sendEventToTableInPlay = function(event,message,io,table) {
	for (var i = 0; i < table.players.length; i++) {
		message.userId = table.players[i].id;
		message.userCard = table.players[i].card;
		message.userCardInStraight = table.players[i].cardInStraight;
		io.sockets.socket(table.players[i].id).emit(event, message);
	};
};

Utility.prototype.sendEventToAllFreePlayers = function(event,message,io,players) {
	for(var i = 0; i < players.length; i++){
		if(players[i].status === "available"){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}
};

Utility.prototype.sendEventToAllFreePlayersButPlayer = function(event,message,io,players,player) {
	for(var i = 0; i < players.length; i++){
		if(players[i].status === "available" && players[i].id != player.id){
			io.sockets.socket(players[i].id).emit(event, message);
		}
	}
};

Utility.prototype.createSampleTables = function(tableListSize) {
	var tableList = [];
	for(var i = 0; i < tableListSize; i++){
		var game = new Game();
		var table = new Table(uuid.v4());
		table.setName("jstanbul Room " + (i + 1));
		table.gameObj = game;
		table.state = "available";
		tableList.push(table);
	}
	return tableList;
};

module.exports = Utility;