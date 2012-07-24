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

io.sockets.on('connection', function (socket) {
  socket.emit('userOnline');
  socket.on('connectToServer',function(data){
    //Add player to the room
    var player = new Player(socket.id);
    player.setName(data.username);
    player.status = "online";
    room.addPlayer(player);
    //Send Other Players that new player has connected
    utility.sendMessageToAllPlayersButPlayer('newUserOnline',{message:"Player is online",username:data.username},
      io,room.players,player);
    console.log(room);
  });
  socket.on('connectToTable',function(data){

  });
  socket.on('userLeaveFromTable',function(data){

  });
  socket.on('sendChatMessage',function(data){

  });
  socket.on('sendChatMessageToUser',function(data){

  });
  socket.on('disconnect', function(){
    //Check player status whether she is in table or game
    var player = room.getPlayer(socket.id);
    if(player.status === "online"){

    }
    else
    {

    }
    room.removePlayer(player);
    utility.sendMessageToAllPlayersButPlayer('userDisconnectedFromGame',{message:"Player is disconnected",username:player.name},
      io,room.players,player);
  });
});

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

var game = new Game();
var player = new Player("sdfdsfdsfsdf9328098032");

for (var i = 0; i < 5; i++) {
  game.createPlayerCard(player);  
}

/*
var stopwatch = new Stopwatch();
stopwatch.on('tick', function(time) {
  console.log('tick: ' + time);
});
stopwatch.start();
*/