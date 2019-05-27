const router = require('./../index').router;
const controllers = './../api/controllers/';

function authentication(func) {
	return require('./middleware/auth')[func];
}

function requireController(controller, func) {
	return require(controllers + controller)[func];
}

module.exports = {
	/**
	 * Users
	 */
	createUser: router.post(
		'/users',
		authentication('isAuthenticated'),
		authentication('isManager'),
		requireController('userController', 'createUser')
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
	changePassword: router.put(
		'/users/password',
		authentication('isAuthenticated'),
		requireController('authController', 'changePassword')
	),

	/**
	 * User Me
	 */
	userMe: router.get('/users/me', authentication('isAuthenticated'), requireController('userController', 'userMe')),
	userMeUpdate: router.put(
		'/users/me',
		authentication('isAuthenticated'),
		requireController('userController', 'userMeUpdate')
	),

	/*
	 * Authorization
	 */
	login: router.post('/login', requireController('authController', 'login')),

	/**
	 *	Animals
	 */
	createAnimal: router.post(
		'/animals',
		authentication('isAuthenticated'),
		authentication('isStaff'),
		requireController('animalController', 'createAnimal')
	),
	getAllAnimals: router.get(
		'/animals',
		authentication('isAuthenticated'),
		requireController('animalController', 'getAllAnimals')
	),
	animalById: router.get(
		'/animals/:id',
		authentication('isAuthenticated'),
		requireController('animalController', 'animalById')
	),
	deleteAnimal: router.delete(
		'/animals/:id',
		authentication('isAuthenticated'),
		authentication('isStaff'),
		requireController('animalController', 'deleteAnimal')
	),
};
