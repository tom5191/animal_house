const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	firstName: {
		required: true,
		type: String,
	},
	lastName: {
		required: true,
		type: String,
	},
	address: {
		required: false,
		type: Object,
	},
	animals: [
		{
			type: mongoose.Schema.Types.ObjectId,
		},
	],
	trackerId: {
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

module.export = mongoose.model('Owner', OwnerSchema);
