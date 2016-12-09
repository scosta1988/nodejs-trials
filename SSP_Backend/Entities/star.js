var PassiveEntityModule = require('./passiveEntity.js')
var PassiveEntity = PassiveEntityModule.PassiveEntity

var StarArray = []

function Star(name, mass, radius, color) {
	this._mass = mass
	this._radius = radius
	this._color = color
	this._orbitingObjects = []

	this.getMass = function () {
		return this._mass
	}
	this.setMass = function (newMass) {
		this._mass = newMass
	}

	this.getRadius = function () {
		return this._radius
	}
	this.setRadius = function (newRadius) {
		this._radius = newRadius
	}

	this.getColor = function () {
		return this._color
	}
	this.setColor = function (newColor) {
		this._color = newColor
	}

	this.getOrbitingObjects = function () {
		return this._orbitingObjects
	}
	this.addOrbitingObject = function (newObject) {
		this._orbitingObjects.add(newObject)
	}
	this.removeOrbitingObject = function (object) {
		var index = this._orbitingObjects.indexOf(object)
		this._orbitingObjects.splice(index, 1)
	}

	this.__proto__ = new PassiveEntity(name)
	
	StarArray.push(this)
}

module.exports.Star = Star
module.exports.StarArray = StarArray