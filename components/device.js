/**
 * Device Object
 */

var _id, _status, _timeline, _driver;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function Device(id, timeline, driver) {
	this._id = id;
	this._status = -1;  //initialize with an indeterminated value, to force at the first time the switch on/off of the remote
	this._timeline = timeline;
	this._driver = driver;
}
exports.Device = Device;


/**
 * Get device id
 */
Device.prototype.id = function() {
	return this._id;
};


/**
 * Get devices status
 */
Device.prototype.status = function() {
	return this._status;
};


/**
 * Get device timeline
 */
Device.prototype.timeline = function() {
	return this._timeline;
};


/**
 * Switch ON the Device
 */
Device.prototype.on = function() {
	if( this._status != true ){
		console.log("Device", this._id, "on(): switched to ON");
		this._driver.on();
		this._status = true;
	}
	else{
		console.log("Device", this._id, "on(): already ON");
	}
};


/**
 * Switch OFF the Device
 */
Device.prototype.off = function() {
	if( this._status != false ){
		console.log("Device", this._id, "off(): switched to OFF");
		this._driver.off();
		this._status = false;
	}
	else{
		console.log("Device", this._id, "off(): already OFF");
	}
};


/**
 * Toggle (invert) Device state
 */
Device.prototype.toggle = function() {
	if( this._status == true ){
		console.log("Device", this._id, "toggle(): switched to OFF");
		this._driver.off();
		this._status = false;
	}
	else{
		console.log("Device", this._id, "toggle(): switched to ON");
		this._driver.on();
		this._status = true;
	}
};