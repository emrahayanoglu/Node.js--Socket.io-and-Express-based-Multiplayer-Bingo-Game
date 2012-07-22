function Player(playerID){
	this.id = playerID;
	this.name = "";
	this.tableID = -1;
	this.status = "";
};

Player.prototype.setName = function(name){
	this.name = name;
};

Player.prototype.getName = function(){
	return this.name;
};

Player.prototype.setTableID = function(tableID){
	this.tableID = tableID;
};

Player.prototype.getTableID = function(){
	return this.tableID;
};

Player.prototype.setStatus = function(status){
	this.status = status;
};

Player.prototype.isAvailable = function(){
	return this.status === "available";
};

Player.prototype.isInTable = function(){
	return this.status === "inTable";
};

Player.prototype.isPlaying = function(){
	return this.status === "playing";
};

module.exports = Player;