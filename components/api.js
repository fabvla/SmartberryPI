var express = require('express');
var path = require('path');
var fs = require('fs');
var version = require('../package.json').version;

module.exports = function(app, io, devices, programs){
	//***************
	//	API
	//***************
	
	/**
	 * Get all devices with timetable and status
	 */
	app.get('/api/devices', function (req, res) {
		console.log("GET /api/devices");
		res.status(200).json(devices.list());
	});

	
	/**
	 * Get a specific device by id
	 */
	app.get('/api/devices/:id', function (req, res) {		
		console.log("GET /api/device/", req.params.id);
		
		if (typeof req.params.id !== 'undefined'){
			res.status(200).json(devices.get(req.params.id));
	  	} else{
	  		res.status(400).json({status: 'error', error: 'Provide valid device id'});
		}		
	});
	
	
	/**
	 * Get all available programs
	 */
	app.get('/api/programs', function (req, res) {
		console.log("GET /api/programs");
		res.status(200).json(programs.list());
	});

	
	/**
	 * Get current (active) program
	 */
	app.get('/api/programs/active', function (req, res) {
		console.log("GET /api/programs/active");
		res.status(200).json(programs.active());
	});

	
	/**
	 * handle 404 error for API
	 */
	app.all('/api/*', function(req, res){
		res.status(404).json({status: 'error', error_code: 404, err: 'API entrypoint not found'});
	});
	
	
	//***************
	//	WEB
	//***************
	
	/**
	 * Serving index view
	 */
	app.get(['/', '/index.html'], function(req, res){
		res.render('index', {
			cache: true,
			title: 'SmartberryPI',
			version: version
		});
	});
	
	
	/**
	 * serve as static all the other routes
	 */
	var web_dir = path.resolve(__dirname, '../www');
	app.get('*', express.static(web_dir));

	
	/**
	 * Middleware that handle 404 error for web pages
	 */
	app.use(function(req, res, next){
	    res.status(404).sendFile(web_dir + '/404.html');
	});
}