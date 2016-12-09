var app = require('./app.js');
var globalID = app.globalID;

var method = Entity.prototype;

function Entity(age) {
    this._age = age;
	this._id = globalID;
	this._alive = true;
	this._timeoutSet = false;
	globalID++;
}

method.getId = function () {
	return this._id;
};

method.getAge = function() {
    return this._age;
};
method.incAge = function () {
	this._age++;
}

method.isTimeoutSet = function () {
	return this._timeoutSet;
};
method.setTimeout = function () {
	this._timeoutSet = true;
};
method.resetTimeout = function () {
	this._timeoutSet = false;
};

method.isAlive = function () {
	return this._alive;
};
method.kill = function () {
	this._alive = false;
};
method.ressurect = function () {
	this._alive = true;
};

method.process = function () {
	this.incAge();
	if(this.getAge() >= 40)
	{
		this.kill();
	}
};

module.exports = Entity;