var ActiveEntityModule = require('./activeEntity.js')
var ActiveEntity = ActiveEntityModule.ActiveEntity

var AsteroidArray = []

function Asteroid(name, mass, radius, color, orbitingID){
	this._mass = mass
	this._radius = radius
	this._color = color
	this._orbitingID = orbitingID
	
	
	
	this.__proto__ = new ActiveEntity(name)
	
	AsteroidArray.push(this)
}

module.exports.Asteroid = Asteroid
module.exports.AsteroidArray = AsteroidArray