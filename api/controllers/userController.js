const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('config');
const jwt = require('jsonwebtoken');
const authService = require('./../services/auth');

module.exports = {
	createUser: (req, res) => {
		const { firstName, lastName, username, password, role } = req.body;

		const newUser = new User({ firstName, lastName, username, password, role });

		authService
			.newPassword(newUser.password)
			.then(passHash => {
				newUser.set('password', passHash);

				newUser
					.save()
					.then(user => {
						const token = jwt.sign({ id: user._id }, config.get('jwtSecret'));

						return res.json({
							token: token,
							user: user,
						});
					})
					.catch(err => console.error(err));
			})
			.catch(err => {
				return res.status(500).json({ msg: err });
			});
	},
	userMe: (req, res) => {
		return res.json({ user: req.user });
	},
	userMeUpdate: (req, res) => {
		let updateUser = {};

		for (prop in req.body) {
			updateUser[prop] = req.body[prop];
		}

		User.updateOne({ _id: req.user._id }, updateUser)
			.then(() => {
				return res.status(200).end();
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	},
	userById: (req, res) => {
		const { id } = req.params;

		User.findById(id)
			.then(user => {
				if (!user) return res.status(400).json({ msg: 'No user found' });

				return res.json({ user });
			})
			.catch(err => {
				return res.status(500).json({ msg: err.message });
			});
	},
	deleteUser: (req, res) => {
		const { id } = req.params;

		User.updateOne({ id: id }, { deletedAt: new Date() })
			.then(() => {
				return res.status(200).end();
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	},
};
