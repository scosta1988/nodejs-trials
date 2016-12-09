var ActiveEntityModule = require('./activeEntity.js')
var ActiveEntity = ActiveEntityModule.ActiveEntity

var PlanetArray = []

function Planet(name, mass, radius, color, starID) {
	this._mass = mass
	this._radius = radius
	this._color = color
	this._starID = starID
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

	this.getStarID = function () {
		return this._starID
	}
	this.setStarID = function (newStarID) {
		this._starID = newStarID
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

	this.__proto__ = new ActiveEntity(name)

	PlanetArray.push(this)
}

module.exports.Planet = Planet
module.exports.PlanetArray = PlanetArray