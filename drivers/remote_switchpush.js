/**
 * NOTE: NOT TESTED
 * Remote that emulate remote_switchpush Driver with One button (in Switch Push Button mode) Driver.
 * This driver simulate the push of the button setting the GPIO pin (corresponding on ON or OFF) to "ON" for 1 sec, than to "OFF". 
 * 
 * This driver requires to specify two different PIN for each Device in config.json, like:
 * 
 *	"device_1": {
 *  	"name": "Lamp 1",
 *  	"driver": "remote_switchpush",
 *      "options": {
 *   	    "pin": 21
 *      }
 *  }
 * 
 */

var Gpio = require("onoff").Gpio;
var sleep = require('sleep');

var _pin, _config;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function DeviceDriver(deviceConfig, config) {
	this._pin = new Gpio(deviceConfig.options.pin, 'out');
	this._config = config;
}
exports.DeviceDriver = DeviceDriver;


/**
 * Simulate Button ON pressed for 1 sec
 */
DeviceDriver.prototype.on = function() {
	if( this._config.debug == true){
		console.log("SWITCHPUSH set to ON for pin", this._pin);
	}
	this._pin.writeSync(1);
	sleep.usleep(500000); //0.5 sec
	this._pin.writeSync(0);
};


/**
 * Simulate Button OFF pressed for 1 sec
 */
DeviceDriver.prototype.off = function() {
	if( this._config.debug == true){
		console.log("SWITCHPUSH set to OFF for pin", this._pin);
	}
	this._pin.writeSync(1);
	sleep.usleep(500000); //0.5 sec
	this._pin.writeSync(0);
};
