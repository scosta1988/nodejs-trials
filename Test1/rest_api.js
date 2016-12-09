var Express = require('express');
var restApi = new Express();
var Entity = require('./entity.js');
var app = require('./app.js');

var npcArray = app.npcArray;
var playerArray = app.playerArray;
var objectArray = app.objectArray;

restApi.get('/listAllNPC', function (req, res) {
	var resArray = [];
	npcArray.forEach(function (element, index, arr) {
		resArray.push( {
			id: element.getId(),
			age: element.getAge(),
			alive: element.isAlive(),
			timeout: element.isTimeoutSet()
		});
	});
	res.json({NPCs: resArray});
});
restApi.get('/listNPC/:id', function (req, res) {
	var id = req.params.id;
	var toShow = npcArray.filter(function (item) {
		return item.getId() == id;
	});
	
	var resArray = [];
	toShow.forEach(function (element, index, arr) {
		resArray.push( {
			id: element.getId(),
			age: element.getAge(),
			alive: element.isAlive(),
			timeout: element.isTimeoutSet()
		});
	});
	
	res.json({NPCs: resArray});
});
restApi.get('/createNPC', function (req, res) {
	var paramAge = req.query.age || 0;
	var newEntity = new Entity(paramAge);
	npcArray.push(newEntity);
	
	res.json({
		id: newEntity.getId(),
		age: newEntity.getAge(),
		alive: newEntity.isAlive()
	});
});
restApi.get('/createTonsOfNPC', function (req, res) {
	var paramAge = req.query.age || 0;
	var nOfNPC = 100000;
	var i = 0;
	
	while(i < nOfNPC)
	{
		var newEntity = new Entity(paramAge);
		npcArray.push(newEntity);
		i++;
	}
	
	res.json({
		created: nOfNPC 
	});
});

module.exports.restApi = restApi;