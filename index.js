require('dotenv').config();
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.get("/api/whoami", function (req, res) {
  const ip = req.ip;
  const language = req.headers['accept-language'];
  const software = req.headers['user-agent'];
  res.send({ip: ip, language: language, software: software});
})

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
