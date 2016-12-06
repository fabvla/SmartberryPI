/**
 * Remote MOCK that emulate remote_onoff Driver with Two different buttons (one for ON and one for OFF) Driver.
 * This driver simulate the push of the button setting the GPIO pin (corresponding on ON or OFF) to "ON" for 1 sec, than to "OFF". 
 * 
 * This driver requires to specify two different PIN for each Device in config.json, like:
 * 
 *	"device_1": {
 *  	"name": "Lamp 1",
 *  	"driver": "remote_onoff_mock",
 *  	"options": {
 *   	    "pin_on": 21,
 *   	    "pin_off": 22
 *       }
 *  }
 * 
 */

var sleep = require('sleep');

var _pin_on, _pin_off;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function DeviceDriver(config) {
	this._pin_on = config.options.pin_on;
	this._pin_off = config.options.pin_off;
}
exports.DeviceDriver = DeviceDriver;


/**
 * Simulate Button ON pressed for 1 sec
 */
DeviceDriver.prototype.on = function() {
	console.log("_pin_on.writeSync(1) for port:", this._pin_on);
	sleep.sleep(1);
	console.log("_pin_on.writeSync(0) for port:", this._pin_on);
};


/**
 * Simulate Button OFF pressed for 1 sec
 */
DeviceDriver.prototype.off = function() {
	console.log("_pin_off.writeSync(1) for port:", this._pin_off);
	sleep.sleep(1);
	console.log("_pin_off.writeSync(0) for port:", this._pin_off);
};
