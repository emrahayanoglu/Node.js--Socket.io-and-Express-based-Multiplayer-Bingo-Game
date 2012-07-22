r = require('mersenne');

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
	//Remove from nonSelectedNumbers and Add to the selectedNumbers
	var chosenNumberIndex = r.rand(this.nonSelectedNumbers.length - 1);
	var number = nonSelectedNumbers[chosenNumberIndex];
	this.nonSelectedNumbers.remove(chosenNumberIndex);
	this.selectedNumbers.push(number);
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
		chosenNumberArray.push(chosenNumber);
		if(chosenNumber == 90 && card[8].length < 3){
			card[8].push(chosenNumber);
			cardNumberCount++;
		}
		else if(card[parseInt(chosenNumber / 10)].length < 3){
			card[parseInt(chosenNumber / 10)].push(chosenNumber);
			cardNumberCount++;
		}
	}
	player.card = card;
	player.cardInStraight = chosenNumberArray;
};

Game.prototype.isPlayerWinsBingo = function (player) {
	var bingoArray = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
	var cardCount = 0;
	for (var i = 0; i < this.selectedNumbers.length; i++) {
		for(var j = 0; j < player.card.length; j++){
			if(this.selectedNumbers[i] == player.cardInStraight[j]){
				bingoArray[cardCount] = true;
				cardCount++;
			}
			else
			{
				bingoArray[cardCount] = false;
				cardCount++;
				break;
			}
		}
	}
	var result = true;
	for (var i = 0; i < bingoArray.length; i++) {
		if(bingoArray[i] == false){
			result = false;
			break;
		}
	}
	return result;
};

Game.prototype.startGame = function(table) {
	// Check if the table is full or not
	// If table is full check players' statuses
};

module.exports = Game;