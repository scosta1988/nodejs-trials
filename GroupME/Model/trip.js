var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tripSchema = new Schema({
	name: String,
	schedule: [{
		city: Schema.Types.ObjectId,
		startDate: Date,
		endDate: Date
	}],
	users: [Schema.Types.ObjectId]
})

//METHODS
//Name
tripSchema.methods.getName = function(){
	return this.name
}
tripSchema.methods.setName = function(newName, cb){
	var oldName = this.name
	
	this.name = newName
	this.save.call(this, function(err){
		if(err){
			this.name = oldName
		}
		cb(err)
	})
}

//Schedule
tripSchema.methods.getSchedule = function(){
	return this.schedule
}
tripSchema.methods.addStopToSchedule = function(stop, cb){
	this.schedule.push(stop)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.schedule.indexOf(stop)
			this.schedule.splice(index, 1)
		}
		cb(err)
	})
}
tripSchema.methods.removeStopFromSchedule = function(stop, cb){
	var index = this.schedule.indexOf(stop)
	if(index != -1){
		this.schedule.splice(index, 1)
		this.save.call(this, function(err){
			if(err){
				this.schedule.push(stop)
			}
		})
	}
	else cb('Stop not in array')
}

//Users
tripSchema.methods.getUsers = function(){
	return this.users
}
tripSchema.methods.addUser = function(user, cb){
	this.users.push(user)
	this.save.call(this, function(err){
		if(err){
			var index = this.users.indexOf(user)
			this.users.splice(index, 1)
		}
		cb(err)
	})
}
tripSchema.methods.removeUser = function(user, cb){
	var index = this.users.indexOf(user)
	
	if(index != -1){
		this.users.splice(index, 1)
		this.save.call(this, function(err){
			if(err){
				this.users.push(user)
			}
			cb(err)
		})
	}
	else cb('User not in array')
}

//STATICS
tripSchema.statics.getTripsByIdArray = function(idArray, cb){
	var tripArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, trips){
			if(!err) tripArray.push(trips[0])
			else error = 1
		})
	}, this);
	
	cb(error, tripArray)
}
tripSchema.statics.getAllTrips = function(cb){
	this.find({}, function(err, trips){
		cb(err, trips)
	})
}
tripSchema.statics.getSingleTrip = function(_tripId, cb){
	this.find({
		_id: _tripId
	}, function(err, trips){
		cb(err, trips)
	})
}
tripSchema.statics.createBlankTrip = function(cb){
	var newTrip = new this({
		name: '',
		schedule: [],
		users: []
	})
	
	newTrip.save(function(err){
		if(err){
			newTrip = null
		}
		cb(err, newTrip)
	})
}
tripSchema.statics.createTrip = function(_name, cb){
	var newTrip = new this({
		name: _name,
		schedule: [],
		users: []
	})
	
	newTrip.save(function(err){
		if(err){
			newTrip = null
		}
		cb(err, newTrip)
	})
}
tripSchema.statics.removeTrip = function(trip, cb){
	this.remove({
		_id: trip._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip