Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function Table(tableID){
	this.id = tableID;
	this.name = "";
	this.status = "";
	this.players = [];
};

Table.prototype.setName = function(name){
	this.name = name;
};

Table.prototype.getName = function(){
	return this.name;
};

Table.prototype.setStatus = function(status){
	this.status = status;
};

Table.prototype.isAvailable = function(){
	return this.status === "available";
};

Table.prototype.isFull = function(){
	return this.status === "full";
};

Table.prototype.isPlaying = function(){
	return this.status === "playing";
};

Table.prototype.addPlayer = function(player) {
	this.players.push(player);
};

Table.prototype.removePlayer = function(player){
	var index = -1;
	for(var  i = 0; i < this.players.length; i++){
		if(this.players[i].id === player.id){
			index = i;
			break;
		}
	}
	this.players.remove(index);
};

module.exports = Table;