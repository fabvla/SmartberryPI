/**
 * Device Object
 */

var _id, _status, _timeline;


/**
 * Constructor
 * 
 * @param id
 * @returns
 */
function Device(id, timeline) {
	this._id = id;
	this._status = false;
	this._timeline = timeline;
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
