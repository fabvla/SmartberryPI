/**
 * Devices
 */

var devices = {};


/**
 * Load config.devices and initialize the array setting id and current_status=false
 */
exports.init = function(deviceList) {
	Object.keys(deviceList).forEach(function(key) {
		var device = deviceList[key];

		device.id = key;
		device.current_status = false;
	});

	devices = deviceList;
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

