const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const fs = require('fs');
const waterfall = require('async-waterfall');
const router = express.Router();
const cors = require('cors');

// Set process to dev and require config
process.env.NODE_ENV = 'development';
const config = require('config');

app.use(cors());

module.exports.router = router;
// Add body parser and routes too app
app.use(express.json());
app.use('/api', router);

// Connect mongo
const connectMongo = () => {
	mongoose
		.connect(config.get('Mongo.uri'), {
			useCreateIndex: true,
			useNewUrlParser: true,
		})
		.then(() => console.log('Mongoose connected...'))
		.catch(err => console.error(err));
};
// Add models
const requireModels = () => {
	fs.readdirSync('api/models').forEach(function(file) {
		if (~file.indexOf('.js')) require('./api/models/' + file);
	});
};
// add controllers
const requireControllers = () => {
	fs.readdirSync('api/controllers').forEach(function(file) {
		if (~file.indexOf('.js')) require('./api/controllers/' + file);
	});
};

const start = new Promise((resolve, reject) => {
	resolve(requireModels());
});

start
	.then(requireControllers)
	.then(() => require('./config/routes'))
	.then(connectMongo)
	.then(() => {
		app.listen(5000, () => {
			console.log('Server started on port 5000');
		});
	})
	.catch(err => {
		console.error(err);
	});
