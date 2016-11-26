/**
 * Based on
 * https://hackerstribe.com/2015/node-js-interfacciarsi-ai-pin-gpio-del-raspberry-pi/
 */

var express = require('express');
var server = express();

// load modules
// var relay = require('./gpio-onoff.js');
var deviceManager = require('./components/device_manager.js');
var programUtils = require('./components/program_utils.js');

// load configuration file
var config = require('./config.json');

//initialize components
deviceManager.init(config.devices);
programUtils.init();

//var programs = programUtils.list();
//console.log(programs);
var activeProgram = programUtils.active();
console.log(activeProgram);

//console.log( programs[0]['device_1'] );

/*
 * server.get('/toggle', function (req, res) { // processiamo richiesta get
 * verso /toggle
 *  // risposta in JSON res.json(relay.toggle());
 * 
 * });
 * 
 * server.get('/on', function (req, res) { // processiamo richiesta get verso
 * /toggle
 *  // risposta in JSON res.json(relay.on());
 * 
 * });
 * 
 * server.get('/off', function (req, res) { // processiamo richiesta get verso
 * /toggle
 *  // risposta in JSON res.json(relay.off());
 * 
 * });
 * 
 * server.get('/get', function (req, res) { // processiamo richiesta get verso
 * /toggle
 *  // risposta in JSON res.json(relay.get());
 * 
 * });
 */

server.get('/', function(req, res) {

	res.status(200).send('Welcome to SmartberryPI');

});

// Express route for any other unrecognised incoming requests
server.get('*', function(req, res) {
	res.status(404).send('Unrecognised API call');
});

// Server listening on port config.port
var server = server.listen(config.port, function() {
	var port = server.address().port;

	console.log('SmartberryPI listening on port %s', port);
});