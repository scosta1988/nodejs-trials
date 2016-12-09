var restApi = require('./REST_API/restApi.js')
var mongooseConnect = require('./DB/mongooseConnect.js')

mongooseConnect(function(){
	restApi.listen(7653)
}, function(){
	console.log('Failed to connect to DB')
})