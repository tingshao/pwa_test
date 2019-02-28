var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// your express configuration here
app.use(express.static(path.join(__dirname, '.')));
var httpServer = http.createServer(app);
httpServer.listen(8000);
