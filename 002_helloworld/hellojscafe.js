var http = require('http');

var server = http.createServer(function (req, res) {
    res.end("Hello JSCafe");
});

server.on('listening', function () {
    console.log('Server started, listening on : 3000');
});

server.listen(3000);
