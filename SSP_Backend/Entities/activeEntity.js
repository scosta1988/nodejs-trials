var EntityModule = require('./entity.js')

var ActiveEntityArray = []

function ActiveEntity(name) {
	this._name = name
	this._timeoutSet = false
	this._isAlive = false
	
	this.getName = function(){
		return this._name
	}
	this.setName = function(newName){
		this._name = newName
	}

	this.isTimeoutSet = function(){
		return this._timeoutSet
	}
	this.setTimeout = function(){
		this._timeoutSet = true
	}
	this.resetTimeout = function(){
		this._timeoutSet = false
	}

	this.isAlive = function(){
		return this._isAlive
	}
	this.setAlive = function(){
		this._isAlive = true
	}
	this.setDead = function(){
		this._isAlive = false
	}
	
	this.process = function(){
		
	}
	
	this.__proto__ = new EntityModule.Entity()
	
	ActiveEntityArray.push(this)
}

module.exports.ActiveEntity = ActiveEntity;
module.exports.ActiveEntityArray = ActiveEntityArray