var mongoose = require('mongoose')
var Schema = mongoose.Schema

var landmarkSchema = new Schema({
	name: String,
	city: Schema.Types.ObjectId,
	position: {
		lat: Number,
		lng: Number
	},
	category: String,
	evaluations: [Schema.Types.ObjectId],
	visitRoutes: [Schema.Types.ObjectId],
	meetings: [Schema.Types.ObjectId]
})

//METHODS
//Name
landmarkSchema.methods.getName = function(){
	return this.name
}
landmarkSchema.methods.setName = function(newName, cb){
	var oldName = this.name
	
	this.name = newName
	this.save.call(this, function(err){
		if(err){
			this.name = oldName
		}
		cb(err)
	})
}

//City
landmarkSchema.methods.getCity = function(){
	return this.city
}
landmarkSchema.methods.setCity = function(newCity, cb){
	var oldCity = this.city
	
	this.city = newCity
	this.save.call(this, function(err){
		if(err){
			this.city = oldCity
		}
		cb(err)
	})
}

//Position
landmarkSchema.methods.getPosition = function(){
	return this.position
}
landmarkSchema.methods.setPosition = function(newPosition, cb){
	var oldPosition = this.position
	
	this.position = newPosition
	this.save.call(this, function(err){
		if(err){
			this.position = oldPosition
		}
		cb(err)
	})
}

//Category
landmarkSchema.methods.getCategory = function(){
	return this.category
}
landmarkSchema.methods.setCategory = function(newCategory, cb){
	var oldCategory = this.category
	
	this.category = newCategory
	this.save.call(this, function(err){
		if(err){
			this.category = oldCategory
		}
		cb(err)
	})
}

//Evaluations
landmarkSchema.methods.getEvaluations = function(){
	return this.evaluations
}
landmarkSchema.methods.addEvaluation = function(newEvaluation, cb){
	this.evaluations.push(newEvaluation)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.evaluations.indexOf(newEvaluation)
			this.evaluations.splice(index, 1)
		}
		cb(err)
	})
}
landmarkSchema.methods.removeEvaluation = function(evaluation, cb){
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
	else cb('Evaluation not in array')
}

//Visit Routes
landmarkSchema.methods.getRoutes = function(){
	return this.visitRoutes
}
landmarkSchema.methods.addRoute = function(newRoute, cb){
	this.visitRoutes.push(newRoute)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.visitRoutes.indexOf(newRoute)
			this.visitRoutes.splice(index, 1)
		}
		cb(err)
	})
}
landmarkSchema.methods.removeRoute = function(route, cb){
	var index = this.visitRoutes.indexOf(route)
	if(index != -1){
		this.visitRoutes.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.visitRoutes.push(route)
			}
			cb(err)
		})
	}
	else cb('Route not in array')
}

//Meetings
landmarkSchema.methods.getMeetings = function(){
	return this.meetings
}
landmarkSchema.methods.addMeeting = function(newMeeting, cb){
	this.meetings.push(newMeeting)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.meetings.indexOf(newMeeting)
			this.meetings.splice(index, 1)
		}
		cb(err)
	})
}
landmarkSchema.methods.removeMeeting = function(meeting, cb){
	var index = this.meetings.indexOf(meeting)
	if(index != -1){
		this.meetings.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.meetings.push(meeting)
			}
			cb(err)
		})
	}
	else cb('Route not in array')
}

//STATICS
landmarkSchema.statics.getLandmarksByIdArray = function(idArray, cb){
	var landmarkArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, landmarks){
			if(!err) landmarkArray.push(landmarks[0])
			else error = 1
		})
	}, this);
	
	cb(error, landmarkArray)
}
landmarkSchema.statics.getAllLandmarks = function(cb){
	this.find({}, function(err, landmarks){
		cb(err, landmarks)
	})
}
landmarkSchema.statics.getSingleLandmark = function(_name, _city, _position, _category, cb){
	this.find({
		name: _name,
		city: _city,
		position: _position,
		category: _category
	}, function(err, landmarks){
		cb(err, landmarks)
	})
}
landmarkSchema.statics.createBlankLandmark = function(cb){
	var newLandmark = new this({
		name: '',
		city: '',
		position: {
			lat: 0,
			lng: 0
		},
		category: '',
		evaluations: [],
		visitRoutes: [],
		meetings: []
	})
	
	newLandmark.save(function(err){
		if(err){
			newLandmark = null
		}
		cb(err, newLandmark)
	})
}
landmarkSchema.statics.createLandmark = function(_name, _city, _position, _category, cb){
	var newLandmark = new this({
		name: _name,
		city: _city,
		position: _position,
		category: _category,
		evaluations: [],
		visitRoutes: [],
		meetings: []
	})
	
	newLandmark.save(function(err){
		if(err){
			newLandmark = null
		}
		cb(err, newLandmark)
	})
}
landmarkSchema.statics.removeLandmark = function(landmark, cb){
	this.remove({
		_id: landmark._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var Landmark = mongoose.model('Landmark', landmarkSchema)

module.exports = Landmark