var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , Map = require('./Map').Map

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


;

var m = new Map(10, 10);
var midpoint = m.middle();
var x = midpoint.x;
var y = midpoint.y;

var battle_freq = io.of("/battle_freq").on('connection', function (socket) {
  socket.emit('welcome', { msg: 'enter star fox' });
  socket.on('move', function (data, callback) {
    console.log(data);
    if (m.inBounds(x + data.x, y + data.y)) {
      x += data.x;
      y += data.y;
      callback("You are now at (" + x + ", " + y + ").");
    }
    else {
      callback("Move failed. You are still at (" + x + ", " + y + ").");
    }
  });
});
