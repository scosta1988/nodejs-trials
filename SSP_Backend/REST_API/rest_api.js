var Express = require('express')
var restApi = new Express()

var bodyParser = require('body-parser')
restApi.use(bodyParser.json())

var PlanetModule = require('../Entities/planet.js')
var StarModule = require('../Entities/star.js')

restApi.post('/star/create', function(req, res){
	var name = req.body.name
	var mass = req.body.mass
	var radius = req.body.radius
	var color = req.body.color
	
	var Star = StarModule.Star
	var newStar = new Star(name, mass, radius, color)
	
	res.json(newStar)
})

restApi.post('/planet/create', function(req, res){
	var name = req.body.name
	var mass = req.body.mass
	var radius = req.body.radius
	var color = req.body.color
	var starID = req.body.starID
	
	var Planet = PlanetModule.Planet
	var newPlanet = new Planet(name, mass, radius, color, starID)
	
	res.json(newPlanet)
})
restApi.get('/planet/listAll', function(req, res){
	var planetArray = PlanetModule.PlanetArray
	var returnArray = []
	
	planetArray.forEach(function(planet){
		returnArray.push({
			id: planet._id,
			timeoutSet: planet._timeoutSet,
			mass: planet._mass,
			radius: planet._radius,
			color: planet._color
		})
	})
	
	res.json(returnArray)
})

module.exports.restApi = restApi;