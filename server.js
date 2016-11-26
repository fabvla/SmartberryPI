var express = require('express'); // Usiamo libreria express per facilitarci il routing // npm install express --save
var server = express();

var relay = require('./gpio-onoff.js');

var config = require('./config.json'); // file di configurazione

server.get('/toggle', function (req, res) { // processiamo richiesta get verso /toggle

  // risposta in JSON
  res.json(relay.toggle());

});

server.get('/on', function (req, res) { // processiamo richiesta get verso /toggle

  // risposta in JSON
  res.json(relay.on());

});

server.get('/off', function (req, res) { // processiamo richiesta get verso /toggle

  // risposta in JSON
  res.json(relay.off());

});

server.get('/get', function (req, res) { // processiamo richiesta get verso /toggle

  // risposta in JSON
  res.json(relay.get());

});

// Express route for any other unrecognised incoming requests
server.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});

var server = server.listen(config.port, function () { // server in ascolto sulla porta 5000

  var host = server.address().address;
  var port = server.address().port;

  console.log('Server Running at http://%s:%s', host, port);

});