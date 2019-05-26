const router = require('./../index').router;
const controllers = './../api/controllers/';

function authentication(func) {
	return require('./middleware/auth')[func];
}

function requireController(controller, func) {
	return require(controllers + controller)[func];
}

module.exports = {
	createUser: router.post(
		'/users',
		authentication('isAuthenticated'),
		authentication('isManager'),
		requireController('userController', 'createUser')
	),
	login: router.post('/login', requireController('authController', 'login')),
	userMe: router.get('/users/me', authentication('isAuthenticated'), requireController('userController', 'userMe')),
	userMeUpdate: router.put(
		'/users/me',
		authentication('isAuthenticated'),
		requireController('userController', 'userMeUpdate')
	),
	userById: router.get(
		'/users/:id',
		authentication('isAuthenticated'),
		requireController('userController', 'userById')
	),
	deleteUser: router.delete(
		'/users/:id',
		authentication('isAuthenticated'),
		authentication('isManager'),
		requireController('userController', 'deleteUser')
	),
};
