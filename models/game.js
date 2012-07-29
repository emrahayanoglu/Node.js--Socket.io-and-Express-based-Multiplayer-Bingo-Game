r = require('mersenne');
Stopwatch = require('./stopwatch.js');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function Game(){
	this.numbers = [1,2,3,4,5,6,7,8,9,10
					,11,12,13,14,15,16,17,18,19,20
					,21,22,23,24,25,26,27,28,29,30
					,31,32,33,34,35,36,37,38,39,40
					,41,42,43,44,45,46,47,48,49,50
					,51,52,53,54,55,56,57,58,59,60
					,61,62,63,64,65,66,67,68,69,70
					,71,72,73,74,75,76,77,78,79,80
					,81,82,83,84,85,86,87,88,89,90];
	this.nonSelectedNumbers = [1,2,3,4,5,6,7,8,9,10
					,11,12,13,14,15,16,17,18,19,20
					,21,22,23,24,25,26,27,28,29,30
					,31,32,33,34,35,36,37,38,39,40
					,41,42,43,44,45,46,47,48,49,50
					,51,52,53,54,55,56,57,58,59,60
					,61,62,63,64,65,66,67,68,69,70
					,71,72,73,74,75,76,77,78,79,80
					,81,82,83,84,85,86,87,88,89,90];
	this.selectedNumbers = [];
};

Game.prototype.chooseNumber = function() {
	//Remove from nonSelectedNumbers and add to the selectedNumbers
	if(this.selectedNumbers.length < 89){
		var chosenNumberIndex = r.rand(this.nonSelectedNumbers.length - 1);
		var number = this.nonSelectedNumbers[chosenNumberIndex];
		this.nonSelectedNumbers.remove(chosenNumberIndex);
		this.selectedNumbers.push(number);
		return number;
	}
	else if(this.nonSelectedNumbers.length == 1){
		var chosenNumberIndex = 0;
		var number = this.nonSelectedNumbers[chosenNumberIndex];
		this.nonSelectedNumbers.remove(chosenNumberIndex);
		this.selectedNumbers.push(number);
		return number;		
	}
};

Game.prototype.createPlayerCard = function(player){
	var newNumberArray = this.numbers.slice();
	var chosenNumberArray = [];
	//Choose 15 numbers from the numbers array
	var card = [[],[],[],[],[],[],[],[],[]];
	var cardNumberCount = 0;
	while(cardNumberCount < 15){
		var chosenNumberIndex = r.rand(89 - cardNumberCount);
		var chosenNumber = newNumberArray[chosenNumberIndex];
		newNumberArray.remove(chosenNumberIndex);
		if(chosenNumber == 90 && card[8].length < 3){
			card[8].push(chosenNumber);
			cardNumberCount++;
			chosenNumberArray.push(chosenNumber);
		}
		else if(card[parseInt(chosenNumber / 10)].length < 3){
			card[parseInt(chosenNumber / 10)].push(chosenNumber);
			cardNumberCount++;
			chosenNumberArray.push(chosenNumber);
		}
	}
	player.card = card;
	player.cardInStraight = chosenNumberArray;
};

Game.prototype.isPlayerWinsBingo = function (player) {
	var bingoArray = [];
	console.log("Player Card Length: " + player.cardInStraight.length);
	for (var i = 0; i < this.selectedNumbers.length; i++) {
		for(var j = 0; j < player.cardInStraight.length; j++){
			if(this.selectedNumbers[i] == player.cardInStraight[j]){
				bingoArray.push(true);
			}
		}
	}
	console.log(bingoArray);
	return bingoArray.length == 15;
};

Game.prototype.startGame = function(utility,io,table) {
    var stopwatch = new Stopwatch();
    var gameObject = this;
    stopwatch.on('tick', function(time) {
      var chosenNumber = gameObject.chooseNumber();
      utility.sendEventToTableInPlay('numberChosen',{chosenNumber: chosenNumber},io,table);
      var bingoWinners = gameObject.checkAnyPlayerWinsBingo(table);
      console.log(gameObject.selectedNumbers.length);
      console.log(gameObject.nonSelectedNumbers.length);
      if(bingoWinners.length > 0){
      	//Whoorayyy at least one player wins the bingo
      	utility.sendEventToTableInPlay('gameFinished',{message:"Game is finished"},io,table);
      	utility.sendEventToSelectedPlayers('bingoWinner',{message:"You are the bingo winner!"},io,bingoWinners);
      	stopwatch.stop();
      	stopwatch.reset();
      	table.status = "full";
      	for(var i = 0; i < table.players.length; i++){
      		table.players[i].status = "inTable";
      	}
      	//Ask players to play again or leave the room
      }
    });
    stopwatch.start();
};

Game.prototype.checkAnyPlayerWinsBingo = function(table) {
	var found = [];
	for(var i = 0; i < table.players.length; i++){
		if(this.isPlayerWinsBingo(table.players[i])){
			found.push(table.players[i]);
		}
	}
	return found;
};

module.exports = Game;