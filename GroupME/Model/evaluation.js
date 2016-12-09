var mongoose = require('mongoose')
var Schema = mongoose.Schema

var evaluationSchema = new Schema({
	user: Schema.Types.ObjectId,
	text: String,
	grade: Number
})

//METHODS
//User
evaluationSchema.methods.getUser = function(){
	return this.user
}
evaluationSchema.methods.setUser = function(newUser, cb){
	var oldUser = this.user
	
	this.user = newUser
	this.save.call(this, function(err){
		if(err){
			this.user = oldUser
		}
		cb(err)
	})
}

//Text
evaluationSchema.methods.getText = function(){
	return this.text
}
evaluationSchema.methods.setText = function(newText, cb){
	var oldText = this.text
	
	this.text = newText
	this.save.call(this, function(err){
		if(err){
			this.text = oldText
		}
		cb(err)
	})
}

//Grade
evaluationSchema.methods.getGrade = function(){
	return this.grade
}
evaluationSchema.methods.setGrade = function(newGrade, cb){
	var oldGrade = this.grade
	
	this.grade = newGrade
	this.save.call(this, function(err){
		if(err){
			this.grade = oldGrade
		}
		cb(err)
	})
}

//STATICS
evaluationSchema.statics.getEvaluationsByIdArray = function(idArray, cb){
	var evalArray = []
	var error = 0
	
	idArray.forEach(function(element) {
		this.find({
			_id: element
		}, function(err, evaluations){
			if(!err) evalArray.push(evaluations[0])
			else error = 1
		})
	}, this)
	
	cb(error, evalArray)
}
evaluationSchema.statics.getAllEvaluations = function(cb){
	this.find({}, function(err, evaluations){
		cb(err, evaluations)
	})
}
evaluationSchema.statics.getSingleEvaluation = function(_evalId, cb){
	this.find({
		_id: _evalId
	}, function(err, evaluations){
		cb(err, evaluations)
	})
}
evaluationSchema.statics.createBlankEvaluation = function(cb){
	var newEval = new this({
		user: null,
		text: '',
		grade: 0
	})
	
	newEval.save(function(err){
		if(err){
			newEval = null
		}
		cb(err, newEval)
	})
}
evaluationSchema.statics.createEvaluation = function(_userId, _text, _grade, cb){
	var newEval = new this({
		user: _userId,
		text: _text,
		grade: _grade
	})
	
	newEval.save(function(err){
		if(err){
			newEval = null
		}
		cb(err, newEval)
	})
}
evaluationSchema.statics.removeEvaluation = function(evaluation, cb){
	this.remove({
		_id: evaluation._id
	}, function(err, removed){
		cb(err, removed)
	})
}

//COMPILE MODEL
var Evaluation = mongoose.model('Evaluation', evaluationSchema)

module.exports = Evaluation