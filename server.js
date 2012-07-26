var express = require('express')
var socket = require('socket.io');
var Stopwatch = require('./models/stopwatch');
var Game = require('./models/game.js');
var Player = require('./models/player.js');
var Table = require('./models/table.js');
var Utility = require('./models/utility.js');
var Room = require('./models/room.js');

var io = socket.listen(8080);

var utility = new Utility();

var room = new Room("Test Room");
room.tables = utility.createSampleTables(10);

io.sockets.on('connection', function (socket) {
  socket.emit('userOnline');
  socket.on('connectToServer',function(data){
    //Add player to the room
    var player = new Player(socket.id);
    player.setName(data.username);
    player.status = "available";
    room.addPlayer(player);
    //Send Other Players that new player has connected
    utility.sendEventToAllPlayersButPlayer('newUserOnline',
      {message:"Player is online",username:data.username},io,room.players,player);
    utility.sendEventToAllPlayers('tableList',{tableList: room.getTableMessage()},io,room.players);
  });
  socket.on('connectToTable',function(data){
    var player = room.getPlayer(socket.id);
    var table = room.getTable(data.tableID);
    if(table.isTableAvailable() && table.addPlayer(player)){
      player.tableID = table.id;
      player.status = 'inTable';
      utility.sendEventToTable('userConnectedToTable',{message:"Player is in Table"},io,table);
      utility.sendEventToAllPlayers('tableList',{tableList: room.getTableMessage()},io,room.players);
    }
    else{
      socket.emit('errorEvent',{errorNo:100, message: "The table is full!!!"});
    }
  });
  socket.on('userLeaveFromTable',function(data){
    //Check if the user is in table
    var player = room.getPlayer(socket.id);
    if(player.tableID != ""){
      var table = room.getTable(player.tableID);
      table.removePlayer(player);
      utility.sendEventToTable('userDisconnectedFromTable',{username:player.name},io,table);
      utility.sendEventToAllFreePlayersButPlayer('userDisconnectedFromTable',{username:player.name},io,room.players,player);
      socket.emit('playerDisconnectedFromTable',{username:player.name});
      utility.sendEventToAllPlayers('tableList',{tableList: room.getTableMessage()},io,room.players);
    }
    else{
      socket.emit('errorEvent',{errorNo:101, message: "You are not connected to table!!!"}); 
    }
  });
  socket.on('sendChatMessage',function(data){
    var player = room.getPlayer(socket.id);
    if(player.tableID == ""){
      //Send Message to the Available Players
      utility.sendEventToAllFreePlayers('userSendChatMessage',{username:player.name,message:data.message},io,room.players);
    }
    else
    {
      //Send Message to the same Table Players
      var table = room.getTable(player.tableID);
      utility.sendEventToTable('userSendChatMessage',{username:player.name},io,table);
    }
  });
  socket.on('sendChatMessageToUser',function(data){
    var player = room.getPlayer(socket.id);
    var toPlayer = room.getPlayer(data.playerID);
    utility.sendEventToSpecificPlayer('userSentChatMessageToUser',{username:player.name},io,toPlayer);
  });
  socket.on('disconnect', function(){
    //Check player status whether she is in table or game
    var player = room.getPlayer(socket.id);
    if(player.status != "available"){
      //Remove from table
      var table = room.getTable(player.tableID);
      table.removePlayer(player);
    }
    //Remove from room
    room.removePlayer(player);
    utility.sendEventToAllPlayersButPlayer('userDisconnectedFromGame',
      {message:"Player is disconnected",username:player.name},io,room.players,player);
    utility.sendEventToAllPlayers('tableList',{tableList: room.getTableMessage()},io,room.players);
  });
});

// <Express Section>

var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('index', {
	    message : 'De groeten'
	});
});

app.listen(3000);

// </Express Section>

/*
var game = new Game();
var player = new Player("sdfdsfdsfsdf9328098032");

for (var i = 0; i < 5; i++) {
  game.createPlayerCard(player);  
}
*/

/*
var stopwatch = new Stopwatch();
stopwatch.on('tick', function(time) {
  console.log('tick: ' + time);
});
stopwatch.start();
*/