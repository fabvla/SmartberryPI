/**
 * Remote With Two different buttons (one for ON and one for OFF) Driver.
 * This driver simulate the push of the button setting the GPIO pin (corresponding on ON or OFF) to "ON" for 1 sec, than to "OFF". 
 * 
 * This driver requires to specify two different PIN for each Device in config.json, like:
 * 
 *	"device_1": {
 *  	"name": "Lamp 1",
 *   	"pin_on": 21,
 *   	"pin_off": 22
 *  },
 * 
 */

var Gpio = require("onoff").Gpio;
var sleep = require('sleep');

var _pin_on, _pin_off;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function DeviceDriver(config) {
//	this._pin_on = config.pin_on;
//	this._pin_off = config.pin_off;
	this._pin_on = new Gpio(config.pin_on, 'out');
	this._pin_off = new Gpio(config.pin_off, 'out');
}
exports.DeviceDriver = DeviceDriver;


/**
 * Simulate Button ON pressed for 1 sec
 */
DeviceDriver.prototype.on = function() {
	console.log("ONOFF set to ON for pin", this._pin_on);
	this._pin_on.writeSync(1);
	sleep.sleep(1);
	this._pin_on.writeSync(0);
};


/**
 * Simulate Button OFF pressed for 1 sec
 */
DeviceDriver.prototype.off = function() {
	console.log("ONOFF set to OFF for pin", this._pin_off);
	this._pin_off.writeSync(1);
	sleep.sleep(1);
	this._pin_off.writeSync(0);
};
