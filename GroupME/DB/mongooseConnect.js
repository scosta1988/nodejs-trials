var mongoose = require('mongoose')
var DBName = 'test'

var Connect = function(onSuccessCb, onFailCb){
	mongoose.connect('mongodb://localhost/' + DBName)

	var db = mongoose.connection
	db.on('error', onFailCb)
	db.once('open', function (callback) {
		onSuccessCb()
	})
}

module.exports = Connect