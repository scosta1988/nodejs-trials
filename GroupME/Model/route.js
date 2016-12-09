var mongoose = require('mongoose')
var Schema = mongoose.Schema

var routeSchema = new Schema({
	name: String,
	points: [{
		lat: Number,
		lng: Number
	}],
	evaluations: [Schema.Types.ObjectId]
})

//METHODS
//Name
routeSchema.methods.getName = function(){
	return this.name
}
routeSchema.methods.setName = function(newName, cb){
	var oldName = this.name
	
	this.name = newName
	this.save.call(this, function(err){
		if(err){
			this.name = oldName
		}
		cb(err)
	})
}

//Points
routeSchema.methods.getPoints = function(){
	return this.points
}
routeSchema.methods.addPoint = function(point, cb){
	this.points.push(point)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.points.indexOf(point)
			this.points.splice(index, 1)
		}
		cb(err)
	})
}
routeSchema.methods.removePoint = function(point, cb){
	var index = this.points.indexOf(point)
	if(index != -1){
		this.points.splice(index, 1)
	
		this.save.call(this, function(err){
			if(err){
				this.points.push(point)
			}
			cb(err)
		})
	}
	else cb('Point not in array')
}

//Evaluations
routeSchema.methods.getEvaluations = function(){
	return this.evaluations
}
routeSchema.methods.addEvaluation = function(evaluation, cb){
	this.evaluations.push(evaluation)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.evaluations.indexOf(evaluation)
			this.evaluations.splice(index, 1)
		}
		cb(err)
	})
}
routeSchema.methods.removeEvaluation = function(evaluation, cb){
	var index = this.evaluations.indexOf(evaluation)
	if(index != -1){
		this.evaluations.splice(index, 1)
	
		this.save.call(this, function(err){
			if(err){
				this.evaluations.push(evaluation)
			}
			cb(err)
		})
	}
	else cb('Point not in array')
}

//STATICS
routeSchema.statics.getRoutesByIdArray = function(idArray, cb){
	var routeArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, routes){
			if(!err) routeArray.push(routes[0])
			else error = 1
		})
	}, this);
	
	cb(error, routeArray)
}
routeSchema.statics.getAllRoutes = function(cb){
	this.find({}, function(err, routes){
		cb(err, routes)
	})
}
routeSchema.statics.getSingleRoute = function(_name, cb){
	this.find({
		name: _name,
	}, function(err, routes){
		cb(err, routes)
	})
}
routeSchema.statics.createBlankRoute = function(cb){
	var newRoute = new this({
			name: '',
			points: [],
			evaluations: []
		})
		
		newRoute.save(function(err){
			if(err){
				newRoute = null
			}
			cb(err, newRoute)
		})
}
routeSchema.statics.createMeeting = function(_name, cb){
	var newRoute = new this({
			name: _name,
			points: [],
			evaluations: []
		})
		
		newRoute.save(function(err){
			if(err){
				newRoute = null
			}
			cb(err, newRoute)
		})
}
routeSchema.statics.removeRoute = function(route, cb){
	this.remove({
		_id: route._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var Route = mongoose.model('Route', routeSchema)

module.exports = Route