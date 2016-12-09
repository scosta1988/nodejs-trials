var Express = require('express')
var restApi = new Express()

//Data Models
var User = require('../Model/user.js')
var City = require('../Model/city.js')
var Evaluation = require('../Model/evaluation.js')
var HeatMap = require('../Model/heatMap.js')
var Landmark = require('../Model/landmark.js')
var Meeting = require('../Model/meeting.js')
var Route = require('../Model/route.js')
var Trip = require('../Model/trip.js')

//Users
restApi.get('/user/all', function(req, res){
	User.getAllUsers(function(err, users){
		if(!err) res.json(users)
		else res.json({error: 'Error when loading user values'})
	})
})
restApi.get('/user/search', function(req, res){
	
})
restApi.get('/user/trips')
restApi.get('/user/evaluations')
restApi.get('/user/endorsements')


//Evaluations
restApi.get('/getAllEvaluations', function(req, res){
	Evaluation.getAllEvaluations(function(err, evals){
		if(!err) res.json(evals)
		else res.json({error: 'Error when loading evaluation values'})
	})
})

module.exports = restApi