var EntityModule = require('./entity.js')

var PassiveEntityArray = []

function PassiveEntity(name) {
	this._name = name
	
	this.getName = function(){
		return this._name
	}
	this.setName = function(newName){
		this._name = newName
	}
	
	this.__proto__ = new EntityModule.Entity()
	
	PassiveEntityArray.push(this)
}

module.exports.PassiveEntity = PassiveEntity;
module.exports.PassiveEntityArray = PassiveEntityArray