var ActiveEntityModule = require('./activeEntity.js')
var ActiveEntity = ActiveEntityModule.ActiveEntity

var EntityModule = require('./entity.js')

var bigG = 6.674 * Math.pow(10, -11)

function OrbitingEntity(name, orbitedObjectID, currentPosition, currentVelocity){
	this._orbitedObjectID = orbitedObjectID
	this._currentPosition = currentPosition
	this._currentVelocity = currentVelocity
	
	this.calculateNewPositionAndVelocity = function(){
		var EntityArray = EntityModule.EntityArray
		var orbitedObjects = EntityArray.filter.call(this, function(value){
			return value.getId == this._orbitedObjectID
		})
		
		if(orbitedObjects.length == 0){
			return 'error'
		}
		
		var orbitedObject = orbitedObjects[0]
		
		if(orbitedObject.mass == null){
			return 'error'
		}
		
		var acceleration = (bigG * orbitedObject.mass)/Math.pow(Math.pow(Math.pow(currentPosition.x, 1/3) + Math.pow(currentPosition.y, 1/3) + Math.pow(currentPosition.z, 1/3), 3), 2)
	}
	
	this.__proto__ = new ActiveEntity(name)
}