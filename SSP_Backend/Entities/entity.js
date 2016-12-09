var globalID = 0

var EntityArray = []

function Entity() {
	this._id = globalID
	
	this.getId = function () {
		return this._id
	}
	
	globalID++
	
	EntityArray.push(this)
}

module.exports.Entity = Entity
module.exports.EntityArray = EntityArray