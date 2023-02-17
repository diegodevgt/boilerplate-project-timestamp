/**
 * FreeCodeCamp Timestamp microservice
 * Receive a string parameter and gives a JSON with unix and natural date format
 * @author Lior Chamla
 */
 var http = require('http');
 var path = require('path');
 var express = require('express');
 var strftime = require('strftime');
 var app = express();
 // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get('/api', (req, res) => {
  const currentDate = new Date().toUTCString();
  const currentUnix = Date.parse(currentDate);
  res.json({ unix: currentUnix, utc: currentDate });
});
 
 // route on GET with a parameter we call :date
 app.get('/api/:date?', (req, res) => {
   const dateString = req.params.date;
   const dateStringRegex = /^[0-9]+$/;
   const numbersOnly = dateStringRegex.test(dateString);
 
   if (!numbersOnly) {
     const unixTimestamp = Date.parse(dateString);
     const utcDate = new Date(unixTimestamp).toUTCString();
     console.log({ unix: unixTimestamp, utc: utcDate });
     unixTimestamp
       ? res.json({ unix: unixTimestamp, utc: utcDate })
       : res.json({ error: 'Invalid Date' });
   } else {
     const unixTimestamp = parseInt(dateString);
     const actualDate = new Date(unixTimestamp);
     const utcDate = actualDate.toUTCString();
     console.log({ unix: unixTimestamp, utc: utcDate });
     res.json({ unix: unixTimestamp, utc: utcDate });
   }
 });


 
 var listener = app.listen(3000, function () {
   console.log('Your app is listening on port ' + listener.address().port);
 });
 