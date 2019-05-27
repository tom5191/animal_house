const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authService = require('./../services/auth');

module.exports = {
	login: (req, res, next) => {
		const { username, password } = req.body;

		User.findOne({ username: username, deletedAt: null })
			.then(user => {
				if (!user) {
					return res.status(404).json({ msg: 'No user found' });
				}

				bcrypt.compare(password, user.password).then(match => {
					if (!match) {
						return res.status(401).json({ msg: 'Invalid credentials' });
					}

					const token = jwt.sign({ id: user.id }, config.get('jwtSecret'));

					return res.json({ token: token });
				});
			})
			.catch(err => {
				return next(err);
			});
	},
	changePassword: (req, res, next) => {
		const { oldPassword, newPassword } = req.body;

		User.findById(req.user._id)
			.then(user => {
				if (!user) {
					return res.status(400).json({ msg: 'No user found for access token' });
				}

				bcrypt.compare(oldPassword, user.password).then(match => {
					if (!match) {
						return res.status(401).json({ msg: 'You are not authorized' });
					}

					authService
						.newPassword(newPassword)
						.then(passHash => {
							User.updateOne({ _id: user._id }, { password: passHash }).then(() => {
								return res.status(200).end();
							});
						})
						.catch(err => {
							return next(err);
						});
				});
			})
			.catch(err => {
				return next(err);
			});
	},
};
