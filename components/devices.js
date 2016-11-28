/**
 * Devices
 */

var Device = require('./device.js').Device;

var devices = {};


/**
 * Load config.devices and initialize the array of Device objects
 */
exports.init = function(config, program) {
	Object.keys(config.devices).forEach(function(key) {
		var deviceConfig = config['devices'][key];
		var deviceTimeline = buildTimeline(program[key]);
		
		var DeviceDriver = require('../drivers/' + deviceConfig.driver + '.js').DeviceDriver;
		var deviceDriver = new DeviceDriver(deviceConfig);
		
		console.log("Setup Device:", key, "with config:", deviceConfig)

		var device = new Device(key, deviceTimeline, deviceDriver);
		
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
 * Build timeline for a Device
 * 
 * @param program
 * @returns
 */
function buildTimeline(program){
	//fill 60 minutes * 24 hours = 1440 cells to off
	let timeline = Array(60 * 24);
	timeline = timeline.fill("off");

	for (let i = 0; i < program.length; i++) {
		let timelet = program[i];
		var startMinute = timeToMinutes(timelet['at']);
		timeline = timeline.fill(timelet['status'].toLowerCase(), startMinute);
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