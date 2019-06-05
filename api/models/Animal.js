const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
	owner: {
		required: false,
		type: mongoose.Schema.Types.ObjectId,
	},
	species: {
		required: false,
		type: 'String',
	},
	breed: {
		required: false,
		type: 'String',
	},
	trackerId: {
		type: String,
	},
	age: {
		required: false,
		type: Number,
	},
	conditions: [
		{
			type: String,
		},
	],
	name: {
		required: false,
		type: String,
	},
	createdAt: {
		required: true,
		type: Date,
		default: new Date(),
	},
	deletedAt: {
		required: false,
		type: Date,
	},
});

module.export = mongoose.model('Animal', AnimalSchema);
