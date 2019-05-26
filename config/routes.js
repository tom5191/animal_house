const router = require('./../index').router;
const controllers = './../api/controllers/';

function authentication(func) {
  return require('./middleware/auth')[func];
}

function requireController(controller, func) {
  return require(controllers+controller)[func];
}

module.exports = {
  createUser: router.post('/users', authentication('isAuthenticated'), authentication('isManager'), requireController('userController', 'createUser')),
  login: router.post('/login', requireController('authController', 'login'))
}
