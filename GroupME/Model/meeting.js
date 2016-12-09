var mongoose = require('mongoose')
var Schema = mongoose.Schema

var meetingSchema = new Schema({
	name: String,
	organizers: [Schema.Types.ObjectId],
	category: String,
	attendants: [Schema.Types.ObjectId],
	position: {
		lat: Number,
		lng: Number
	},
	date: Date,
	landmark: Schema.Types.ObjectId,
	evaluations: [Schema.Types.ObjectId]
})

//METHODS
//Name
meetingSchema.methods.getName = function(){
	return this.name
}
meetingSchema.methods.setName = function(newName, cb){
	var oldName = this.name
	
	this.name = newName
	this.save.call(this, function(err){
		if(err){
			this.name = oldName
		}
		cb(err)
	})
}

//Organizers
meetingSchema.methods.getOrganizers = function(){
	return this.organizers
}
meetingSchema.methods.addOrganizer = function(newOrganizer, cb){
	this.organizers.push(newOrganizer)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.organizers.indexOf(newOrganizer)
			this.organizers.splice(index, 1)
		}
		cb(err)
	})
}
meetingSchema.methods.removeOrganizer = function(organizer, cb){
	var index = this.organizers.indexOf(organizer)
	if(index != -1){
		this.organizers.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.organizers.push(organizer)
			}
			cb(err)
		})
	}
	else cb('Organizer not in array')
}

//Category
meetingSchema.methods.getCategory = function(){
	return this.category
}
meetingSchema.methods.setCategory = function(newCategory, cb){
	var oldCategory = this.category
	
	this.category = newCategory
	this.save.call(this, function(err){
		if(err){
			this.category = oldCategory
		}
		cb(err)
	})
}

//Attendants
meetingSchema.methods.getAttendants = function(){
	return this.attendants
}
meetingSchema.methods.addAttendant = function(newAttendant, cb){
	this.attendants.push(newAttendant)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.attendants.indexOf(newAttendant)
			this.attendants.splice(index, 1)
		}
		cb(err)
	})
}
meetingSchema.methods.removeAttendant = function(attendant, cb){
	var index = this.attendants.indexOf(attendant)
	if(index != -1){
		this.attendants.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.attendants.push(attendant)
			}
			cb(err)
		})
	}
	else cb('Attendant not in array')
}

//Position
meetingSchema.methods.getPosition = function(){
	return this.position
}
meetingSchema.methods.setPosition = function(newPosition, cb){
	var oldPosition = this.position
	
	this.position = newPosition
	this.save.call(this, function(err){
		if(err){
			this.position = oldPosition
		}
		cb(err)
	})
}

//Date
meetingSchema.methods.getDate = function(){
	return this.date
}
meetingSchema.methods.setDate = function(newDate, cb){
	var oldDate = this.date
	
	this.date = newDate
	this.save.call(this, function(err){
		if(err){
			this.date = oldDate
		}
		cb(err)
	})
}

//Landmark
meetingSchema.methods.getLandmark = function(){
	return this.landmark
}
meetingSchema.methods.setLandmark = function(newLandmark, cb){
	var oldLandmark = this.landmark
	
	this.landmark = newLandmark
	this.save.call(this, function(err){
		if(err){
			this.landmark = oldLandmark
		}
		cb(err)
	})
}

//Evaluations
meetingSchema.methods.getEvaluations = function(){
	return this.evaluations
}
meetingSchema.methods.addEvaluation = function(newEvaluation, cb){
	this.evaluations.push(newEvaluation)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.evaluations.indexOf(newEvaluation)
			this.evaluations.splice(index, 1)
		}
		cb(err)
	})
}
meetingSchema.methods.removeEvaluation = function(evaluation, cb){
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

//STATICS
meetingSchema.statics.getMeetingsByIdArray = function(idArray, cb){
	var meetingArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, meetings){
			if(!err) meetingArray.push(meetings[0])
			else error = 1
		})
	}, this);
	
	cb(error, meetingArray)
}
meetingSchema.statics.getAllMeetings = function(cb){
	this.find({}, function(err, meetings){
		cb(err, meetings)
	})
}
meetingSchema.statics.getSingleMeeting = function(_name, _category, _position, _date, _landmark, cb){
	this.find({
		name: _name,
		category: _category,
		position: _position,
		date: _date,
		landmark: _landmark
	}, function(err, meetings){
		cb(err, meetings)
	})
}
meetingSchema.statics.createBlankMeeting = function(cb){
	var newMeeting = new this({
			name: '',
			category: '',
			position: {
				lat: 0,
				lng: 0
			},
			date: Schema.Types.Date.now,
			landmark: null,
			organizers: [],
			attendants: [],
			evaluations: []
		})
		
		newMeeting.save(function(err){
			if(err){
				newMeeting = null
			}
			cb(err, newMeeting)
		})
}
meetingSchema.statics.createMeeting = function(_name, _category, _position, _date, _landmark, cb){
	var newMeeting = new this({
		name: _name,
		category: _category,
		position: _position,
		date: _date,
		landmark: _landmark,
		organizers: [],
		attendants: [],
		evaluations: []
	})
	
	newMeeting.save(function(err){
			if(err){
				newMeeting = null
			}
			cb(err, newMeeting)
		})
}
meetingSchema.statics.removeMeeting = function(meeting, cb){
	this.remove({
		_id: meeting._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var Meeting = mongoose.model('Meeting', meetingSchema)

module.exports = Meeting