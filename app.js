var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , Map = require('./Map').Map
  , Log = require('./Log').Log
  , ClientStore = require('./ClientStore').ClientStore

app.listen(80);

function handler (req, res) {
  var path = "/index.html"
  if (req.url != "/")
    path = req.url;
  fs.readFile(__dirname + path,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + path);
    }
    res.writeHead(200);
    res.end(data);
  });
}

var m = new Map(11, 11);
var midpoint = m.middle();
var x = midpoint.x;
var y = midpoint.y;
var log = new Log("Spacecow");
var cs = new ClientStore();

var battle_freq = io.of("/battle_freq").on('connection', function (socket) {
  log.info("Connection!");
  socket.emit('welcome', { msg: 'enter star fox', 'x':x, 'y':y, 'client':cs.getNext() });
  socket.on('move', function (data, callback) {
    console.log(data);
    if (m.inBounds(x + data.x, y + data.y)) {
      x += data.x;
      y += data.y;
      callback({ msg: "You are now at (" + x + ", " + y + ").", 'x':x, 'y':y });
    }
    else {
      callback({ msg: "Move failed. You are still at (" + x + ", " + y + ").", 'x':x, 'y':y });
    }
  });
});
