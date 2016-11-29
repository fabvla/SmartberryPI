/**
 * Remote MOCK that emulate remote_switchpush Driver with One button (in Switch Push Button mode) Driver.
 * This driver simulate the push of the button setting the GPIO pin (corresponding on ON or OFF) to "ON" for 1 sec, than to "OFF". 
 * 
 * This driver requires to specify two different PIN for each Device in config.json, like:
 * 
 *	"device_1": {
 *  	"name": "Lamp 1",
 *  	"driver": "remote_switchpush_mock",
 *   	"pin": 21
 *  },
 * 
 */

var sleep = require('sleep');

var _pin;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function DeviceDriver(config) {
	this._pin = config.pin;
}
exports.DeviceDriver = DeviceDriver;


/**
 * Simulate Button ON pressed for 1 sec
 */
DeviceDriver.prototype.on = function() {
	console.log("_pin.writeSync(1) for port:", this._pin);
	sleep.sleep(1);
	console.log("_pin.writeSync(0) for port:", this._pin);
};


/**
 * Simulate Button OFF pressed for 1 sec
 */
DeviceDriver.prototype.off = function() {
	console.log("_pin.writeSync(1) for port:", this._pin);
	sleep.sleep(1);
	console.log("_pin.writeSync(0) for port:", this._pin);
};
