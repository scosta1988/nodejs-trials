var mongoose = require('mongoose')
var Schema = mongoose.Schema

var citySchema = new Schema({
	name: String,
	position: {
		lat: Number,
		lng: Number
	},
	country: String,
	
	landmarks: [Schema.Types.ObjectId],
	trips: [Schema.Types.ObjectId],
	heatMap: Schema.Types.ObjectId
})

//METHODS
//Name
citySchema.methods.getName = function(){
	return this.name
}
citySchema.methods.setName = function(newName, cb){
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

//Landmarks
citySchema.methods.getLandmarks = function(){
	return this.landmarks
}
citySchema.methods.addLandmark = function(newLandmark, cb){
	this.landmarks.push(newLandmark._id)
	
	this.save.call(this, function(err){
		if(err){
			//remove newly added landmark
			var index = this.landmarks.indexOf(newLandmark._id)
			this.landmarks.splice(index, 1)
		}
		cb(err)
	})
}
citySchema.methods.removeLandmark = function(newLandmark, cb){
	var index = this.landmarks.indexOf(newLandmark._id)
	this.landmarks.splice(index, 1)
	
	this.save.call(this, function(err){
		if(err){
			//add the landmark again
			this.landmarks.push(newLandmark._id)
		}
		cb(err)
	})
}

//Position TODO: Change to new position style
citySchema.methods.getPosition = function(){
	return this.position
}
citySchema.methods.setPosition = function(newPosition, cb){
	var oldPosition = this.position
	
	this.position = newPosition
	this.save.call(this, function(err){
		if(err){
			//recover old position
			this.position = oldPosition
		}
		cb(err)
	})
}

//Country
citySchema.methods.getCountry = function(){
	return this.country
}
citySchema.methods.setCountry = function(newCountry, cb){
	var oldCountry = this.country
	
	this.country = newCountry
	this.save.call(this, function(err){
		if (err){
			//reset country
			this.country = oldCountry
		}
		cb(err)
	})
}

//Trips
citySchema.methods.getTrips = function(){
	return this.trips
}
citySchema.methods.addTrip = function(newTrip, cb){
	this.trips.push(newTrip._id)
	
	this.save.call(this, function(err){
		if(err){
			//remove newly added trip
			var index = this.trips.indexOf(newTrip._id)
			this.trips.splice(index, 1)
		}
		cb(err)
	})
}
citySchema.methods.removeTrip = function(newTrip, cb){
	var index = this.trips.indexOf(newTrip._id)
	this.trips.splice(index, 1)
	
	this.save.call(this, function(err){
		if(err){
			//add the trip again
			this.trips.push(newTrip._id)
		}
		cb(err)
	})
}

//HeatMap
citySchema.methods.getHeatMap = function(){
	return this.heatMap
}
citySchema.methods.setHeatMap = function(newHeatMap, cb){
	var oldHeatMap = this.heatMap
	
	this.heatMap = newHeatMap
	this.save.call(this, function(err){
		if (err){
			//reset Heat Map
			this.heatMap = oldHeatMap
		}
		cb(err)
	})
}

//STATICS
citySchema.statics.getCitiesByIdArray = function(idArray, cb){
	var cityArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, cities){
			if(!err) cityArray.push(cities[0])
			else error = 1
		})
	}, this)
	
	cb(error, cityArray)
}
citySchema.statics.getAllCities = function(cb){
	this.find({}, function(err, cities){
		cb(err, cities)
	})
}
citySchema.statics.getSingleCity = function(_name, _position, _country, cb){
	this.find({
		name: _name,
		position: _position,
		country: _country
	}, function(err, cities){
		cb(err, cities)
	})
}
citySchema.statics.createBlankCity = function(cb){
	var newCity = new this({
		name: '',
		position: {
			lat: 0,
			lng: 0
		},
		country: '',
		
		landmarks: [],
		trips: [],
		heatMap: null
	})
	
	newCity.save(function(err){
		if(err){
			//error when saving new city to the db
			newCity = null
		}
		cb(err, newCity)
	})
}
citySchema.statics.createCity = function(_name, _position, _country, cb){
	var newCity = new this({
		name: _name,
		position: _position,
		country: _country,
		
		landmarks: [],
		trips: [],
		heatMap: null
	})
	
	newCity.save(function(err){
		if(err){
			//error when saving new city to the db
			newCity = null
		}
		cb(err, newCity)
	})
}
citySchema.statics.removeCity = function(city, cb){
	this.remove({
		_id: city._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var City = mongoose.model('City', citySchema)

module.exports = City;