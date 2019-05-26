const mongoose = require('mongoose');
const User = mongoose.model('User')
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = {
  createUser: (req, res) => {
    const {firstName, lastName, username, password, role} = req.body;

    const newUser = new User({firstName, lastName, username, password, role});

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          console.error(err);
        }
        newUser.set('password', hash);

        newUser.save().then(user => {
          const token = jwt.sign({id:user.id}, config.get('jwtSecret'));

          return res.json({
            token: token,
            user: user
          });
        }).catch(err => console.error(err));
      });
    });
  },
  getUser: (ctx, next) => {

  }
}
