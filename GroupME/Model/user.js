var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	name: String,
	photoLink: String,
	userID: String,
	trips: [Schema.Types.ObjectId],
	meetings: [Schema.Types.ObjectId],
	foursquareToken: String,
	facebookToken: String,
	googleToken: String,
	visitRoutes: [Schema.Types.ObjectId],
	evaluations: [Schema.Types.ObjectId],
	endorsements: [Schema.Types.ObjectId]
})

//METHODS
//Name
userSchema.methods.getName = function(){
	return this.name
}
userSchema.methods.setName = function(newName, cb){
	var oldName = this.name
	
	this.name = newName
	this.save.call(this, function(err){
		if (err){
			//reset name
			this.name = oldName
		}
		cb(err)
	})
}

//Photo Link
userSchema.methods.getPhotoLink = function(){
	return this.photoLink
}
userSchema.methods.setPhotoLink = function(newPhotoLink, cb){
	var oldPhotoLink = this.photoLink
	
	this.photoLink = newPhotoLink
	this.save.call(this, function(err){
		if (err){
			this.photoLink = oldPhotoLink
		}
		cb(err)
	})
}

//User ID
userSchema.methods.getUserID = function(){
	return this.userID
}
userSchema.methods.setUserID = function(newUserID, cb){
	var oldUserID = this.userID
	
	this.userID = newUserID
	this.save.call(this, function(err){
		if(err){
			this.userID = oldUserID
		}
		cb(err)
	})
}

//Trips
userSchema.methods.getTrips = function(){
	return this.trips
}
userSchema.methods.addTrip = function(newTrip, cb){
	this.trips.push(newTrip)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.trips.indexOf(newTrip)
			this.trips.splice(index, 1)
		}
		cb(err)
	})
}
userSchema.methods.removeTrip = function(trip, cb){
	var index = this.trips.indexOf(trip)
	if(index != -1){
		this.trips.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.trips.push(trip)
			}
		})
	}
	else cb('Trip not present in array')
}

//Meetings
userSchema.methods.getMeetings = function(){
	return this.meetings
}
userSchema.methods.addMeeting = function(newMeeting, cb){
	this.meetings.push(newMeeting)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.meetings.indexOf(newMeeting)
			this.meetings.splice(index, 1)
		}
		cb(err)
	})
}
userSchema.methods.removeMeeting= function(meeting, cb){
	var index = this.meetings.indexOf(meeting)
	if(index != -1){
		this.meetings.splice(index, 1)
		
		this.save.call(this, function(err){
			if(err){
				this.meetings.push(meeting)
			}
		})
	}
	else cb('Meeting not present in array')
}

//Foursquare Token
userSchema.methods.getFoursquareToken = function(){
	return this.foursquareToken
}
userSchema.methods.setFoursquareToken = function(newFoursquareToken, cb){
	var oldToken = this.foursquareToken
	
	this.foursquareToken = newFoursquareToken
	this.save.call(this, function(err){
		if(err){
			this.foursquareToken = oldToken
		}
		cb(err)
	})
}

//Facebook Token
userSchema.methods.getFacebookToken = function(){
	return this.facebookToken
}
userSchema.methods.setFacebookToken = function(newFacebookToken, cb){
	var oldToken = this.facebookToken
	
	this.facebookToken = newFacebookToken
	this.save.call(this, function(err){
		if(err){
			this.facebookToken = oldToken
		}
		cb(err)
	})
}

//Google Token
userSchema.methods.getGoogleToken = function(){
	return this.googleToken
}
userSchema.methods.setGoogleToken = function(newGoogleToken, cb){
	var oldToken = this.googleToken
	
	this.googleToken = newGoogleToken
	this.save.call(this, function(err){
		if(err){
			this.googleToken = oldToken
		}
		cb(err)
	})
}

//Visit Routes
userSchema.methods.getVisitRoutes = function(){
	return this.visitRoutes
}
userSchema.methods.addVisitRoute = function(newRoute, cb){
	this.visitRoutes.push(newRoute)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.visitRoutes.indexOf(newRoute)
			this.visitRoutes.splice(index, 1)
		}
		cb(err)
	})
}
userSchema.methods.removeVisitRoute = function(route, cb){
	var index = this.visitRoutes.indexOf(route)
	if(index != -1){
		this.visitRoutes.splice(index, 1)
		
		this.save.call(this, function(err){
			this.visitRoutes.push(route)
		})
	}
	else cb('Route not in array')
}

//Evaluations
userSchema.methods.getEvaluations = function(){
	return this.evaluations
}
userSchema.methods.addEvaluation = function(newEvaluation, cb){
	this.evaluations.push(newEvaluation)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.evaluations.indexOf(newEvaluation)
			this.evaluations.splice(index, 1)
		}
		cb(err)
	})
}
userSchema.methods.removeEvaluation = function(evaluation, cb){
	var index = this.evaluations.indexOf(evaluation)
	if(index != -1){
		this.evaluations.splice(index, 1)
		
		this.save.call(this, function(err){
			this.evaluations.push(evaluation)
		})
	}
	else cb('Evaluation not in array')
}

//Endorsements
userSchema.methods.getEndorsements = function(){
	return this.endorsements
}
userSchema.methods.addEndorsement = function(newEndorsement, cb){
	this.endorsements.push(newEndorsement)
	
	this.save.call(this, function(err){
		if(err){
			var index = this.endorsements.indexOf(newEndorsement)
			this.endorsements.splice(index, 1)
		}
		cb(err)
	})
}
userSchema.methods.removeEndorsement = function(endorsement, cb){
	var index = this.endorsements.indexOf(endorsement)
	if(index != -1){
		this.endorsements.splice(index, 1)
		
		this.save.call(this, function(err){
			this.endorsements.push(endorsement)
		})
	}
	else cb('Endorsement not in array')
}

//STATICS
userSchema.statics.getUsersByIdArray = function(idArray, cb){
	var userArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, users){
			if(!err) userArray.push(users[0])
			else error = 1
		})
	}, this);
	
	cb(error, userArray)
}
userSchema.statics.getAllUsers = function(cb){
	this.find({}, function(err, users){
		cb(err, users)
	})
}
userSchema.statics.getSingleUser = function(_userID, cb){
	this.find({
		userID: _userID
	}, function(err, users){
		cb(err, users)
	})
}
userSchema.statics.createBlankUser = function(cb){
	var newUser = new this({
		name: '',
		photoLink: '',
		userID: '',
		trips: [],
		meetings: [],
		foursquareToken: '',
		facebookToken: '',
		googleToken: '',
		visitRoutes: [],
		evaluations: [],
		endorsements: []
	})
	
	newUser.save(function(err){
		if(err){
			newUser = null
		}
		cb(err, newUser)
	})
}
userSchema.statics.createUser = function(_name, _photoLink, _userID, _foursquareToken, _facebookToken, _googleToken, cb){
	var newUser = new this({
		name: _name,
		photoLink: _photoLink,
		userID: _userID,
		trips: [],
		meetings: [],
		foursquareToken: _foursquareToken,
		facebookToken: _facebookToken,
		googleToken: _googleToken,
		visitRoutes: [],
		evaluations: [],
		endorsements: []
	})
	
	newUser.save(function(err){
		if(err){
			newUser = null
		}
		cb(err, newUser)
	})
}
userSchema.statics.removeUser = function(user, cb){
	this.remove({
		_id: user._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var User = mongoose.model('User', userSchema)

module.exports = User