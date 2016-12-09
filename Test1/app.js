//To be used as incremental ID
var globalID = 0;

//Defining the global entity array
var npcArray = [];

//Defining the global human-controlled entity array
var playerArray = [];

//Defining the global array of unanimated objects
var objectArray = [];

//Exporting global objects and arrays
module.exports.globalID = globalID;
module.exports.npcArray = npcArray;
module.exports.playerArray = playerArray;
module.exports.objectArray = objectArray;

//Dependency injection
var Entity = require('./entity.js');
var Rest = require('./rest_api.js');

//REST API initialization
var restApi = Rest.restApi;
restApi.listen(7653);

//NPC Process Loop
function startEntityProcessLoop() {
	npcArray.forEach(function (element, index, array) {
		if(element.isAlive() && !element.isTimeoutSet())
		{
			function entityLoop() {
				element.process();
				if(element.isAlive())
				{
					setTimeout(entityLoop, 200);
				}
				else
				{
					element.resetTimeout();
				}
			};
			entityLoop();
			element.setTimeout();
		}
		else if(!element.isAlive())
		{
			npcArray.splice(index, 1);
		}
	});
	setTimeout(startEntityProcessLoop, 200);
};
startEntityProcessLoop();