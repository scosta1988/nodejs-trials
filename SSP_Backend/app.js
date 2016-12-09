//Dependency injection
var Rest = require('./REST_API/rest_api.js')
var ActiveEntityModule = require('./Entities/activeEntity.js')

//REST API initialization
var restApi = Rest.restApi
restApi.listen(7653)

//activeEntity Process Loop
function startEntityProcessLoop() {
	var activeEntityArray = ActiveEntityModule.ActiveEntityArray
	activeEntityArray.forEach(function (element) {
		element.setAlive()
		if(element.isAlive() && !element.isTimeoutSet())
		{
			console.log(element.getName() + ' starting loop')
			function entityLoop() {
				console.log(element.getName() + ' loop')
				element.process()
				if(element.isAlive())
				{
					setTimeout(entityLoop, 200)
				}
				else
				{
					element.resetTimeout()
				}
			}
			entityLoop()
			element.setTimeout()
		}
	})
	setTimeout(startEntityProcessLoop, 200)
}
startEntityProcessLoop()