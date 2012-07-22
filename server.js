var express = require('express')
var socket = require('socket.io');
var Stopwatch = require('./models/stopwatch');
var Game = require('./models/game.js');

var io = socket.listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
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

for (var i = 0; i < 5; i++) {
  game.createPlayerCard();  
}

/*
var stopwatch = new Stopwatch();
stopwatch.on('tick', function(time) {
  console.log('tick: ' + time);
});
stopwatch.start();
*/