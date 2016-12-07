/**
 * Devices
 */

var Device = require('./device.js').Device;

var _config;
var devices = {};


/**
 * Load config.devices and initialize the array of Device objects
 */
exports.init = function(config, programs) {
	_config = config;
	
	Object.keys(config.devices).forEach(function(key) {
		var deviceConfig = config['devices'][key];
		
		if( _config.debug == true){
			console.log("Setup Device:", key, "with config:", deviceConfig);
		}
		
		var deviceTimeline = buildTimeline(programs, key);
		
		var DeviceDriver = require('../drivers/' + deviceConfig.driver + '.js').DeviceDriver;
		var deviceDriver = new DeviceDriver(deviceConfig, config);
		
		var device = new Device(key, deviceTimeline, deviceDriver, config);
		
		devices[key] = device;
	});
};


/**
 * Get devices list
 */
exports.list = function() {
	return devices;
};


/**
 * Get device by id
 */
exports.get = function(id) {
	return devices[id];
};


/**
 * Switch off all devices
 */
exports.off = function(id) {
	if( _config.debug == true){
		console.log("Shutdown all devices...");
	}
	
	//switch off all devices
	Object.keys(devices).forEach(function(key) {
		var device = devices[key];
		
		device.off();
	});

	return;
};


/**
 * Build timeline for a Device
 * 
 * @param program
 * @returns
 */
function buildTimeline(programs, key){
	//fill 60 minutes * 24 hours = 1440 cells to off
	let timeline = Array(60 * 24);
	timeline = timeline.fill("off");

	var program = [];
	if(key in programs) {
		program = programs[key];
	}
	
	if( program.length > 0 ){
		if( _config.debug == true){
			console.log("Found ", program.length, "programs, building timeline.")
		}
		
		for (let i = 0; i < program.length; i++) {
			let timelet = program[i];
			var startMinute = timeToMinutes(timelet['at']);
			timeline = timeline.fill(timelet['status'].toLowerCase(), startMinute);
		}
	}
	else{
		if( _config.debug == true){
			console.log("Warning: device", key ," is without a program.")
		}
	}
	
	return timeline;
}


/**
 * Convert a string in HH:mm format into a numeric value that corresponds to the minute of the day.
 * Ie: 23:59 correspond to 1439 minute of the day. Full day is 1440 minute.
 * @param time
 * @returns
 */
function timeToMinutes(time) {
	var mins, arr = [];
	arr = time.split(':').map(function(item) { return parseInt(item) });
	mins = arr[0]*60 + arr[1];
	return mins;
}