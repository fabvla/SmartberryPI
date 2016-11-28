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
		var timeline = buildTimeline(program[key]);
		var device = new Device(key, timeline, config.driver);

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
	//fill 60 minutes * 24 hours = 1440 cells to 0/off
	let timeline = Array(60 * 24);
	timeline = timeline.fill(false);

	for (let i = 0; i < program.length; i++) {
		let timelet = program[i];
		var startMinute = timeToMinutes(timelet['at']);
		timeline = timeline.fill(timelet['status'], startMinute);
	}
		
	return timeline;
}


function timeToMinutes(time) {
	  var mins, arr = [];
	  arr = time.split(':').map(function(item) { return parseInt(item) });
	  mins = arr[0]*60 + arr[1];
	  return mins;
}