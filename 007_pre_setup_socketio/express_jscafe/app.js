/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bbs = require('./routes/bbs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/bbs', bbs.bbs);
app.post('/bbs', bbs.bbs);

// createServerの返り値を変数に入れる。
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// socket.ioのモジュールを読み込み、bbsのモジュールにsocketを渡しておく。
var io = require('socket.io');
var io = io.listen(server);

// io.socketsは接続された全てのsocketを指します。
// on('connection')で接続した時のアクションを登録します。
// ここでは、接続したsocketを受け取り、bbs.message関数に渡します。
io.sockets.on('connection', function(socket) {
  bbs.message(socket);
});
