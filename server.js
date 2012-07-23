var express = require('express')
var socket = require('socket.io');
var Stopwatch = require('./models/stopwatch');
var Game = require('./models/game.js');
var Player = require('./models/player.js');
var Table = require('./models/table.js');
var Utility = require('./models/utility.js');

var io = socket.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('userOnline');
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('connectToServer',function(data){

  });
  socket.on('connectToTable',function(data){

  });
  socket.on('userLeaveFromTable',function(data){

  });
  socket.on('sendChatMessage',function(data){

  });
  socket.on('sendChatMessageToUser',function(data){

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