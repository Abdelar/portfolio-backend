const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Email', emailSchema);
