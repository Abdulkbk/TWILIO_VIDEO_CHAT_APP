const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SessionsSChema = new Schema({
	email: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
})

module.exports = Sessions = mongoose.model('session', SessionsSChema);