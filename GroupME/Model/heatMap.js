var mongoose = require('mongoose')
var Schema = mongoose.Schema

var heatMapSchema = new Schema({
	edge: Number, //Radius
	heat: [{
		lat: Number,
		lng: Number
	}]
})

//METHODS
//Edge
heatMapSchema.methods.getEdge = function(){
	return this.edge
}
heatMapSchema.methods.setEdge = function(newEdge, cb){
	var oldEdge = this.edge
	
	this.edge = newEdge
	this.save.call(this, function(err){
		if(err){
			this.edge = oldEdge
		}
		cb(err)
	})
}

//Heat
heatMapSchema.methods.getHeatPoints = function(){
	return this.heat
}
heatMapSchema.methods.addHeatPoint = function(point, cb){
	this.heat.push(point)
	
	this.save.call(this, function(err){
		if(err){
			var pointIndex = this.heat.indexOf(point)
			if(pointIndex != -1){
				this.heat.splice(pointIndex, 1)
			}
		}
		cb(err)
	})
}
heatMapSchema.methods.removeHeatPoint = function(point, cb){
	var pointIndex = this.heat.indexOf(point)
	
	if(pointIndex != -1){
		this.heat.splice(pointIndex, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.heat.push(point)
			}
			cb(err)
		})
	}
	else cb('Point not in array')
}

//STATICS
heatMapSchema.statics.getHeatMapsByIdArray = function(idArray, cb){
	var heatMapArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, evaluations){
			if(!err) heatMapArray.push(evaluations[0])
			else error = 1
		})
	}, this);
}
heatMapSchema.statics.getAllHeatMaps = function(cb){
	this.find({}, function(err, heatMaps){
		cb(err, heatMaps)
	})
}
heatMapSchema.statics.getSingleHeatMap = function(_heatMapId, cb){
	this.find({
		_id: _heatMapId
	}, function(err, heatMaps){
		cb(err, heatMaps)
	})
}
heatMapSchema.statics.createHeatMap = function(cb){
	var newHeatMap = new this({
		edge: 0,
		heat: []
	})
	
	newHeatMap.save(function(err){
		if(err){
			newHeatMap = null
		}
		cb(err, newHeatMap)
	})
}
heatMapSchema.statics.removeHeatMap = function(heatMap, cb){
	this.remove({
		_id: heatMap._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var heatMap = mongoose.model('HeatMap', heatMapSchema)

module.exports = heatMap