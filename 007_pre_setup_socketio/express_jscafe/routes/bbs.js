var messages = [];
exports.bbs = function(req, res){
  var message = req.body.message;
  messages.push(message);
  res.render('bbs', { title: 'JSCafe', messages: messages });
};

// message関数を外部化する。
// socketを受け取る。
exports.message = function(socket) {
  // socketが messageイベントを受けたら、messages配列にpushする。
  // その後、全体にbroadcastする。
  socket.on('message', function(message) {
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
};
